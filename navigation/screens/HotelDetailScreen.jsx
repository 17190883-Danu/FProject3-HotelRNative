import React, {useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet 
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import {
    getHotelDetail,
    getHotelsRoom
} from '../../features/service/handleBooking'

const HotelDetailScreen = ({
    navigation,
    route
}) => {
    const { hotelId, guestNumber, checkinDate, checkoutDate, currency } = route.params
    const [refreshing, setRefreshing] = useState(false)
    const [hotel, setHotel] = useState({
        'summary': {
            'name': '',
            'location': {
                'address': {
                    'addressLine' : ''
                },
            },
            'policies' : {
                'checkinInstructions': [''],
                'childAndBed' : {
                    'body' : ['']
                },
                'shouldMention' : {
                    'body': ['']
                }
            },
            
        },
        'propertyGallery' : {
            'images': [{
                'image' : {
                    'url': ''
                }
            }],
        }
    })
    const [rooms, setHotelRooms] = useState({
        'units' : [{
            'id': '',
            'header': {
                'text': ''
            },
            'unitGallery': {
                'gallery': [{
                    'image': {
                        'url': ''
                    }
                }]
            },
            'ratePlans': [{
                'priceDetails': [{
                    'price': {
                        'total': ''
                    },
                    'totalPriceMessage': ''
                }]
            }]
        }]
    })
    const diffDate = (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 3600 * 24)
    const sliceState = useSelector((state) => state.booking)
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('diffdate ', diffDate)
        dispatch(getHotelDetail({
            hotelId,
            currency
        }))
        dispatch(getHotelsRoom({
            hotelId,
            guestNumber,
            checkinDate,
            checkoutDate,
            currency
        }))
        console.log('hotel Room ', rooms)
        console.log('hotel ', hotel)
    }, [])

    useEffect(() => {
        setHotel(sliceState.hotelDetail)
        setHotelRooms(sliceState.hotelRooms)
        console.log('hotel Room ', rooms)
        console.log('hotel ', hotel)
    }, [sliceState])

    const handlePress = (price, roomId) => {
        navigation.navigate('Book Room', {
            price: price,
            currency: currency,
            checkIn: checkinDate,
            checkOut: checkoutDate,
            days: diffDate,
            guest: guestNumber,
            hotelId: hotelId,
            roomId: roomId,
        })
    }

    const onRefresh = () => {
        setRefreshing(true)
        dispatch(getHotelDetail({
            hotelId,
            currency
        }))
        dispatch(getHotelsRoom({
            hotelId,
            guestNumber,
            checkinDate,
            checkoutDate,
            currency
        }))
        setRefreshing(false)
    }

    return (
       <View style={styles.container}>
         {sliceState.isPending ? (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
         ) : (
            <ScrollView>
                <View>
                    <View style={styles.header}>
                        <Image
                            style={styles.imageHeader}
                            source={{uri: hotel.propertyGallery?.images[0]?.image?.url}}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                            style={{flex: 1, position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}}
                        >
                            <View style={styles.hotelSummaryInfo}>
                                <View style={styles.hotelNameAddress}>
                                    <Text style={styles.hotelName}>{hotel.summary?.name}</Text>
                                    <Text style={styles.hotelAddress}>{hotel.summary?.location.address.addressLine}</Text>
                                </View>
                                {/* <Text style={styles.hotelPrice}>{hotel.featuredPrice.currentPrice.formatted}</Text> */}
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.detail}>
                            <Text style={styles.subHeading}>Checkin Instructions</Text>
                            <FlatList
                                data={hotel.summary?.policies.checkinInstructions}
                                renderItem={({item}) => (
                                    <Text style={styles.detailText}>- {item}</Text>
                                )}
                            />

                            <Text style={styles.subHeading}>Child and Bed</Text>
                            <FlatList
                                data={hotel.summary?.policies.childAndBed.body}
                                renderItem={({item}) => (
                                    <Text style={styles.detailText}>- {item}</Text>
                                )}
                            />

                            <Text style={styles.subHeading}>We Should Mention:</Text>
                            <FlatList
                                data={hotel.summary?.policies.shouldMention.body}
                                renderItem={({item}) => (
                                    <Text style={styles.detailText}>- {item}</Text>
                                )}
                            />

                            <Text style={styles.subHeading}>Rooms</Text>
                        </View>

                        <ScrollView horizontal={true}>
                            <FlatList
                            horizontal
                            style={{
                                width: Dimensions.get('window').width,
                                marginBottom: 28
                            }}
                                data={rooms.units}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => {
                                    return (
                                        <TouchableOpacity onPress={() => handlePress(item?.ratePlans[0]?.priceDetails[0]?.price?.total?.amount, item.id)}>
                                            <View style={styles.roomContainer}>
                                                <Image
                                                    style={styles.roomImage}
                                                    source={{uri: item.unitGallery.gallery[0]?.image.url}}
                                                />
                                                <LinearGradient
                                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                                                style={{flex: 1, position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 8}}
                                                >
                                                    <View style={styles.roomInfo}>
                                                        <Text style={styles.roomName}>{item.header.text}</Text>
                                                        <Text style={styles.roomPrice}>{item.ratePlans[0]?.priceDetails[0].totalPriceMessage}</Text>
                                                    </View>
                                                </LinearGradient>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                ListEmptyComponent={() => (
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text>No Room Available</Text>
                                    </View>
                                )}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
         )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {

    },
    imageHeader: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.5,
        resizeMode: 'cover'
    },
    hotelSummaryInfo: {
        position: 'absolute',
        bottom: 0,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
    },
    hotelNameAddress: {

    },
    hotelName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#fff'
    },
    hotelAddress: {
        color: '#fff'
    },
    hotelPrice: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff'
    },
    body: {
        padding: 16,
    },
    detail: {
        marginBottom: 24
    },
    subHeading: {
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 8,
        fontSize: 16,
        marginTop: 24,
    },
    detailText: {
        marginTop: 4,
        lineHeight: 20
    },
    roomContainer: {
        width: Dimensions.get('window').width / 3,
        backgroundColor: 'red',
        borderRadius: 8,
        marginRight: 8,
    },
    roomImage: {
        borderRadius: 8,
        width: '100%',
        aspectRatio: 9/16,
        resizeMode: 'cover',
    },
    roomInfo: {
        padding: 8,
        position: 'absolute',
        bottom: 0,
    },
    roomName: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold'
    },
    roomPrice: {
        color: '#fff'
    }
})

// HotelDetailScreen.defaultProps = {
//     hotelId: '480872',
//     guestNumber: '4',
//     checkinDate: '2022-12-12',
//     checkoutDate: '2022-12-15',
//     currency: 'USD'
// }

export default HotelDetailScreen