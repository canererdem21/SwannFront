import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import TitleHeader from '../../components/Header/TitleHeader'
import PurpleButton from '../../components/Buttons/PurpleButton'

const { width, height } = Dimensions.get('window')

const SelectMood = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#27004B' }}>
            <TitleHeader />
            <View style={{ flex: 1 }}>
                <View style={{ marginLeft: 20, marginVertical: 20 }}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 23, fontWeight: '700' }}>Hi <Text style={{ color: '#BD88FF' }}>Caner</Text>,</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontSize: 23, fontWeight: '700' }}>what's your mood ?</Text>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoryAlbum', { category: 'happy' })}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, borderColor: '#BD88FF', width: width / 3, height: 100 }}>
                                <View>
                                    <Text style={{ fontSize: 35 }}>😊</Text>

                                </View>
                                <View>
                                    <Text style={{ color: '#BD88FF', fontSize: 23, fontWeight: '700' }}>Happy</Text>

                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate('CategoryAlbum', { category: 'angry' })}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, borderColor: '#BD88FF', width: width / 3, height: 100 }}>
                                <View>
                                    <Text style={{ fontSize: 35 }}>😡</Text>

                                </View>
                                <View>
                                    <Text style={{ color: '#BD88FF', fontSize: 23, fontWeight: '700' }}>Angry</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoryAlbum', { category: 'focused' })}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, borderColor: '#BD88FF', width: width / 3, height: 100 }}>
                                <View>
                                    <Text style={{ fontSize: 35 }}>🧑‍💻</Text>

                                </View>
                                <View>
                                    <Text style={{ color: '#BD88FF', fontSize: 23, fontWeight: '700' }}>Focused</Text>

                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('CategoryAlbum', { category: 'sleepy' })}>

                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, borderColor: '#BD88FF', width: width / 3, height: 100 }}>
                                <View>
                                    <Text style={{ fontSize: 35 }}>😴</Text>

                                </View>
                                <View>
                                    <Text style={{ color: '#BD88FF', fontSize: 23, fontWeight: '700' }}>Sleepy</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoryAlbum', { category: 'sad-mix' })}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, borderColor: '#BD88FF', width: width / 3, height: 100 }}>
                                <View>
                                    <Text style={{ fontSize: 35 }}>🥺</Text>

                                </View>
                                <View>
                                    <Text style={{ color: '#BD88FF', fontSize: 23, fontWeight: '700' }}>Sad</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoryAlbum', { category: 'tired' })}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderRadius: 10, borderColor: '#BD88FF', width: width / 3, height: 100 }}>
                                <View>
                                    <Text style={{ fontSize: 35 }}>😶</Text>

                                </View>
                                <View>
                                    <Text style={{ color: '#BD88FF', fontSize: 23, fontWeight: '700' }}>Tired</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default SelectMood