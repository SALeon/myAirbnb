import thunk from 'redux-thunk';
import {
  createStore, applyMiddleware, compose, combineReducers
} from 'redux';

import { reducer as formReducer } from 'redux-form';
import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import { authReducer } from './auth-reducer';
import { rentalMapReducer } from './map-reducer';
import { userBookingsReducer } from './booking-reducer';

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    auth: authReducer,
    userBookings: userBookingsReducer,
    map: rentalMapReducer,
    form: formReducer,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
};
