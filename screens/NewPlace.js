import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as actions from '../store/actions/places'
import { COLOR_GREEN } from '../constants/Colors';

const NewPlace = (props) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    dispatch(actions.addPlace(title))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <Button title="Save Place" color={COLOR_GREEN} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlace.navigationOptions = {
  headerTitle: 'Add a Place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlace;
