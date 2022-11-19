import React, {useState} from "react";
import { View, Text, Button, StyleSheet, StatusBar, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = ({navigation}) => {
    
    const [input, setInput] = useState('')

    return (
        <View style={styles.container}>
             <Image 
                source={require('hotelfp/assets/icons/home.png')} 
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                }}
            />
        <TextInput 
            style={styles.textinput}
            placeholder="Masukkan"
            onChangeText={text => setInput(text)}
            defaultValue={input}    
        />
        <StatusBar style="auto" />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "#8fcbbc",
        flexDirection: 'row',
        textAlign: 'center'
    },
    textinput: {
        height: 40,
        // alignItems: 'center',
        textAlign: 'center'
    }
});