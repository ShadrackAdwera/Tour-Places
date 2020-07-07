import React, {useState} from 'react';
import { View, Text, Button, Image,StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { COLOR_ORANGE } from '../constants/Colors';

const ImagePickerComponent = (props) => {

    const[chosenImage, setChosenImage] = useState()

    const verifyPermissions = async () => {
       const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
       if(result.status!=='granted') {
           Alert.alert('Permission Denied','Grant Camera permission to use this App in order to continue',[{text:'OK'}])
           return false
       }
       return true
    }

  const takeImageHandler = async() => {
      const isPermitted = await verifyPermissions()
      if(!isPermitted) {
          return
      }
      const image = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [16,9],
          quality: 0.2
      })
      setChosenImage(image.uri)
      props.onImageTaken(image.uri)
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!chosenImage? <Text>No image chosen</Text> :
        <Image style={styles.image} source={{uri: chosenImage}}/>}
      </View>
      <Button
        title="Chose Image"
        color={COLOR_ORANGE}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
      alignItems:'center',
      marginBottom:15
  },
  imagePreview: {
      width:'100%',
      height: 200,
      marginBottom:10,
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#ccc',
      borderWidth:1
  },
  image: {
      width: '100%',
      height: '100%'
  }
});

export default ImagePickerComponent;
