// import React from "react";
// import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Image, TextInput, Keyboard, StatusBar, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button as ButtonB } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'
import SelectDropdown from 'react-native-select-dropdown'

import { SearchBar } from 'react-native-elements';

import { Card } from 'react-native-paper';
import { renderNode } from '@rneui/base';

const HomeScreen = ({navigation}) => {
    
    // checkin-out
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    // guest
    const countries = ["1", "2", "3", "4"]

    const [dataHotel, setDataHotel] = useState([])

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8fd1a5b2femsh8b30ece821c1981p13a5c2jsn509938dc40cc',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetch('https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?locale=en_US&currency=USD&query=Jakarta', options)
        .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(err => console.error(err));
        .then(json => {
            console.log('ere ',json)
            setDataHotel(json.suggestions[1])
        })
    }, []);
    // // const [page, setPage] = useState();

    
    
    

        useEffect(() => {
            console.log('data Hotel ', dataHotel)
        }, [dataHotel])
         
    // const [search, setSearch] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                
        {/* SEARCH */}
        {/* <View style={{ height: 75, width: 'auto', alignItems: 'center'}}> */}
        <SearchBar
                    placeholder="Type Here..."
                    // onChangeText={this.updateSearch}
                    // value={search}
                />
        {/* </View> */}
            

            {/* DATE/Check-IN/OUT */}
            <View style={{flexDirection: 'row', height: 50, width: 'auto'}}>
                <Button title="Check-In Date" onPress={() => setOpen(true)} />
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />

                <Button title="Check-Out Date" onPress={() => setOpen(true)} />
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />
            </View>
               
            
            {/* TAMU */}
            <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            

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
                <View style={{flexDirection: 'row',}}>
                    <View style={styles.card_template}>
                        <Text style={{fontSize: 12}}>TOP DESTINATION</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Hotel Detail', {
                            hotelId: '17903319',
                            guestNumber: '4',
                            checkinDate: '2023-12-12',
                            checkoutDate: '2023-12-15',
                            currency: 'USD',
                        })}>
                            <Image
                                style={styles.card_image}
                                source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                            />
                            <View style={styles.text_container}>
                                <Text style={styles.card_title}>{dataHotel.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                        <Image
                            style={styles.card_image}
                            source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                        />
                        <View style={styles.text_container}>
                            <Text style={styles.card_title}>Some Textt</Text>
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
                <Image 
                        style={styles.card_image}
                        source={{uri: 'https://www.ruparupa.com/blog/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-14.56.22.jpg'}}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.card_title}>Some Textt</Text>
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
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center',
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
        width: 100,
        height: 130,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
        // flexDirection: 'row'
      },
      card_image: {
        width: 100,
        height: 100,
        borderRadius : 20,
        // flexDirection: 'row'
      },
      text_container:{
        position: "absolute",
        width: 100,
        height: 30,
        bottom:0,
        padding: 5,
        backgroundColor: "rgba(0, 0.3)",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row'
      },
      card_title: {
         color: "white",
         flexDirection: 'row'
      }
});