import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const FavoriteScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Favorit</Text>
        </View>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc"
    },
});