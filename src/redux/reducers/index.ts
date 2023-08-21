import { combineReducers } from 'redux';

import mealsReducer from './meals';
import drinksReducer from './drinks';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
