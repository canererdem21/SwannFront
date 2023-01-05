import { View, Text, TextInput, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')

const CurvedInput = (props) => {
    return (
        <TextInput value={props.value} onChangeText={props.onChangeText} autoCapitalize={false} autoComplete={false} secureTextEntry={props.secureText} placeholder={props.placeholder} placeholderTextColor={'gray'} style={{ width: width - 50, color: 'white', borderWidth: 1, borderColor: '#BD88FF', fontSize: 15, alignSelf: 'center', padding: 8, borderRadius: 10, paddingLeft: 15 }} />
    )
}

export default CurvedInput