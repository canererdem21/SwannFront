import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import Route from './src/Route';
import axios from 'axios';
import serverConfig from './src/config/serverConfig';
import MainStore from './src/store/MainStore';
import { observer } from 'mobx-react';



const App = () => {
  const [appReady, setAppReady] = useState(false)
  const axiosConfig = {
    headers: {
      Authorization: 'Bearer ' + MainStore.token
    }
  }
  useEffect(() => {
    
      axios.get(`${serverConfig.ip}/getMyInfo`, axiosConfig).then(res => {
        MainStore.updateAuth(res.data.name, res.data.surName, res.data.email, res.data.profilPicture, res.data)
        setAppReady(true)
      })
  
   
  }, [])

  if (!appReady) {
    return null
  }
  return (
    <Route />
  )
}

export default observer(App)