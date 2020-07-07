import React, { useState } from 'react';
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

const LocationPicker = (props) => {
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

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
      });
      setIsFetching(false);
      setLocation();
    } catch (error) {
      setIsFetching(false);
      Alert.alert('Fail to fetch location', error, [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={COLOR_ORANGE} />
        ) : (
          <Text>No location chosen</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={COLOR_ORANGE}
        onPress={getLocationHandler}
      />
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
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default LocationPicker;
