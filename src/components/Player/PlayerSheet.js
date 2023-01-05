import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'
import MainStore from '../../store/MainStore'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('window')

const PlayerSheet = (props) => {
    const playBackState = usePlaybackState()

    return (
        !MainStore.musicTitle ?
        <></>
        :
        <View style={{ width: width - 60, backgroundColor: '#441273', position: 'absolute', alignSelf: 'center', bottom: 20, height: 55, padding: 10, borderRadius: 9, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Player')}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={{ uri: MainStore.musicImage }} style={{ width: 40, height: 40 }} />
                    </View>
                    <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                        <Text style={{ color: '#BD88FF', fontSize: 15, fontWeight: '800' }}>{MainStore.musicTitle}</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => MainStore.togglePlay(playBackState)}>
                            <Ionicons name={playBackState !== State.Playing ? 'ios-play-circle' : 'ios-pause-circle'} size={25} color='#BD88FF' />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity >
        </View>



    )
}

export default observer(PlayerSheet)