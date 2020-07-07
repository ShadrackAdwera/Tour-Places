import Place from '../../models/Place';
import { ADDPLACE } from '../actions/places';

const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPLACE:
      const newPlace = new Place(
        Math.random().toString(),
        action.placeData.title
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};

export default reducer;
