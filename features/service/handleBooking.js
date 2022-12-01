import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const initialState = {
    isLoading: true,
    isRejected: false,
    isFulfilled: false,
    bookingHistory: [],
    hotelDetail: {},
    hotelRooms: {}
}

const rapidAPIKey = '8196d46e7bmsh03e6e62aae9dc94p1bfa51jsn063f23303e86'

export const getHotelDetail = createAsyncThunk('booking/getHotelDetail', async ({
    hotelId, 
    currency
}) => {
    // console.log({
    //     hotel_id: hotelId,
    //     guest_number: guestNumber,
    //     checkin_date: checkinDate,
    //     checkout_date: checkoutDate,
    //     currency: currency
    // })
    try {
        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
            params: {currency: currency, locale: 'en_US', hotel_id: hotelId},
            headers: {
              'X-RapidAPI-Key': rapidAPIKey,
              'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
          };
          console.log('options ', options)
        const data = axios.request(options).then((res) => {
            console.log('res1 ', res.data)
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
    checkinDate, 
    checkoutDate, 
    currency
}) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
            params: {
              hotel_id: hotelId,
              checkin_date: checkinDate,
              locale: 'en_US',
              adults_number: guestNumber,
              currency: currency,
              checkout_date: checkoutDate,
            },
            headers: {
              'X-RapidAPI-Key': rapidAPIKey,
              'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
          };
        const data = axios.request(options).then((res) => {
            console.log('res2 ', res.data)
            return res.data
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

export const getBookHistory = createAsyncThunk('booking/getBookHistory', async () => {
    try{
        const hotelData = require('../Hotels.json')
        const value = await AsyncStorage.getItem('bookingHistory')
        if(value !== null){
            const data = JSON.parse(value)
            console.log('json ', data)
            const newData = data.map((item) => {
                const hotel = hotelData.find((hotel) => hotel.hotel_id === item.hotel_id)
                console.log('hotel ', hotel)
                // console.log({...item, hotel_name: hotel.name, hotel_image: hotel.image})
                return {...item, hotel_name: hotel.name, hotel_image: hotel.image}
            })
            console.log('newData ', newData)
            return newData
        }
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
            console.log('payload Data', action.payload)
            state.hotelDetail = action.payload
        })
        builder.addCase(getHotelDetail.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
        })
        builder.addCase(getHotelsRoom.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getHotelsRoom.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            console.log('payload Room ', action.payload)
            state.hotelRooms = action.payload
            // console.log('state hotelImage ', state.hotelImage)
        })
        builder.addCase(getHotelsRoom.rejected, (state) => {
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
            state.bookingHistory = action.payload
        })
        builder.addCase(getBookHistory.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
        })
    }
})

export default handleBooking.reducer