import {
  CREATE_ITEM,
  DELETE_ITEM
} from './actionNames';

export const addItem = (data) => ({
  type: CREATE_ITEM,
  data
});

export const deleteItem = (data) => ({
  type: DELETE_ITEM,
  data
});
