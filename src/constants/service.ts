import axios from 'axios';

const API_URL = 'https://267c-103-216-74-18.ngrok-free.app';

export interface SignInPayload {
  email: string;
  password: string;
}

export const signin = (params: SignInPayload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/login`, params)
      .then(({ data: response }) => {
        if (response.access_token) {
          localStorage.setItem('accessToken', response.access_token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
        }
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
