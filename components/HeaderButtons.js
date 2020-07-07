import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import {Platform } from 'react-native'
import { COLOR_GREEN } from '../constants/Colors'

const HeaderButtonComponent = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS==='android'? 'white' : COLOR_GREEN}/>

 }

export default HeaderButtonComponent