import axios from 'axios';
import { getStorageData } from '../storage';
import { ACCESS_TOKEN } from '../../constants/auth';

const axiosInstance = axios.create({
  baseURL: 'https://5f08-113-160-225-96.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStorageData('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.href = `/login`;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
