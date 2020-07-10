import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { COLOR_ORANGE } from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const pickedLocation = props.navigation.getParam('chosenLocation');

  const { onLocationPicked} = props

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      onLocationPicked(pickedLocation)
    }
  }, [pickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Grant Location permission to use this App in order to continue',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const isPermitted = await verifyPermissions();
    if (!isPermitted) {
      return;
    }
    setIsFetching(true);
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 6000,
        enableHighAccuracy: true,
      });
      setIsFetching(false);
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (error) {
      setIsFetching(false);
      Alert.alert('Fail to fetch location', error, [{ text: 'OK' }]);
    }
  };

  const choseOnMapHandler = () => {
    props.navigation.navigate('map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={choseOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={COLOR_ORANGE} />
        ) : (
          <Text>No location chosen</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Use My Location"
          color={COLOR_ORANGE}
          onPress={getLocationHandler}
        />
        <Button
          title="Chose on map"
          color={COLOR_ORANGE}
          onPress={choseOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default LocationPicker;

//
