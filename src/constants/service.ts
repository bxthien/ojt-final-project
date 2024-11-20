import axios from 'axios';

const API_URL = 'https://37a4-2402-800-629c-6940-e536-bbbe-986d-ecdb.ngrok-free.app';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  phone?: string;
  username?: string;
}

export interface ForgotPayload {
  email: string;
}

export const signin = (params: SignInPayload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/login`, params)
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

export const register = (params: RegisterPayload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/register`, params)
      .then(({ data: response }) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const forgot = (params: ForgotPayload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/forgotPassword`, params)
      .then(({ data: response }) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
