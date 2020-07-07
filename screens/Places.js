import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButtons';

const Places = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Places Screen</Text>
    </View>
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
          onPress={()=>{navData.navigation.navigate('newPlace')}}
        />
      </HeaderButtons>
    ),
  };
};

export default Places;
