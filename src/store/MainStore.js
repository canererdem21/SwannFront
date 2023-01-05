import { observable, action, autorun, makeObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configure } from "mobx";
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'

import axios from "axios";
import songData from "../data/songData";
class MainStore {
    @observable songIndex = 0
    @observable musicTitle
    @observable musicImage
    @observable progress
    @observable token
    @observable name
    @observable surName
    @observable email
    @observable profilPicture
    @observable userData
    @observable auth = false

    @action changeProgress(data) {
        this.progress = data
    }

    @action login(token, name, surName, email, profilPicture, userData) {
        this.token = token
        this.name = name
        this.surName = surName
        this.email = email
        this.profilPicture = profilPicture
        this.userData = userData
        AsyncStorage.setItem('token', token)
        this.auth = true
    }

    @action logOut()
    {
        this.token = ''
        AsyncStorage.clear()
        this.auth = false
    }

    @action changeMyData(name, surName) {
        this.name = name
        this.surName = surName
    }

    @action updateAuth(name, surName, email, profilPicture, userData) {
        this.name = name
        this.surName = surName
        this.email = email
        this.profilPicture = profilPicture
        this.userData = userData
        this.auth = true
    }

    @action async setUpPlayer(song) {
        try {
            await TrackPlayer.setupPlayer()
            const songList = []
            song.map((item) => {
                songList.push({
                    id: item.id,
                    key: item.id,
                    title: item.musicName,
                    url: `https://ipfs.io/ipfs/${item.musicCID}/${item.musicExt}`,
                    artwork: `https://ipfs.io/ipfs/${item.imageCID}/${item.imageName}`,
                    artist: item.musicName,
                    category: item.category
                })
            })
            await TrackPlayer.add(songList)
        }
        catch (e) {
            console.log(e)
        }
    }

    @action changeSongIndex(songIndex) {
        this.songIndex = songIndex
    }

    @action async skipTo(trackId) {
        await TrackPlayer.skip(trackId)
    }
    @action changeArtworkTitle(title, artwork) {
        this.musicTitle = title
        this.musicImage = artwork
    }
    @action async changeTrack(id) {
        this.songIndex = id
        await TrackPlayer.skip(id)
        let trackObject = await TrackPlayer.getTrack(id)
        this.musicTitle = trackObject.title
        this.musicImage = trackObject.artwork
    }

    @action async togglePlay(playBackState) {
        const currentTrack = await TrackPlayer.getCurrentTrack()
        if (currentTrack != null) {
            if (playBackState == State.Playing) {
                await TrackPlayer.pause()
            }
            else {
                await TrackPlayer.play()
            }
        }
    }


    constructor() {
        configure({
            enforceActions: "never",
        })
        makeObservable(this)
        autorun(async () => {
            AsyncStorage.getItem('token').then(res => this.token = res)

        })
    }
}
export default new MainStore
