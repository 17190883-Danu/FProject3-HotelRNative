import React, {useState, useEffect} from 'react'
import {
    View, 
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet 
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
    addToBookHistory,
    getCurrency
} from '../../features/service/handleBooking'
import { getUserDataBySession } from '../../features/service/handleAuth'
import {
    InputText, 
    PrimaryButton
} from '../../components/atom'

const BookingScreen = ({navigation, route}) => {
    const { 
        price, 
        domain,
        checkIn, 
        checkOut, 
        days, 
        guest, 
        hotelId, 
        hotelName,
        hotelAddress,
        roomId, 
        roomName 
    } = route.params
    const authState = useSelector((state) => state.auth)
    const bookingState = useSelector((state) => state.booking)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currency, setCurreny] = useState('Default_Currency');
    const [showDropdown, setShowDropdown] = useState(false);
    const [dialCodeList, setDialCodeList] = useState([]);
    const [dialCode, setDialCode] = useState('');

    useEffect(() => { 
        dispatch(getUserDataBySession())
    }, [])

    useEffect(() => {
        dispatch(getCurrency(domain))
    }, [])

    useEffect(() => {
        setCurreny(bookingState.currency)
    }, [bookingState.currency])

    useEffect(() => {
        setUserData(authState.user)
        setFullName(`${authState.user.first_name} ${authState.user.last_name}`)
        setPhoneNumber(authState.user.phone_number)
    }, [authState])

    // useEffect(() => {
    //     const countryCodeData = require('../../features/CountryCodes.json');
    //     // console.log(countryCodeData)
    //     const phoneNumberCode = countryCodeData.map((item) => {
    //         const newItem = {code: item.code};
    //         return newItem
    //     })
    //     // console.log('code ', phoneNumberCode)
    //     setDialCodeList(phoneNumberCode)
    // }, [])

    const handleOnpress = () => {
        // console.log('userData ', userData)
       const bookingData = {
            user_id: userData.id,
            full_name: fullName,
            email: userData.email,
            phone_number: phoneNumber,
            hotel_id: hotelId,
            hotel_name: hotelName,
            hotel_address: hotelAddress,
            room_id: roomId,
            room_name: roomName,
            check_in: checkIn,
            check_out: checkOut,
            total_price: price,
            currency: currency,
            total_days: days,
            total_guest: guest
        }
        console.log('bookingData ', bookingData)
        dispatch(addToBookHistory(bookingData))
        navigation.navigate('Booking History')
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'fff'
        }}>
            <ScrollView contentContainerStyle={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Contact Informations</Text>
                    <InputText
                        label={'Full Name'}
                        value={fullName}
                        onChangeText={(value) => setFullName(value)}
                        placeholder="Full Name" />
                    <InputText
                        label={'Email'}
                        value={userData.email}
                        placeholder="Email"
                        editable={false}
                        />
                    <InputText
                        label='Phone Number'
                        value={phoneNumber}
                        onChangeText={(value) => setPhoneNumber(value)}
                        placeholder="Phone Number"
                        />

                    {/* <View style={styles.priceInfo}>
                        <Text style={styles.sectionTitle}>Price Information</Text>
                        <View>
                            <Text>3 Days, 1 Room, 2 Guests</Text>
                            <Text></Text>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
            {/* <View style={styles.phoneNumber}>
            </View> */}

            <View style={styles.summaryPrice}>
                <Text style={[styles.sectionTitle, {alignSelf: 'flex-start', marginTop: 0}]}>Price Summary</Text>
                <Text style={{fontFamily: 'Poppins-Medium', marginBottom: 4}}>{roomName}</Text>
                <View style={styles.priceInfo}>
                    <Text>{days} days, {guest} Guest</Text>
                    <Text style={styles.totalPrice}>{`${currency} ${price}`}</Text>
                </View>
            <PrimaryButton
                text="Book Now"
                onPress={handleOnpress}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        paddingTop: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 28,
        color: '#1c1c1c',
    },
    phoneNumber :{
        flexDirection: 'row',
    },
    summaryPrice: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    priceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default BookingScreen