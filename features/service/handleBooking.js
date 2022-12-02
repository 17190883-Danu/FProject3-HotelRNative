import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const initialState = {
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    bookingHistory: [],
    hotelDetail: {},
    hotelRooms: {}, 
    currency: 'N/A',
}

const rapidAPIKey = '7528aeab88msh0019347624ff8e9p1feb25jsnddbd3035f730'

export const getHotelDetail = createAsyncThunk('booking/getHotelDetail', async ({
    hotelId, 
    domain
}) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
            params: {locale: 'en_US', domain: domain, hotel_id: hotelId},
            headers: {
              'X-RapidAPI-Key': rapidAPIKey,
              'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
          };
        const data = axios.request(options).then((res) => {
            return res.data
        })
        return data
    }catch(e){ 
        console.log(e)
    }
})

export const getHotelsRoom = createAsyncThunk('booking/getHotelsRoom', async ({
    hotelId, 
    guestNumber, 
    checkInString, 
    checkOutString, 
    domain
}) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
            params: {
              adults_number: guestNumber,
              locale: 'en_US',
              hotel_id: hotelId,
              checkout_date: checkOutString,
              checkin_date: checkInString,
              domain: domain,
            },
            headers: {
              'X-RapidAPI-Key': rapidAPIKey,
              'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
          };
        const data = axios.request(options).then((res) => {
            return res.data
        })
        return data
    } catch(e) {
        console.log(e)
    }
})

export const getCurrency = createAsyncThunk('booking/getCurrency', async (domain) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/domains',
            headers: {
              'X-RapidAPI-Key': rapidAPIKey,
              'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        };
        const data = axios.request(options).then((res) => {
            console.log('res3 data', res.data)
            console.log('res3 ', res.data[domain].currency)
            return res.data[domain].currency
        })
        return data
    } catch(e) {
        console.log(e)
    }
})

export const addToBookHistory = createAsyncThunk('booking/addToBookHistory', async (newData) => {
    try {
        console.log('newData ', newData)
        const value = await AsyncStorage.getItem('bookingHistory')
        if(value !== null){
            const data = JSON.parse(value)
            const pushData = [...data, newData]
            await AsyncStorage.setItem('bookingHistory', JSON.stringify(pushData))
        }else{
            await AsyncStorage.setItem('bookingHistory', JSON.stringify([newData]))
        }
    }catch(e){
        console.log(e)
    }
})

export const getBookHistory = createAsyncThunk('booking/getBookHistory', async (userId) => {
    try{
        return await AsyncStorage.getItem('bookingHistory').then((res) => {
            return JSON.parse(res).filter((item) => item.userId === userId)
        })
        // .then((res) => {
        //     return JSON.parse(res).filter((item) => item.userId === userId)
        // })
        
        // return value
    }catch(e){
        console.log(e)
    }
})

const handleBooking = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getHotelDetail.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getHotelDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            state.isRejected = false
            // console.log('payload Data', action.payload)
            state.hotelDetail = action.payload
        })
        builder.addCase(getHotelDetail.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
            state.isFulfilled = false
        })
        builder.addCase(getHotelsRoom.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getHotelsRoom.fulfilled, (state, action) => {
            state.isLoading = false
            state.isRejected = false
            state.isFulfilled = true
            // console.log('payload Room ', action.payload)
            state.hotelRooms = action.payload
            // console.log('state hotelImage ', state.hotelImage)
        })
        builder.addCase(getHotelsRoom.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
            state.isFulfilled = false
        })
        builder.addCase(getCurrency.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getCurrency.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            console.log('payload Currency ', action.payload)
            state.currency = action.payload
        })
        builder.addCase(getCurrency.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
        })
        builder.addCase(addToBookHistory.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(addToBookHistory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            state.bookingHistory = action.payload
        })
        builder.addCase(addToBookHistory.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
        })
        builder.addCase(getBookHistory.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getBookHistory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            console.log('payload ', action.payload)
            state.bookingHistory = action.payload
        })
        builder.addCase(getBookHistory.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
        })
    }
})

export default handleBooking.reducer