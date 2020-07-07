import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PlacesNav from './navigation/navigation';
import placesReducer from './store/reducer/places';
import { init } from './helpers/db';

init()
  .then(() => console.log('Database initialising...'))
  .catch((err) => {
    console.log('Initialise DB failed');
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNav />
    </Provider>
  );
}
