import * as FileSystem from 'expo-file-system';
export const ADDPLACE = 'ADDPLACE';

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
        throw error
    }

    dispatch({
      type: ADDPLACE,
      placeData: {
        title: title,
        image: newPath,
      },
    });
  };
};
