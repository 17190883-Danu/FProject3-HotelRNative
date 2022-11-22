// import React from "react";
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Image, TextInput, StatusBar } from "react-native";
import { Button as ButtonB } from '@rneui/themed';

import SearchHotel from '../SearchHotel';

import { Card } from 'react-native-paper';

const HomeScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                
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
                // underlineColorAndroid="transparent"
                placeholder="Search Here"
            />

            {/* DATE/KALENDER */}
            <View style={{flex: 1, backgroundColor: 'blue', padding: 0}}>
                <Image 
                    source={require('hotelfp/assets/icons/kalender.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        // tintColor: focused ? '#e32f45' : '#748c94',
                    }}
                />
                <Text style={{
                        fontSize: 15, 
                        fontWeight: 'bold', 
                        color: '20232a', 
                        bordercolor: '20232a',
                        // textAlign: 'center'
                        // flexDirection: 'row'
                    }}>Check-In Date</Text>
            </View>

            <View style={{flex: 1, backgroundColor: 'red', padding: 0}}>
                <Image 
                    source={require('hotelfp/assets/icons/kalender.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        // tintColor: focused ? '#e32f45' : '#748c94',
                    }}
                />
                <Text style={{
                        fontSize: 15, 
                        fontWeight: 'bold', 
                        color: '20232a', 
                        bordercolor: '20232a',
                        // textAlign: 'center'
                        // flexDirection: 'row'
                    }}>Check-Out Date</Text>
            </View>
            

            {/* TAMU */}
            <View style={{flex: 1, backgroundColor: 'green', padding: 0}}>
            <Image 
                source={require('hotelfp/assets/icons/profil.png')}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    // tintColor: focused ? '#e32f45' : '#748c94',
                }}
            />
            <Text style={{
                        fontSize: 15, 
                        fontWeight: 'bold', 
                        color: '20232a', 
                        bordercolor: '20232a',
                        // textAlign: 'center'
                        // flexDirection: 'row'
                    }}>Guest</Text>
            </View>
            

            {/* BUTTON SEARCH */}
            <ButtonB
                //  component={SearchHotel}
                // ViewComponent={SearchHotel} // Don't forget this!
                // linearGradientProps={{
                //     colors: ["#FF9800", "#F44336"],
                //     start: { x: 0, y: 0.5 },
                //     end: { x: 1, y: 0.5 },
                // }}
                >
                Search
            </ButtonB>

            {/* CARD  TOP */}
            <View style={{flexDirection: 'row'}}>
                <View style={styles.card_template}>
                    <Text style={{fontSize: 12}}>TOP DESTINATION</Text>
                    <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
                    </View>
                </View>
            </View>
           
            <View style={{flexDirection: 'row'}}>
                <View style={styles.card_template}>
                    <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
                    </View>
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={styles.card_template}>
                    <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
                    </View>
                </View>
            </View>

             {/* CARD POPULAR  */}
             <View style={{flexDirection: 'row'}}>
                <View style={styles.card_template}>
                    <Text style={{fontSize: 12}}>TOP POPULAR</Text>
                    <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
                    </View>
                </View>
            </View>
           
            <View style={{flexDirection: 'row'}}>
                <View style={styles.card_template}>
                    <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
                    </View>
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={styles.card_template}>
                    <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
                    </View>
                </View>
            </View>

            </ScrollView>
    </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
        alignItems: "center",
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
    
    //   card_tampil: {
    //     flexDirection: 'row'
    //   },
      card_template:{
        width: 250,
        height: 250,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
        // flexDirection: 'row'
      },
      card_image: {
        width: 250,
        height: 250,
        borderRadius : 10,
        // flexDirection: 'row'
      },
      text_container:{
        position: "absolute",
        width: 250,
        height: 30,
        bottom:0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
      },
      card_title: {
         color: "white",
         flexDirection: 'row'
      }
});