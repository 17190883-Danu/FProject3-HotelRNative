import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const GhostButton = ({
    label,
    icon,
    type,
    value,
    onPress,
    style
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {icon && <Image source={icon} style={styles.icon} />}
            <View>
                <Text style={{...styles.text, color: type === 'danger' ? '#e32f45' : '#474747'}}>{label}</Text>
                {
                    value && <Text style={styles.value}>{value}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        paddingLeft: 12,
    },
    icon: {
        width: 16,
        aspectRatio: 1,
        resizeMode: 'contain',
        marginRight: 16,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    },
    value: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    }
})

GhostButton.defaultProps = {
    label: 'Button',
    icon: null,
    type: 'primary',
    value: null,
}

export default GhostButton