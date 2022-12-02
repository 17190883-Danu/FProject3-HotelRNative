import React, {useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    StyleSheet 
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {useDispatch, useSelector} from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import Moment from 'moment'

import {
    getHotelDetail,
    getHotelsRoom
} from '../../features/service/handleBooking'

const HotelDetailScreen = ({
    navigation,
    route
}) => {
    const { hotelId, guestNumber, checkinDate, checkoutDate, domain } = route.params
    const [refreshing, setRefreshing] = useState(false)
    const [modalCheckInOpen, setModalCheckInOpen] = useState(false)
    const [modalCheckOutOpen, setModalCheckOutOpen] = useState(false)
    const [checkInDatePicker, setCheckInDatePicker] = useState(Moment(checkinDate).toDate())
    const [checkOutDatePicker, setCheckOutDatePicker] = useState(Moment(checkoutDate).toDate())
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
    const [hotelRooms, setHotelRooms] = useState({
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
    const diffDate = (checkOutDatePicker - checkInDatePicker) / (1000 * 3600 * 24)
    const sliceState = useSelector((state) => state.booking)
    const roomState = useSelector((state) => state.booking.hotelRooms)
    const dispatch = useDispatch()

    const dispatchHotelRoomsData = async () => {
        return dispatch => dispatch(getHotelsRoom(hotelId, checkInDatePicker, checkOutDatePicker, guestNumber))
    }

    const actions = () => {
        return dispatch => {
            dispatch(getHotelDetail({
                hotelId,
                domain
            }))
            dispatch(getHotelsRoom({
            hotelId, 
            checkinDate, 
            checkoutDate, 
            guestNumber
            }))
            return Promise.resolve()
        }
    }

    useEffect(() => {
        dispatch(getHotelDetail({
            hotelId,
            domain
        })).then(() => {
            setHotel(sliceState.hotel)
        }).then(() => {
            dispatch(getHotelsRoom({
            hotelId, 
            checkinDate, 
            checkoutDate, 
            guestNumber
            }))
        }).then(() => {
            setHotelRooms(roomState)
        }).then(() => {
            onRefresh()
        })
        // setHotel(sliceState.hotelDetail)
        // setHotelRooms(roomState)
        // setRefreshing(false)
    }, [])

    useEffect(() => {
        setHotel(sliceState.hotelDetail)
        console.log('hotelDetail', hotel)
    }, [sliceState.hotelDetail])

    useEffect(() => {
        setHotelRooms(sliceState.hotelRooms)
        console.log('hotelRooms', hotelRooms)
    }, [sliceState])

    const handlePress = (price, roomId, roomName) => {
        const checkInString = Moment(checkInDatePicker).format('YYYY-MM-DD');
        const checkOutString = Moment(checkOutDatePicker).format('YYYY-MM-DD');
        navigation.navigate('Book Room', {
            price: price,
            domain: domain,
            checkIn: checkInString,
            checkOut: checkOutString,
            days: diffDate,
            guest: guestNumber,
            hotelId: hotelId,
            hotelName: hotel.summary?.name,
            hotelAddress: hotel.summary?.location.address.addressLine,
            roomId: roomId,
            roomName: roomName
        })
    }

    const onRefresh = () => {
        setRefreshing(true)
        dispatch(getHotelDetail({
            hotelId,
            domain
        }))
        const checkInString = Moment(checkInDatePicker).format('YYYY-MM-DD');
        const checkOutString = Moment(checkOutDatePicker).format('YYYY-MM-DD');
        dispatch(getHotelsRoom({
            hotelId,
            guestNumber,
            checkInString,
            checkOutString,
            domain
        }))
        setRefreshing(false)
    }

    return (
       <View style={styles.container}>
         {sliceState.isLoading && refreshing == true ? (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
         ) : (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                
                <View>
                    <View style={styles.header}>
                        <Image
                            style={styles.imageHeader}
                            source={{uri: hotel?.propertyGallery?.images[0]?.image?.url}}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                            style={{flex: 1, position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}}
                        >
                            <View style={styles.hotelSummaryInfo}>
                                <View style={styles.hotelNameAddress}>
                                    <Text style={styles.hotelName}>{hotel?.summary?.name}</Text>
                                    <Text style={styles.hotelAddress}>{hotel?.summary?.location.address.addressLine}</Text>
                                </View>
                                {/* <Text style={styles.hotelPrice}>{hotel.featuredPrice.currentPrice.formatted}</Text> */}
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={styles.body}>
                        {/* <View style={{flex: 2, flexDirection: 'row', }}>
                            <TouchableOpacity
                            style={{
                                padding: 8,
                                flex: 1,
                                borderColor: '#512fb5',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginRight: 8
                            }}
                            onPress={() => setModalCheckInOpen(true)}>
                                <DatePicker
                                    modal
                                    mode="date"
                                    open={modalCheckInOpen}
                                    date={checkInDatePicker}
                                    onConfirm={(date) => {
                                        setModalCheckInOpen(false)
                                        setCheckInDatePicker(Moment(date).toDate())
                                        const checkInString = Moment(checkInDatePicker).format('YYYY-MM-DD');
                                        const checkOutString = Moment(checkOutDatePicker).format('YYYY-MM-DD');
                                        dispatchHotelRoomsData()
                                        dispatch(getHotelsRoom({
                                            hotelId,
                                            guestNumber,
                                            checkInString,
                                            checkOutString,
                                            domain
                                        })) // update ruangan
                                        // setHotelRooms(roomState) // data ruangannya
                                    }}
                                    onCancel={() => {
                                        setModalCheckInOpen(false)
                                    }}
                                />
                                <Text style={{ fontSize: 12 }}>Check-In Date</Text>
                                <Text style={{fontFamily: 'Poppins-SemiBold'}}>{Moment(checkInDatePicker).format('DD-MM-YYYY')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={{
                                padding: 8,
                                flex: 1,
                                borderColor: '#512fb5',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginLeft: 8
                            }}
                            onPress={() => setModalCheckOutOpen(true)}>
                                <DatePicker
                                    modal
                                    mode="date"
                                    open={modalCheckOutOpen}
                                    date={checkOutDatePicker}
                                    onConfirm={(date) => {
                                        setModalCheckOutOpen(false)
                                        setCheckOutDatePicker(Moment(date).toDate())
                                        const checkInString = Moment(checkInDatePicker).format('YYYY-MM-DD');
                                        const checkOutString = Moment(checkOutDatePicker).format('YYYY-MM-DD');
                                        console.log('checkInString', checkInString)
                                        console.log('checkOutString', checkOutString)
                                        dispatch(getHotelsRoom({
                                            hotelId,
                                            guestNumber,
                                            checkInString,
                                            checkOutString,
                                            domain
                                        }))
                                    }}
                                    onCancel={() => {
                                        setModalCheckOutOpen(false)
                                    }}
                                />
                                <Text style={{ fontSize: 12 }}>Check-Out Date</Text>
                                <Text style={{fontFamily: 'Poppins-SemiBold'}}>{Moment(checkOutDatePicker).format('DD-MM-YYYY')}</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.detail}>
                            <Text style={styles.subHeading}>Checkin Instructions</Text>
                            <FlatList
                                data={hotel?.summary?.policies.checkinInstructions}
                                renderItem={({item}) => (
                                    <Text style={styles.detailText}>- {item}</Text>
                                )}
                            />

                            <Text style={styles.subHeading}>Child and Bed</Text>
                            <FlatList
                                data={hotel?.summary?.policies.childAndBed.body}
                                renderItem={({item}) => (
                                    <Text style={styles.detailText}>- {item}</Text>
                                )}
                            />

                            <Text style={styles.subHeading}>We Should Mention:</Text>
                            <FlatList
                                data={hotel?.summary?.policies.shouldMention.body}
                                renderItem={({item}) => (
                                    <Text style={styles.detailText}>- {item}</Text>
                                )}
                            />

                            <Text style={styles.subHeading}>Rooms</Text>
                        </View>

                        <ScrollView horizontal={true}>
                            <View>
                                {sliceState.isLoading ? (
                                    <ActivityIndicator size="large" color="#512fb5" />
                                ):(
                                    <FlatList
                                    horizontal
                                    style={{
                                        width: Dimensions.get('window').width,
                                        marginBottom: 28,
                                        paddingRight: 28
                                    }}
                                        data={hotelRooms?.units} 
                                        // keyExtractor={(item) => item.id}
                                        extraData={sliceState}
                                        renderItem={({item}) => {
                                            return (
                                                <TouchableOpacity
                                                disabled={item?.ratePlans.length > 0 ? false : true}
                                                onPress={() => handlePress(item?.ratePlans[0]?.priceDetails[0]?.price?.total?.amount, item?.id, item?.header.text)}>
                                                    <View style={styles.roomContainer}>
                                                        <Image
                                                            style={[styles.roomImage, {opacity: item?.ratePlans.length > 0 ? 1 : 0.5}]}
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
                                )}
                            </View>
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
        marginBottom: 16
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
        backgroundColor: 'white',
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
//     domain: 'USD'
// }

export default HotelDetailScreen