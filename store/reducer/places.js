import Place from '../../models/Place';
import { ADDPLACE, FETCHPLACES } from '../actions/places';

const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    case FETCHPLACES:
        return {
            ...state,
            places: action.places.map(pl=>new Place(pl.id.toString(), pl.title, pl.image))
        }
    default:
      return state;
  }
};

export default reducer;
