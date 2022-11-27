import React, {useRef, useEffect, useState} from 'react';
import {
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Animated, 
    StyleSheet
} from 'react-native';
import {
    PrimaryButton,
    InputText
} from '../../components/atom'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalScreen = ({
    navigation,
    route
}) => {
    const { title, value, key } = route.params;
    const [inputValue, setInputValue] = useState(value);
    const slideAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
            slideAnim,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }
        ).start()
    }, [slideAnim])
    
    const sessionUserId = async() => {
        try {
            await AsyncStorage.getItem('session')
            .then((res) => {
                return JSON.parse(res).id
            })
        } catch(e) {
            console.log('error ', e)
        }
    }

    const handleOnpress =  async (key) => {
        try {
            const userData = require('../../features/user.json')
            await AsyncStorage.getItem('session')
            .then((res) => {
                const userId = JSON.parse(res).id
                const user = userData.map((data) => {
                    if(data.id === userId) {
                        data[key] = inputValue
                        return data
                    }
                })
                return user
            })
            .then((res) => {
                console.log('res ', res[0][key])
            })
        } catch(e) {
            console.log('error ', e)
        }
    }

    return (
        <Animated.View style={[
            styles.container,
            {
                transform: [
                    {
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 0]
                        })
                    }
                ]    
            }
        ]}>
        <TouchableOpacity style={styles.closeArea} onPress={() => navigation.goBack()}></TouchableOpacity>
            <View style={styles.modalBackground}>
                <Text style={styles.title}>{title}</Text>
                {/* <View style={styles.input}>
                    <TextInput autoFocus value={value} />
                </View> */}
                <InputText
                    value={inputValue}
                    placeholder='First Name'
                    onChangeText={(text) => setInputValue(text)}
                    autoFocus={true}
                />
                <PrimaryButton
                    text="Change"
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        minWidth: '30%'
                    }}
                    onPress={() => handleOnpress(key)}
                />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    closeArea: {
        width: '100%',
        height: '70%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    modalBackground: {
        backgroundColor: '#fff',
        height: '30%',
        width: '100%',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 24,
    },
    inputField: {
        fontSize: 14,
        paddingVertical: 12,
        width: '90%',
    }
})

export default ModalScreen;