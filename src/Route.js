import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home/Home'
import Register from './screens/Auth/Register'
import Login from './screens/Auth/Login'
import SelectMood from './screens/Home/SelectMood'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Profile from './screens/Profile/Profile'
import Music from './screens/Music/Music'
import Player from './screens/Music/Player'
import Search from './screens/Search/Search'
import { observer } from 'mobx-react'
import MainStore from './store/MainStore'
import EditProfile from './screens/Profile/EditProfile'
import AccountSettings from './screens/Profile/AccountSettings'
import CategoryAlbum from './screens/Music/CategoryAlbum'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


function HomeStack() {
    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="AlbumDetail" component={Music} />
        </Stack.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="RegisterScreen" component={Register} />
        </Stack.Navigator>
    )
}

function PorfileStack() {
    return (
        <Stack.Navigator initialRouteName='ProfileScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
        </Stack.Navigator>
    )
}

function DiscoveryStack() {
    return (
        <Stack.Navigator initialRouteName='DiscoveryScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DiscoveryScreen" component={SelectMood} />
            <Stack.Screen name="CategoryAlbum" component={CategoryAlbum} />
        </Stack.Navigator>
    )
}

const Route = () => {
    return (
        <NavigationContainer>
            {MainStore.auth ?
                <Tab.Navigator initialRouteName='Home' screenOptions={{
                    headerShown: false, tabBarStyle: {
                        backgroundColor: '#27004B',
                        borderTopColor: '#BD88FF',
                    }, tabBarShowLabel: false,
                }}>
                    <Tab.Screen name='Home' component={HomeStack} options={{
                        tabBarIcon: ({ focused }) => (<View style={{ alignItems: 'center', marginTop: 15 }}><Feather style={{ marginBottom: 5 }} name='home' color={focused ? '#BD88FF' : 'gray'} size={25} /><Text style={{ color: focused ? '#BD88FF' : 'gray', fontWeight: '700' }}>Home</Text></View>)
                    }} />
                    <Tab.Screen name='Search' component={Search} options={{
                        tabBarIcon: ({ focused }) => (<View style={{ alignItems: 'center', marginTop: 15 }}><Feather style={{ marginBottom: 5 }} name='search' color={focused ? '#BD88FF' : 'gray'} size={25} /><Text style={{ color: focused ? '#BD88FF' : 'gray', fontWeight: '700' }}>Search</Text></View>)
                    }} />
                    <Tab.Screen name='Player' component={Player} options={{
                        tabBarIcon: ({ focused }) => (<View style={{ alignItems: 'center', marginTop: 15 }}><Ionicons style={{ marginBottom: 5 }} name='ios-play' color={focused ? '#BD88FF' : 'gray'} size={25} /><Text style={{ color: focused ? '#BD88FF' : 'gray', fontWeight: '700' }}>Player</Text></View>)
                    }} />
                    <Tab.Screen name='Discovery' component={DiscoveryStack} options={{
                        tabBarIcon: ({ focused }) => (<View style={{ alignItems: 'center', marginTop: 15 }}><Feather style={{ marginBottom: 5 }} name='music' color={focused ? '#BD88FF' : 'gray'} size={25} /><Text style={{ color: focused ? '#BD88FF' : 'gray', fontWeight: '700' }}>Discovery</Text></View>)
                    }} />
                    <Tab.Screen name='Profile' component={PorfileStack} options={{
                        tabBarIcon: ({ focused }) => (<View style={{ alignItems: 'center', marginTop: 15 }}><Feather style={{ marginBottom: 5 }} name='user' color={focused ? '#BD88FF' : 'gray'} size={25} /><Text style={{ color: focused ? '#BD88FF' : 'gray', fontWeight: '700' }}>Profile</Text></View>)
                    }} />
                </Tab.Navigator>
                :
                <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Auth' component={AuthStack} />
                </Stack.Navigator>
            }

        </NavigationContainer>
    )
}

export default observer(Route)