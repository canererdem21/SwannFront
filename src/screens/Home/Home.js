import { View, Text, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleHeader from '../../components/Header/TitleHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'
import MainStore from '../../store/MainStore'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PlayerSheet from '../../components/Player/PlayerSheet'
import axios from 'axios'
import serverConfig from '../../config/serverConfig'

const { width, height } = Dimensions.get('window')


const Home = ({ navigation }) => {

    const [moodData, setMoodData] = useState(null)
    const [relaxingData, setRelaxingData] = useState(null)
    const [trendingData, setTrendingData] = useState(null)
    const [appReady, setAppReady] = useState(false)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        axios.get(`${serverConfig.ip}/getHomeData`).then(res => {
            setTrendingData(res.data.trendingData)
            setMoodData(res.data.moodData)
            setRelaxingData(res.data.relaxingData)
        })

        axios.get(`${serverConfig.ip}/getAllSong`).then(res => {
            MainStore.setUpPlayer(res.data)

        })
        setAppReady(true)
    }, [])



    return (
        <View style={{ backgroundColor: '#27004B', flex: 1 }}>
            {appReady ?
                <ScrollView>
                    <SafeAreaView>
                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                            <View>
                                <Image source={{ uri: MainStore.profilPicture }} style={{ width: 70, height: 70, borderRadius: 25 }} />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>Good Morning,</Text>
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ color: '#BD88FF', fontSize: 22, fontWeight: '700' }}>{capitalizeFirstLetter(MainStore.name)}</Text>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                    <View >
                        <FlatList showsHorizontalScrollIndicator={false} data={trendingData} horizontal renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => navigation.navigate('AlbumDetail', { albumName: item.albumName, albumImage: item.albumImage })}>
                                <View style={{ marginHorizontal: 10 }}>
                                    <View>
                                        <Image source={{ uri: item.albumImage }} style={{ width: width / 2, height: 200, borderRadius: 20 }} />
                                    </View>
                                    <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                                        <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>{item.albumName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        } />

                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <View style={{ marginLeft: 10, marginBottom: 15 }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>Relaxing Playlist</Text>
                        </View>
                        <View>
                            <FlatList showsHorizontalScrollIndicator={false} data={relaxingData} horizontal renderItem={({ item }) =>

                                <TouchableOpacity onPress={() => navigation.navigate('AlbumDetail', { albumName: item.albumName, albumImage: item.albumImage })}>
                                    <View style={{ backgroundColor: '#3E0077', marginHorizontal: 10, borderWidth: 0.4, borderColor: '#BD88FF', flexDirection: 'row', width: width / 2, borderRadius: 13 }}>
                                        <View style={{ padding: 5 }}>
                                            <Image source={{ uri: item.albumImage }} style={{ width: 60, height: 60, borderRadius: 20 }} />
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>{item.albumName}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            } />

                        </View>

                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ marginLeft: 10, marginBottom: 15 }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>Today</Text>
                        </View>
                        <View>
                            <FlatList showsHorizontalScrollIndicator={false} data={moodData} horizontal renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => navigation.navigate('AlbumDetail', { albumName: item.albumName, albumImage: item.albumImage })}>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <View>
                                            <Image source={{ uri: item.albumImage }} style={{ width: width / 2, height: 200, borderRadius: 20 }} />
                                        </View>
                                        <View style={{ position: 'absolute', top: 10, alignSelf: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>{item.albumName}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            } />
                        </View>

                    </View>
                </ScrollView>
                :
                <></>
            }
            <PlayerSheet navigation={navigation} />
        </View>
    )
}

export default observer(Home)