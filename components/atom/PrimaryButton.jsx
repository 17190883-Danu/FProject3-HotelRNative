import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const PrimaryButton = ({ onPress, text, style }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        paddingHorizontal: 36,
        paddingVertical: 16,
        backgroundColor: '#512fb5',
        borderRadius: 12,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'
    }
});

export default PrimaryButton;