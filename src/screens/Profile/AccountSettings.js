import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleHeader from '../../components/Header/TitleHeader'
import CurvedInput from '../../components/Input/CurvedInput'
import MainStore from '../../store/MainStore'
import PurpleButton from '../../components/Buttons/PurpleButton'
import GoBackHeader from '../../components/Header/GoBackHeader'
import axios from 'axios'
import serverConfig from '../../config/serverConfig'
import { observer } from 'mobx-react-lite'



const AccountSettings = ({ navigation }) => {
    const axiosConfig = {
        headers: {
            Authorization: 'Bearer ' + MainStore.token
        }
    }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#27004B' }}>
            <View>
                <GoBackHeader navigation={navigation} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    error
                        ?
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: '800' }}>Your old password is incorrect</Text>
                        </View>
                        :
                        <></>
                }

                <View style={{ marginBottom: 20 }}>
                    <CurvedInput value={oldPassword} onChangeText={text => setOldPassword(text)} placeholder='Old Password...' secureTextEntry={false} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <CurvedInput value={newPassword} onChangeText={text => setNewPassword(text)} placeholder='New Password...' secureTextEntry={false} />
                </View>
                <View>
                    <PurpleButton clickEvent={() => {
                        axios.post(`${serverConfig.ip}/changeMyPassword`, { oldPassword, newPassword }, axiosConfig).then(res => {
                            if (res.data.success) {
                                navigation.goBack()
                            }
                            else {
                                setError(true)
                            }
                        })
                    }} text='Save' />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default observer(AccountSettings)