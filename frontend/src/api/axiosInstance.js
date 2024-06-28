// api/axiosaxios.js

import axios from 'axios';
import { axiosErrorHandler } from '../utils/axiosErrorHandler';

const instance = axios.create({
  baseURL: "https://e87d-2401-4900-7b72-1de0-40a1-c09c-d999-9a9c.ngrok-free.app",
  timeout: 10000,
});

// Optional: Add request interceptors
instance.interceptors.request.use(
  (config) => {
    // Modify config or add headers before request is sent
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
instance.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    //error handling
    axiosErrorHandler(error);
    return Promise.reject(error);
  }
);

export default instance;
