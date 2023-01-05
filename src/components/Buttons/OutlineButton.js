import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')

const OutlineButton = (props) => {
    return (
        <TouchableOpacity onPress={props.clickEvent} style={{ width: width - 50, padding: 10, borderWidth: 1.5, borderColor: '#BD88FF', borderRadius: 10, marginTop: 20 }}>
            <Text style={{ color: 'white', alignSelf: 'center', fontWeight: '600', fontSize: 18 }}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default OutlineButton