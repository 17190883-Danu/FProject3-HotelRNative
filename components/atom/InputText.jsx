import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image
} from 'react-native'
import propTypes from 'prop-types';

const InputText = ({
    label,
    placeholder,
    value,
    secureTextEntry,
    iconSrc,
    style,
    keyboardType,
    autoCapitalize,
    onChangeText,
    autoFocus,
    isPassword,
    editable
}) => {
    // const [value, setValue] = useState(paramValue);
    return (
        <View style={[style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.input}>
                {iconSrc && <Image source={iconSrc} resizeMode='contain' style={styles.icon} />}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    editable={editable}
                    style={styles.inputField}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        // marginBottom: -4,
        // marginLeft: 24,
        marginTop: 8,
    },
    input: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 16,
        // paddingVertical: 2,
        marginBottom:16,
    },
    inputField: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: '#ccc',
        marginRight: 4,
    }
})

InputText.defaultProps = {
    label: null,
    secureTextEntry: false, 
    iconSrc: null,
    value: '',
    keyboardType: 'default',
    autoCapitalize: 'sentence',
    autoFocus: false,
    isPassword: false,
    editable: true,
}

InputText.propTypes = {
    placeholder: propTypes.string.isRequired,
}

export default InputText