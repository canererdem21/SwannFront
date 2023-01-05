import { View, Text, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import serverConfig from '../../config/serverConfig'
import songData from '../../data/songData'
import PlayerSheet from '../../components/Player/PlayerSheet'
import { observer } from 'mobx-react'
import MainStore from '../../store/MainStore'

const CategoryAlbum = ({ navigation, route }) => {

    const [appReady, setAppReady] = useState(false)
    const [albumData, setAlbumData] = useState(null)
    const [selected, setSelected] = useState(MainStore.songIndex)
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        axios.get(`${serverConfig.ip}/getAlbumCategory/${route.params.category}`).then(res => {
            setAlbumData(res.data)
            setAppReady(true)

        })
    }, [])
    return (
        <View style={{ backgroundColor: '#27004B', flex: 1 }}>
            {
                appReady ?

                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView>

                            <View>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Feather name='chevron-left' size={24} color='gray' />

                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <View>
                                    <Image source={{ uri: `https://img.freepik.com/free-photo/gradient-collage-metaverse-concept_23-2149391493.jpg?w=2000&t=st=1670123983~exp=1670124583~hmac=cfa195670f1808ba99b165d5547e43b552227d47a94ed05a844cf034899bf2da` }} style={{ width: 250, height: 250, borderRadius: 30 }} />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>{capitalizeFirstLetter(route.params.category)}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                {albumData.map((item, index) =>
                                    <TouchableOpacity key={index} onPress={() => {
                                        MainStore.changeTrack(item.id)
                                        setSelected(item.id)
                                    }}>
                                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                            <View style={{ borderWidth: 1, margin: 10, borderColor: '#BD88FF', backgroundColor: '#BD88FF', borderRadius: 50, padding: 5, alignItems: 'center' }}>
                                                <Feather name='play' size={20} color='white' />
                                            </View>
                                            <View style={{ alignSelf: 'center' }}>
                                                <Text style={{ color: item.id == selected ? '#BD88FF' : 'white', fontSize: 17, fontWeight: '600' }}>{item.musicName}</Text>
                                            </View>
                                            <View style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
                                                <Feather name='heart' color='gray' size={20} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}

                            </View>
                        </ScrollView>

                    </SafeAreaView>
                    :
                    <></>

            }

        </View>
    )
}

export default observer(CategoryAlbum)