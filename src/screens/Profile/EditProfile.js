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



const EditProfile = ({ navigation }) => {
    const axiosConfig = {
        headers: {
            Authorization: 'Bearer ' + MainStore.token
        }
    }
    const [name, setName] = useState(MainStore.name)
    const [surName, setSurName] = useState(MainStore.surName)
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
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: '800' }}>There is a problem. Please try again later</Text>
                        </View>
                        :
                        <></>
                }

                <View style={{ marginBottom: 20 }}>
                    <CurvedInput value={name} onChangeText={text => setName(text)} secureTextEntry={false} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <CurvedInput value={surName} onChangeText={text => setSurName(text)} secureTextEntry={false} />
                </View>
                <View>
                    <PurpleButton clickEvent={() => {
                        axios.post(`${serverConfig.ip}/changeMyData`, { name, surName },axiosConfig).then(res => {
                            if (res.data.success) {
                                MainStore.changeMyData(name, surName)
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

export default observer(EditProfile)