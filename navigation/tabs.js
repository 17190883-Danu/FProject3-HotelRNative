import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfilScreen from './screens/ProfilScreen';
import SettingScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';

import { useSelector, useDispatch } from 'react-redux';
import {
    authLogin,
    checkSession
} from '../features/service/handleAuth';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [userSession, setUserSession] = useState(null);
    // const [isLogin, setIsLogin] = useState(false);
    const userState = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    
    const checkUserSession = async () => {
        const getSession = await AsyncStorage.getItem('session')
        if(getSession !== null) {
            setUserSession(res)
        } else {
            setUserSession(null)
        }
        // console.log('sessionHere ', res)
        return getSession
    }

    useEffect(() => {
        dispatch(checkSession())
    }, []);

    useEffect(() => {
        setUserSession(userState.session)
        // console.log('userState ', userState.session)
    }, [userState])

    return(
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundcolor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            {/* NAV HOME */}
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10, paddingBottom: 12,}}>
                        <Image 
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        {/* <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Search</Text> */}
                    </View>
                )
            }}/>

            {/* NAV FAVORITE */}
            <Tab.Screen name="Favorit" component={FavoriteScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10, paddingBottom: 12,}}>
                        <Image 
                            source={require('../assets/icons/favorite.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        {/* <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Favorite</Text> */}
                    </View>
                )
            }}/>

            {/* NAV PROFIL & LOGIN */}
            {userSession !== {} ? (
                <Tab.Screen name="Profil" component={ProfilScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10, paddingBottom: 12,}}>
                        <Image 
                            source={require('../assets/icons/profil.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        {/* <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Profil</Text> */}
                    </View>
                ),
            }}/>
            ) : (
                <Tab.Screen name="Login" component={LoginScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10, paddingBottom: 12,}}>
                        <Image 
                            source={require('../assets/icons/round-login.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        {/* <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Login</Text> */}
                    </View>
                ),
                headerShown: false,
            }}/>
            )}

            {/* NAV SETTING */}
            {/* <Tab.Screen name="Setting" component={SettingScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10, paddingBottom: 12,}}>
                        <Image 
                            source={require('../assets/icons/setting.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                    </View>
                )
            }}/> */}

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;