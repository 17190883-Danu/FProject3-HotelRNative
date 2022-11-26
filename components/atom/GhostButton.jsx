import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const GhostButton = ({
    label,
    icon,
    onPress,
    style
}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // backgroundColor: 'red',
        width: '100%',
        paddingVertical: 16,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    }
})

export default GhostButton