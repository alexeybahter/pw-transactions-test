import { combineReducers } from 'redux';

import globalStore from './global/reducer';
import itemStore from './items/reducer';

export default combineReducers({
  global: globalStore,
  item: itemStore,
});