import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import healthReducer from './healthReducer';

const rootReducer = combineReducers({
  profileReducer,
  healthReducer,
});

export default rootReducer;
