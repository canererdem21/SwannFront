import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import TitleHeader from '../../components/Header/TitleHeader'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoBackHeader from '../../components/Header/GoBackHeader'
import Slider from '@react-native-community/slider'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'
import songData from '../../data/songData'
import MainStore from '../../store/MainStore'
import { observer } from 'mobx-react'

const { width, height } = Dimensions.get('window')


const Player = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current
    const [sondIndex, setSondIndex] = useState(MainStore.songIndex)
    const playBackState = usePlaybackState()
    const songSlider = useRef(null)
    const progress = useProgress()


    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.next !== null) {
            const track = await TrackPlayer.getTrack(event.nextTrack)
            MainStore.changeArtworkTitle(track.title,track.artwork)
        }
    })
  
    useEffect(() => {
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width)
            MainStore.skipTo(index)
            MainStore.changeSongIndex(index)
        })
    }, [])

    const skipToNext = async () => {
        songSlider.current.scrollToOffset({
            offset: (sondIndex + 1) * width,
        })
    }
    const skipToPrev = async () => {
        songSlider.current.scrollToOffset({
            offset: (sondIndex - 1) * width,
        })
    }

    const renderSongs = ({ item, index }) => {
        return (
            <Animated.View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Image source={{ uri: MainStore.musicImage }} style={{ width: 250, height: 250, borderRadius: 30 }} />
                </View>
            </Animated.View>

        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#27004B' }}>
            <SafeAreaView>
                <GoBackHeader navigation={navigation} />
            </SafeAreaView>

            <View>
                <Animated.FlatList
                    renderItem={renderSongs}
                    data={songData}
                    keyExtractor={item => item.id}
                    horizontal
                    ref={songSlider}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { x: scrollX },
                                }
                            }
                        ],
                        { useNativeDriver: true },
                    )}
                />
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ color: 'white', fontSize: 21, fontWeight: '700' }}>{MainStore.musicTitle}</Text>
            </View>




            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <View>
                    <Slider
                        minimumValue={0}
                        maximumValue={progress.duration}
                        value={progress.position}
                        minimumTrackTintColor='#BD88FF'
                        style={{ width: 300 }}
                        thumbTintColor={'#BD88FF'}
                        onSlidingComplete={async value => {
                            await TrackPlayer.seekTo(value)
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', width: 290, justifyContent: 'space-between', marginTop: 3 }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>{new Date(progress.position * 1000).toLocaleTimeString('en').substring(3).substring(5, progress.position.length - 1)}</Text>
                    <Text style={{ color: 'white', fontWeight: '700' }}>{new Date((progress.duration - progress.position) * 1000).toLocaleTimeString('en').substring(3).substring(5, progress.position.length - 1)}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between', width: 300, marginTop: 35 }}>
                <TouchableOpacity onPress={skipToPrev}>
                    <Ionicons name='play-skip-back-outline' size={35} color='#BD88FF' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => MainStore.togglePlay(playBackState)}>
                    <Ionicons name={playBackState !== State.Playing ? 'ios-play-circle' : 'ios-pause-circle'} size={75} color='#BD88FF' />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext}>
                    <Ionicons name='play-skip-forward-outline' size={35} color='#BD88FF' />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default observer(Player)