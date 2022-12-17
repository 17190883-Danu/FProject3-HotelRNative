import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import bcrypt from 'react-native-bcrypt'

const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoggedIn: false,
    loginMessage: '',
    session: {},
    user: {},
    newLoggedData: {},
}

// bcrypt.setRandomFallback((len) => {
//     const buf = new Uint8Array(len)
//     window.crypto.getRandomValues(buf)
//     return buf
// })

const storeSession = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        console.log('jsonValue: ', jsonValue)
        await AsyncStorage.setItem('session', JSON.stringify(value))
        // .then(() => {
        //     AsyncStorage.getItem('session')
        //     .then((res) => {console.log('session1 ', res)})
        // })
    } catch (e) {
        console.warn(e)
    }
}

const destroySession = async () => {
    try {
        await AsyncStorage.removeItem('session')
    } catch (e) {
        console.warn(e)
    }
}

const getUserData = async () => {
    try {
        return await AsyncStorage.getItem('user')
        .then((res) => {
            return res
        })
    } catch (e) {
        console.warn(e)
    }
}

export const changeAuthProfile = createAsyncThunk('auth/changeAuthProfile', async ({userData, inputValue, key}) => {
    try {
        // console.log('userData ', userData)
        await AsyncStorage.getItem('user')
        .then((res) => {
            const userId = userData.id
            const newData = {...userData, [key]: inputValue}
            const newUserData = JSON.parse(res).map((user) => {
                if(user.id === userId) {
                    return newData
                }
                return user
            })
            console.log('res ', newUserData)
            AsyncStorage.setItem('user', JSON.stringify(newUserData))
            return newUserData
        })
    } catch(e) {
        console.log('error ', e)
    }
})

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
    try {
        const value = await AsyncStorage.getItem('session')
        if(value !== null) {
            const data = JSON.parse(value)
            return data
        }
    } catch(e) {
        console.log(e)
    }
})

export const authLogin = createAsyncThunk('auth/login', async ({email, password}) => {
    try {
        await AsyncStorage.getItem('user').then((res) => {
            // console.log('res', res)
            const user = JSON.parse(res).find(user => user.email === email && user.password === password)
            // console.log('user ', user)
            const sessionInfo = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            }
            // console.log('pass ', user.password) 
            // const checkPass = user ? bcrypt.compareSync(password, user.password) : false
            // console.log('checkPass ', checkPass) Note: taking too long to compare
            if(sessionInfo) {
                storeSession(sessionInfo).then(() => {
                    console.warn('Login success')
                    return user
                })
            } else {
                throw new Error('Invalid email or password')
            }
        })
    } catch (err) {
        console.warn(err)
    }
})

export const getUserDataBySession = createAsyncThunk('auth/getUserDataBySession', async () => {
    try {
        const res = await AsyncStorage.getItem('session');
        const session = JSON.parse(res)
        // console.log('session ', session)
            if(session) { 
                const responseUser = await AsyncStorage.getItem('user');
                const user = JSON.parse(responseUser).find(user => user.id === session.id);
                // console.log('user ', user)
            return user;
            } else {
                throw new Error('Session not found')
            }
    } catch (err) {
        console.warn(err)
    }
})

export const authLogout = createAsyncThunk('auth/logout', async () => {
    try {
        destroySession().then(() => {
            console.warn('Logout success')
        })
    } catch (err) {
        console.warn(err)
    }
})

const handleAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(checkSession.pending, (state) => {
            state.isLoginPending = true
        })
        builder.addCase(checkSession.fulfilled, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = true
            state.isLoggedIn = true
            state.session = action.payload
        })
        builder.addCase(checkSession.rejected, (state) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.isLoggedIn = false
        })
        builder.addCase(authLogin.pending, (state, action) => {
            state.isLoginPending = true
        })
        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = true
            state.isLoggedIn = true
            state.session = action.payload
        })
        builder.addCase(authLogin.rejected, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.loginMessage = action.error.message
        })
        builder.addCase(getUserDataBySession.pending, (state, action) => {
            state.isLoginPending = true
        })
        builder.addCase(getUserDataBySession.fulfilled, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = true
            state.isLoggedIn = true
            // console.log('payload ', action.payload)
            state.user = action.payload
        })
        builder.addCase(getUserDataBySession.rejected, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.loginMessage = action.error.message
        })
        builder.addCase(authLogout.pending, (state, action) => {
            state.isLoginPending = true
        })
        builder.addCase(authLogout.fulfilled, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = true
            state.isLoggedIn = false
            state.session = {}
        })
        builder.addCase(authLogout.rejected, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.loginMessage = action.error.message
        })
        builder.addCase(changeAuthProfile.pending, (state, action) => {
            state.isLoginPending = true
        })
        builder.addCase(changeAuthProfile.fulfilled, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = true
            state.isLoggedIn = false
            state.session = {}
            state.user = action.payload
            state.newLoggedData = action.payload
        })
        builder.addCase(changeAuthProfile.rejected, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.loginMessage = action.error.message
        })
    }
})

export default handleAuth.reducer