import react, {useEffect, useState} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Button
} from 'react-native'

import { Provider, useSelector, useDispatch } from 'react-redux';
import { authLogin } from '../../features/service/handleAuth';

import {
    PrimaryButton,
    InputText
} from '../../components/atom'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editableField, setEditableField] = useState(true);
    const userState = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    
    const handleLogin = () => {
        dispatch(authLogin({email, password}))
        setPassword('')
    }

    useEffect(() => {
        if (userState.isLoginPending) {
            setEditableField(false)
        } else {
            setEditableField(true)
        }
    }, [userState.isLoginPending])

    useEffect(() => {
        if (userState.isLoginSuccess) {
            navigation.navigate('Home')
            console.log('here ')
        }
    }, [userState.isLoginSuccess])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.loginText}>Welcome back! You've been missed</Text>
            <InputText
                value={email}
                label="Email"
                placeholder="example@email.com"
                iconSrc={require('../../assets/icons/alternate-email-rounded.png')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={editableField}
                onChangeText={(text) => setEmail(text)}
            />
            <InputText
                value={password}
                label="Password"
                placeholder="Your secret password here"
                iconSrc={require('../../assets/icons/key.png')}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={editableField}
                editable={true}
                style={{marginBottom: 20}}
            />
            <PrimaryButton
                text="Login"
                onPress={handleLogin}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 56,
        paddingHorizontal: 36,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        // fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
    },
    loginText: {
        width: '70%',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 2,
        marginBottom:16,
    },
    inputField: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
    },
    loginButton: {
        width: '40%',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    }
})

export default LoginScreen;