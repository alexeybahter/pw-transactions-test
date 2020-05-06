import axios from 'axios';

import config from '../config';

export const api = axios.create({
  baseURL: config.serverAddress,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${accessToken}`,
    }
  }

  return config;
});
