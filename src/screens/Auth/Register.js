import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CurvedInput from '../../components/Input/CurvedInput';
import PurpleButton from '../../components/Buttons/PurpleButton';
import OutlineButton from '../../components/Buttons/OutlineButton';
import TitleHeader from '../../components/Header/TitleHeader';
import { Formik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import serverConfig from '../../config/serverConfig'
const Register = ({ navigation }) => {

    const [success, setSuccess] = useState(false)
    
    return (
        <View style={{ flex: 1, backgroundColor: '#27004B' }}>
            <TitleHeader />

            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {
                    success ?
                        <View style={{ alignItems: 'center', marginBottom: 40 }}>
                            <Text style={{ color: 'green', fontWeight: '600', fontSize: 15 }}>Registration Successful</Text>
                        </View>
                        :
                        <></>
                }

                <Formik
                    initialValues={{ name: '', surName: '', email: '', password: '', }}
                    onSubmit={value => {
                        axios.post(`${serverConfig.ip}/register`, {
                            name: value.name,
                            surName: value.surName,
                            email: value.email,
                            password: value.password
                        }).then(res => {
                            setSuccess(true)
                        })
                    }}

                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('name required'),
                        surName: Yup.string().required('surname required'),
                        email: Yup.string().email('enter a valid format').required('email required'),
                        password: Yup.string().required('password required')
                    })}
                >
                    {({ values, handleSubmit, handleChange, errors }) => (
                        <View>

                            <View>
                                <CurvedInput secureText={false} value={values.name} onChangeText={handleChange('name')} placeholder='Name' />
                                <Text style={{ color: 'red', marginLeft: 5, marginTop: 10 }}>{errors.name}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CurvedInput secureText={false} value={values.surName} onChangeText={handleChange('surName')} placeholder='Surname' />
                                <Text style={{ color: 'red', marginLeft: 5, marginTop: 10 }}>{errors.surName}</Text>

                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CurvedInput secureText={false} value={values.email} onChangeText={handleChange('email')} placeholder='Mail Address' />
                                <Text style={{ color: 'red', marginLeft: 5, marginTop: 10 }}>{errors.email}</Text>

                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CurvedInput secureText={true} value={values.password} onChangeText={handleChange('password')} placeholder='Password' />
                                <Text style={{ color: 'red', marginLeft: 5, marginTop: 10 }}>{errors.password}</Text>

                            </View>

                            <View style={{ marginTop: 30 }}>
                                <PurpleButton clickEvent={() =>
                                    handleSubmit()
                                } text='Sign Up' />
                            </View>
                            <View>
                                <OutlineButton clickEvent={() => navigation.navigate('LoginScreen')} text='Sign In' />
                            </View>
                        </View>

                    )}
                </Formik>
            </View>


        </View>
    )
}

export default Register