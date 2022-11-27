import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer'

const Drawer = createDrawerNavigator();

const content = () => {
    return (
        <View style={styles.container}>
            <Text>Modal Screen</Text>
            <TextInput style={styles.input} placeholder="Input" />
        </View>
    )
}

const DrawerScreen = () => {
    return (
        <Drawer.Navigator
            id='drawer'
            drawerContent={(props) => <content {...props} />}
            creenOptions={{
                headerShown: false,
                drawerPosition: 'left',
            }}
        >

        </Drawer.Navigator>
    )
}