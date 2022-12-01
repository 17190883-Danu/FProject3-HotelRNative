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
import {
    InputText,
    PrimaryButton
} from '../../components/atom'

const BookingHistoryScreen = ({navigation}) => {
    const [bookHistory, setBookHistory] = useState([])
    const bookingState = useSelector((state) => state.booking)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBookHistory())
        console.log('s')
    }, [])

    useEffect(() => {
        setBookHistory(bookingState.bookingHistory)
        console.log('bookingState ', bookHistory)
    }, [bookingState])

    return (
        <View style={styles.container}>
            <FlatList
                data={bookHistory}
                keyExtractor={(item) => item++}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.bookingCard}>
                        <Text style={{color:'black'}}>aaaa</Text>
                            <Image 
                                style={styles.cardImage}
                                source={{uri: item.hotel_image}}
                            />
                            <View style={styles.hotelInfo}>
                                <Text style={styles.hotelName}>{item.hotel_name}</Text>
                                <Text style={styles.hotelAddress}>{item.address}</Text>
                                <Text
                                    // onPress={() => navigation.navigate('Hotel Detail', {hotelId: item.hotel_id})}
                                    style={styles.bookButton}
                                >Book Again</Text>
                            </View>
                        </View>
                    )
                }}
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
        flexDirection: 'row',
        alignItems: 'center',

        
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
    cardImage: {
        flex: 1.3,
        // width: 96,
        height: '100%',
        aspectRatio: 1,
        borderRadius: 8,
    },
    hotelInfo: {
        flex: 2,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    hotelName: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginBottom: -4,
    },
    bookButton: {
        marginTop: 24,
        alignSelf: 'flex-end',
        color: '#512fb5',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    }
})

export default BookingHistoryScreen