// import React from "react";
import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from "react-native";
import { Button as ButtonB } from '@rneui/themed';

const HomeScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    return (
        <View style={styles.container}>

            {/* SEARCH */}
            <Image 
                source={require('hotelfp/assets/icons/home.png')}
                style={{
                    width: 25,
                    height: 25,
                    // alignItems: 'row',
                }}
            />
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />

            {/* DATE/KALENDER */}
            <Image 
                source={require('hotelfp/assets/icons/kalender.png')}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    // tintColor: focused ? '#e32f45' : '#748c94',
                }}
            />
            <Text style={{fontSize: 12}}>Check-in Date</Text>

            <Image 
                source={require('hotelfp/assets/icons/kalender.png')}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    // tintColor: focused ? '#e32f45' : '#748c94',
                }}
            />
            <Text style={{fontSize: 12}}>Check-Out Date</Text>

            {/* TAMU */}
            <Image 
                source={require('hotelfp/assets/icons/profil.png')}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    // tintColor: focused ? '#e32f45' : '#748c94',
                }}
            />
            <Text style={{fontSize: 12}}>Guest</Text>

            {/* BUTTON SEARCH */}
            <ButtonB
                // ViewComponent={Search} // Don't forget this!
                // linearGradientProps={{
                //     colors: ["#FF9800", "#F44336"],
                //     start: { x: 0, y: 0.5 },
                //     end: { x: 1, y: 0.5 },
                // }}
                >
                Search
            </ButtonB>

            
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "#8fcbbc"
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
});