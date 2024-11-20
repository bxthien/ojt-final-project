import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://267c-103-216-74-18.ngrok-free.app',
  timeout: 5000,
});

export default apiClient;
