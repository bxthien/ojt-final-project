import { ACCESS_TOKEN, REFRESH_TOKEN } from './auth';
import { setStorageData } from '../services/storage';
import axiosInstance from '../services/axios';

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
}

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

export const signin = async (params: SignInPayload): Promise<SignInResponse> => {
  try {
    const { data: response } = await axiosInstance.post<SignInResponse>(`/auth/login`, params);
    if (response.access_token) {
      setStorageData(ACCESS_TOKEN, response.access_token);
      setStorageData(REFRESH_TOKEN, response.refresh_token);
    }
    return response;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
};

export const register = async (params: RegisterPayload) => {
  try {
    const { data: response } = await axiosInstance.post(`/auth/register`, params);
    return response;
  } catch (err) {
    console.error('Registration error:', err);
    throw err;
  }
};

export const forgot = async (params: ForgotPayload) => {
  try {
    const { data: response } = await axiosInstance.post(`/auth/forgotPassword`, params);
    return response;
  } catch (err) {
    console.error('Forgot password error:', err);
    throw err;
  }
};

export const getProfile = async (): Promise<{
  description: string;
  phone: string;
  address: string;
  fullName: string;
  email: string;
  username: string;
  avatar: string;
}> => {
  try {
    const { data: response } = await axiosInstance.get(`/user/profile`);
    return response;
  } catch (err) {
    console.error('Error fetching profile:', err);
    throw { message: 'Failed to fetch profile', details: err };
  }
};

export const updateProfile = async (params: {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  description: string;
}) => {
  try {
    const { data: response } = await axiosInstance.put(`/user/edit-profile`, params);
    return response;
  } catch (err) {
    console.error('Error updating profile:', err);
    throw { message: 'Failed to update profile', details: err };
  }
};

export const changePassword = async (params: { oldPassword: string; newPassword: string }) => {
  try {
    const { data: response } = await axiosInstance.patch(`/user/changePassword`, params);
    return response;
  } catch (err) {
    console.error('Error changing password:', err);
    throw { message: 'Failed to change password', details: err };
  }
};
