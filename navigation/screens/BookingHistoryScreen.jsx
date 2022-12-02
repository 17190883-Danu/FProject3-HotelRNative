import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    View, 
    Text, 
    Image,
    FlatList,
    StyleSheet 
} from 'react-native'
import axios from 'axios'

import { getBookHistory } from '../../features/service/handleBooking'
import { getUserDataBySession } from '../../features/service/handleAuth'
import {
    InputText,
    PrimaryButton
} from '../../components/atom'

const BookingHistoryScreen = ({navigation}) => {
    const bookingState = useSelector((state) => state.booking)
    const [bookHistory, setBookHistory] = useState([])
    const [userData, setUserData] = useState([]);
    const userState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserDataBySession())
        .then(() => {
            setUserData(userState.user)
        })
        .then(() => {
            dispatch(getBookHistory(userData.id))
        })
        .then(() => {
            setBookHistory(bookingState.bookHistory)
        })
    }, [])

    // useEffect(() => {
    //     dispatch(getBookHistory(userData.id))
    //     setBookHistory(bookingState.bookingHistory) 
    // }, [])

    useEffect(() => {
        setBookHistory(bookingState.bookingHistory)
        // console.log('bookingStates ', bookHistory)
    }, [bookingState.bookingHistory])

    return (
        <View style={styles.container}>
            <FlatList
                style={{width: '100%'}}
                data={bookHistory}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.bookingCard}>
                            <View style={styles.bookInfo}>
                                <View style={styles.hotelInfo}>
                                    <Text style={styles.hotelName}>{item.hotel_name}</Text>
                                    <Text style={styles.hotelSubinfo}>{item.room_name}</Text>
                                    <Text style={styles.hotelSubinfo}>{item.hotel_address}</Text>
                                </View>
                                <View style={styles.checkInInfo}>
                                    <Text style={styles.hotelSubinfo}>Check In</Text>
                                    <Text style={styles.hotelSubinfo}>{item.check_in}</Text>
                                </View>
                            </View>
                            {/* <PrimaryButton
                                text='Book Again'
                            /> */}
                        </View>
                    )
                }}
                ListEmptyComponent={() => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>Tidak ada riwayat booking</Text>
                    </View>
                )}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
        paddingTop: 36,
        backgroundColor: 'white'
    },
    bookingCard: {
        width: '100%',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    bookInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    hotelInfo: {
        flex: 2,
    },
    checkInInfo: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    hotelName: {
        color: '#303030',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        marginBottom: 6,
    },
    hotelSubinfo: {
        color: '#303030',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
    },
})

export default BookingHistoryScreen