import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
export const ADDPLACE = 'ADDPLACE';
export const FETCHPLACES = 'FETCHPLACES'

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        '20th Floor One Africa Place, Waiyaki Way, Nairobi',
        -1.2652386,
        36.8021517
      );
      dispatch({
        type: ADDPLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loadPlaces = () => {
    return async dispatch => {

        try {
            const fetchedPlaces = await fetchPlaces()
            console.log(fetchedPlaces)
            dispatch({type: FETCHPLACES, places: fetchedPlaces.rows._array})   
        } catch (error) {
            throw error
        }
    }
}
