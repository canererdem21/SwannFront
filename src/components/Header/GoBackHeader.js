import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
const GoBackHeader = (props) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                <View style={{ position: 'absolute', left: 10 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Feather name='x' color={'white'} size={25} />

                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 28, fontWeight: '900' }}>swann</Text>
                </View>
            </View>
        </>
    )
}

export default GoBackHeader