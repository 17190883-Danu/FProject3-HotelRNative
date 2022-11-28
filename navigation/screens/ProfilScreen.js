import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GhostButton
} from '../../components/atom'
import { authLogout } from "../../features/service/handleAuth";
import { useDispatch, useSelector } from "react-redux";

const ProfilScreen = ({navigation}) => {
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    const getSession = () => {
        AsyncStorage.getItem('session')
        .then((res) => {
            AsyncStorage.getItem('user')
            .then((response) => {
                const userInfo = JSON.parse(response).map((user) => {
                    if(user.id === JSON.parse(res).id) {
                        return user
                    }
                })
                // console.log('userInfo ', userInfo)
                setUserData(...userInfo)
                return response
            })
        })
    }

    const getDialCode = (dialCode) => {
        const dialCodes = require('../../features/CountryCodes.json')
        const dialCodeInfo = dialCodes.map((code) => {
            if(code.code === dialCode) {
                return code
            }
        })
        const dialCodeResult = dialCodeInfo.filter((code) => code !== undefined)
        return dialCodeResult[0].dial_code
    }

    useEffect(() => {
        getSession()
    }, [authState])

    const handleLogout = () => {
        dispatch(authLogout()).then(() => navigation.navigate('Home'))
    }

    const handleOnpress = (title, value, key) => {
        // console.log('userData ', userData)
        navigation.navigate('modal', {
            title: title,
            value: value,
            key: key,
            userData: userData
        })
    }

    return (
        <View style={styles.container}>
            {/* <Text>Profil Nih</Text> */}
            <GhostButton
                label='First Name'
                icon={require('../../assets/icons/profil.png')}
                value={userData && userData.first_name}
                onPress={() => handleOnpress('First Name', userData && userData.first_name, 'first_name')}
            />
            <GhostButton
                label='Last Name'
                icon={require('../../assets/icons/profil.png')}
                value={userData && userData.last_name}
                onPress={() => handleOnpress('Last Name', userData && userData.last_name, 'last_name')}
            />
            <GhostButton
                label='Email'
                icon={require('../../assets/icons/alternate-email-rounded.png')}
                value={userData && userData.email}
                onPress={() => handleOnpress('Email', userData && userData.email, 'email')}
            />
            <GhostButton
                label='Phone Number'
                icon={require('../../assets/icons/Phone.png')}
                value={userData && `${getDialCode(userData.dial_code)} ${userData.phone_number}`}
                onPress={() => handleOnpress('Phone Number', userData && userData.phone_number, 'phone_number')}
            />
            {/* <GhostButton
                label='Phone Number'
                icon={require('../../assets/icons/phone.png')}
                value={sessionData && JSON.parse(sessionData).last_name}
            /> */}
            <GhostButton
                label='Log Out'
                type='danger'
                onPress={handleLogout}
            />
        </View>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "#fff",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
});