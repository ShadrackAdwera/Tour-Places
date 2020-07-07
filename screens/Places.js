import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButtons';
import PlaceItem from '../components/PlaceItem';

const Places = (props) => {
  const places = useSelector((state) => state.places.places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.image}
          title={itemData.item.title}
          address={null}
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
