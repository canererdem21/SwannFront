import { View, Text, SafeAreaView, TextInput, Dimensions, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import PlayerSheet from '../../components/Player/PlayerSheet'
import axios from 'axios'
import serverConfig from '../../config/serverConfig'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MainStore from '../../store/MainStore'


const { width, height } = Dimensions.get('window')

const Search = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [songData, setSongData] = useState([])
    const [selected, setSelected] = useState(MainStore.songIndex)
    return (
        <View style={{ flex: 1, backgroundColor: '#27004B' }}>
            <SafeAreaView style={{ marginBottom: 30 }}>
                <View style={{ alignItems: 'center' }}>
                    <TextInput value={search} onChangeText={(text) => {
                        axios.get(`${serverConfig.ip}/searchSong/${text}`).then(res => {
                            setSongData(res.data)
                        })
                        setSearch(text)
                    }} style={{ backgroundColor: '#3E0077', color: 'white', width: width - 40, padding: 8, paddingLeft: 10, borderRadius: 9 }} placeholderTextColor='rgba(255,255,255,0.5)' placeholder='Birşeyler Yazın...' />
                </View>
            </SafeAreaView>
            <View>
                <View>
                    {songData.map((element, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            MainStore.changeTrack(element.id)
                            setSelected(element.id)
                        }}>

                            <View style={{ flexDirection: 'row', marginVertical: 10, width: width - 40, alignSelf: 'center' }}>
                                <View>
                                    <Image source={{ uri: `https://ipfs.io/ipfs/${element.imageCID}/${element.imageName}` }} style={{ width: 50, height: 50, borderRadius: 10 }} />
                                </View>
                                <View style={{ alignSelf: 'center', marginLeft: 10 }}>
                                    <Text style={{ color: element.id == selected ? '#BD88FF' : 'white', fontSize: 15, fontWeight: '600' }}>{element.musicName}</Text>
                                    <Text style={{ color: 'gray', fontSize: 12, fontWeight: '600' }}>{element.category}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                    ))}
                </View>

            </View>
            <PlayerSheet navigation={navigation} />
        </View>
    )
}

export default Search