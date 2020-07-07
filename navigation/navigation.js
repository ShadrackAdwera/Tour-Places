import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'
import PlacesScreen from '../screens/Places'
import PlaceDetailScreen from '../screens/PlaceDetail'
import NewPlaceScreen from '../screens/NewPlace'
import MapScreen from '../screens/Map'
import { COLOR_GREEN } from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
    places: PlacesScreen,
    placeDetail: PlaceDetailScreen,
    newPlace: NewPlaceScreen,
    map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS==='android'? COLOR_GREEN : ''
        },
        headerTintColor: Platform.OS==='android'? 'white' : COLOR_GREEN
    }
})

export default createAppContainer(PlacesNavigator)