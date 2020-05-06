import { api } from "./index";

export const getTransactions = (params={page: 1, perPage: 5}) => {
  return api.get(`transactions?page=${params.page}&per_page=${params.perPage}`);
};

export const createTransaction = (data) => {
  return api.post(`transactions`, {  ...data });
};
