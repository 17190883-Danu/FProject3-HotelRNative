import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ProfilScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Profil Nih</Text>
        </View>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc"
    },
});