import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import CurvedInput from '../../components/Input/CurvedInput';
import PurpleButton from '../../components/Buttons/PurpleButton';
import OutlineButton from '../../components/Buttons/OutlineButton';
import TitleHeader from '../../components/Header/TitleHeader';
import serverConfig from '../../config/serverConfig'
import { observer } from 'mobx-react'
import MainStore from '../../store/MainStore'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={{ flex: 1, backgroundColor: '#27004B' }}>
            <TitleHeader />
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View>
                    <CurvedInput value={email} onChangeText={text => setEmail(text)} secureText={false} placeholder='Mail Address' />
                </View>
                <View style={{ marginTop: 20 }}>
                    <CurvedInput value={password} onChangeText={text => setPassword(text)} secureText={true} placeholder='Password' />
                </View>
                <View>
                    <PurpleButton clickEvent={() => axios.post(`${serverConfig.ip}/login`, {
                        email,
                        password
                    }).then(res => {
                        MainStore.login(res.data.token, res.data.user.name,res.data.user.surName,res.data.user.email,res.data.user.profilPicture,res.data.user)
                    })} text='Sign In' />
                </View>
                <View>
                    <OutlineButton clickEvent={() => navigation.navigate('RegisterScreen')} text='Sign Up' />
                </View>
            </View>
        </View>
    )
}

export default observer(Login)