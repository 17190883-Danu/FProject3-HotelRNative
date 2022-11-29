import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    View, 
    Text, 
    Image,
    StyleSheet 
} from 'react-native'
import axios from 'axios'

import {
    InputText,
    PrimaryButton
} from '../../components/atom'

const BookingHistoryScreen = ({navigation}) => {
    const bookingState = useSelector((state) => state.booking)
    const dispatch = useDispatch()

    useEffect(() => {

    })

    return (
        <View style={styles.container}>
            <View style={styles.bookingCard}>
                <Image 
                    style={styles.cardImage}
                    source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                />
                <View style={styles.hotelInfo}>
                    <Text style={styles.hotelName}>Garden Hotel</Text>
                    <Text style={styles.hotelAddress}>Addressssssssssssssss sssss s s ssss sssss</Text>
                    <Text
                        onPress={() => console.warn('pressed')}
                        style={styles.bookButton}
                    >Book Again</Text>
                </View>
            </View>
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