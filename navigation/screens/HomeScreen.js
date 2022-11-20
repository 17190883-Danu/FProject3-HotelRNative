// import React from "react";
import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from "react-native";

const HomeScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    return (
        <View style={styles.container}>
            <Image 
                source={require('hotelfp/assets/icons/home.png')}
                style={{
                    width: 25,
                    height: 25,
                    alignItems: 'row',
                }}
            />
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
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