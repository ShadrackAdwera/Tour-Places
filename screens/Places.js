import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButtons';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/actions/places'

const Places = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.image}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('placeDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Places.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('newPlace');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Places;
