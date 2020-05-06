import { api } from "./index";

export const signUp = (credentials) => {
  return api.post(`auth/sign-up`, {...credentials});
};

export const signIn = (credentials) => {
  return api.post('auth/sign-in', {...credentials});
};