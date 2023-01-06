import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import PlayerSheet from '../../components/Player/PlayerSheet'
import MainStore from '../../store/MainStore'
import { observer } from 'mobx-react'

const Profile = ({ navigation }) => {
  

    return (
        <View style={{ backgroundColor: '#27004B', flex: 1 }}>
            <SafeAreaView />
            <View style={{ alignItems: 'center' }}>
                <View>
                    <Image source={{ uri: MainStore.profilPicture }} style={{ width: 160, height: 160, borderRadius: 30 }} />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: '#BD88FF', fontSize: 30, fontWeight: '800' }}>{MainStore.name}</Text>
                </View>
            </View>

            <View style={{ marginTop: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Follower</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 2 }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{MainStore.userData.follower.length}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Follow</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 2 }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{MainStore.userData.follow.length}</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{ marginTop: 35 }}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderWidth: 1, margin: 10, borderColor: '#BD88FF', backgroundColor: '#3E0077', borderRadius: 50, padding: 10 }}>
                            <Feather name='edit' size={20} color='white' />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Edit my profile</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
                            <Feather name='chevron-right' color='white' size={25} />
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ borderWidth: 1, margin: 10, borderColor: '#BD88FF', backgroundColor: '#3E0077', borderRadius: 50, padding: 10 }}>
                            <Feather name='settings' size={20} color='white' />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Account settings</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
                            <Feather name='chevron-right' color='white' size={25} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => MainStore.logOut()}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ borderWidth: 1, margin: 10, borderColor: '#BD88FF', backgroundColor: '#3E0077', borderRadius: 50, padding: 10 }}>
                            <Feather name='log-out' size={20} color='white' />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Log-out</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
                            <Feather name='chevron-right' color='white' size={25} />
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

            <View>
                <TouchableOpacity onPress={() => Alert.alert('Swann App', 'Sonraki güncellemede eklenecek')}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 40 }}>

                        <View style={{ marginHorizontal: 10 }}>
                            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png' }} style={{ width: 40, height: 40 }} />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Connect Wallet With MetaMask</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: 5, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>Version 1.0.0</Text>
                </View>
            </View>
            <PlayerSheet navigation={navigation} />
        </View>
    )
}

export default observer(Profile)