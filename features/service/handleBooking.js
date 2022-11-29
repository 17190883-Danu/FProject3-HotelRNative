import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    bookingHistory: [],
}

const handleBooking = createSlice({
    name: 'booking',
    initialState,
    reducers: {}
})

export default handleBooking.reducer