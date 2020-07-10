import React, { useState, useEffect, useCallback } from 'react';
import { Platform,StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButtons';

const Map = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation')
  const readonly = props.navigation.getParam('readonly')
  
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation? initialLocation.lat : -1.3030363,
    longitude: initialLocation? initialLocation.lng : 36.7771851,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocationHandler = (event) => {
    if(readonly) {
      return
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = useCallback (() => {
      if(!selectedLocation) {
          Alert.alert('Yo!','Chose a valid location', [{text:'OK'}])
          return
      }
    props.navigation.navigate('newPlace',{chosenLocation: selectedLocation})
  }, [selectedLocation])

  useEffect(()=>{
    props.navigation.setParams({
        saveLocation: savePickedLocationHandler
    })
}, [savePickedLocationHandler])

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectedLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Chosen Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

Map.navigationOptions = (navData) => {
    const saveFunction = navData.navigation.getParam('saveLocation')
    const readonly = navData.navigation.getParam('readonly')
    if(readonly) {
      return {
        headerTitle: 'Pinned Location'
      }
    }
  return {
    headerTitle: 'Map Preview',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save Location"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={saveFunction}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
