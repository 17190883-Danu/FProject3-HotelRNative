import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
    GhostButton
} from '../../components/atom'
import { authLogout } from "../../features/service/handleAuth";
import { useDispatch, useSelector } from "react-redux";

const ProfilScreen = ({navigation}) => {
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            {/* <Text>Profil Nih</Text> */}
            <GhostButton
                label='Logout'
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