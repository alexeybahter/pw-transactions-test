import { api } from "./index";

export const userById = (id) => {
  return api.get(`users/${id}`, );
};

export const getUserNames = () => {
  return api.get(`users`);
};