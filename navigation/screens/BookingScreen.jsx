import React, {useState, useEffect} from 'react'
import {
    View, 
    Text,
    FlatList,
    StyleSheet 
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDataBySession } from '../../features/service/handleAuth'
import {
    InputText, 
    PrimaryButton
} from '../../components/atom'

const BookingScreen = ({navigation}) => {
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [nightMode, setNightmode] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dialCodeList, setDialCodeList] = useState([]);
    const [dialCode, setDialCode] = useState('');

    useEffect(() => {
        dispatch(getUserDataBySession())
    }, [])

    useEffect(() => {
        console.log('state ', authState.user)
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

    return (
        <FlatList
            data={userData}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
                return (
                    <View style={styles.container}>
                        <Text style={styles.sectionTitle}>Contact Informations</Text>
                        <InputText
                            label={'Full Name'}
                            value={`${item.first_name} ${item.last_name}`}
                            placeholder="Full Name" />
                        <InputText
                            label={'Email'}
                            value={item.email}
                            placeholder="Email" />
                        <InputText
                            label='Phone Number'
                            value={item.phone_number}
                            placeholder="Phone Number" />
                        <View style={styles.phoneNumber}>
                        </View>
                        <PrimaryButton text="Primary Button" />
                    </View>
                )
            }}
                
        />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        flex: 1,
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
    }
})

export default BookingScreen