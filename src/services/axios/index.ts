import axios, { InternalAxiosRequestConfig } from 'axios';
import { getStorageData } from '../storage';
import { ACCESS_TOKEN } from '../../constants/auth';

// const BASE_URL = 'https://be-final-project-bddr.onrender.com/';
const BASE_URL = 'https://fd8f-113-160-225-96.ngrok-free.app';
axios.defaults.baseURL = BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'ngrok-skip-browser-warning': 'true',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === '/auth/login') {
      return config;
    }
    const accessToken = getStorageData(ACCESS_TOKEN);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response && response.status === 401 && config.url !== '/auth/login') {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.replace('/sign-in');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
