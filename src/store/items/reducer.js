import {
  CREATE_ITEM,
  DELETE_ITEM
} from './actionNames';

const getInitialStore = () => ({
  items: [
    {
      name: "Test Name 1",
      action: "action",
      description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    },{
      name: "Test Name 2",
      action: "action",
      description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    },{
      name: "Test Name 3",
      action: "action",
      description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    },{
      name: "Test Name 4",
      action: "action",
      description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    },
  ]
});

export default (store = getInitialStore(), { type, data } = {}) => {
  switch (type) {
    case CREATE_ITEM:
      return {
        items: [...store.items, data]
        };

    case DELETE_ITEM:
      store.items.splice(data, 1);

      return {
        items: [...store.items]
      };

    default:
      return store;
  }
};
