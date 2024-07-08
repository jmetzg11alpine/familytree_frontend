import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import healthReducer from './healthReducer';
import logisticsReducer from './logisticsReducer';

const rootReducer = combineReducers({
  profileReducer,
  healthReducer,
  logisticsReducer,
});

export default rootReducer;
