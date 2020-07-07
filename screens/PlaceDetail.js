import React from 'react'
import { View, Text ,StyleSheet } from 'react-native'

const PlaceDetail = props => {
    return <View style={styles.screen}>
        <Text>Place Detail Screen</Text>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

PlaceDetail.navigationOptions = {
    headerTitle: 'Place Details'
}

export default PlaceDetail