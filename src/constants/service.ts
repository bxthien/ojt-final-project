import { ACCESS_TOKEN, REFRESH_TOKEN } from './auth';
import { removeStorageData, setStorageData } from '../services/storage';
import axiosInstance from '../services/axios';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const API_URL = 'https://7633-113-160-225-96.ngrok-free.app';
export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
  roles: string;
  userId: string;
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
interface UserProfile {
  description: string;
  phone: string;
  address: string;
  email: string;
  username: string;
  url: string;
}

export const useSignIn = () => {
  const dispatchAuth = useDispatch();

  const signIn = async (params: SignInPayload): Promise<SignInResponse> => {
    try {
      const { data: response } = await axiosInstance.post<SignInResponse>(`/auth/login`, params);
      console.log(response, 'acb');
      if (response.access_token) {
        setStorageData(ACCESS_TOKEN, response.access_token);
        setStorageData(REFRESH_TOKEN, response.refresh_token);
        setStorageData('userId', response.userId);
        dispatchAuth(login());
      }

      return response;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  return { signIn };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    removeStorageData(ACCESS_TOKEN);
    removeStorageData(REFRESH_TOKEN);

    dispatch(logout());

    navigate('/sign-in');
  };

  return { logOut };
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

export const getProfile = async (): Promise<UserProfile> => {
  try {
    const { data: response }: { data: UserProfile } = await axiosInstance.get(`/user/profile`);
    return response;
  } catch (err) {
    console.error('Error fetching profile:', err);
    throw { message: 'Failed to fetch profile', details: err };
  }
};

export const updateProfile = async (params: {
  username: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  url: string;
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
export interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  info: {
    description: string;
    color: string[];
    size: string[];
    policy: string;
  };
  quantity: number;
}

export interface Transaction {
  transactionId: string;
  isDelete: boolean;
  quantity: number;
  price: number;
  createdAt: string;
  updateAt: string;
  product: Product;
}

export interface Order {
  cartId: string;
  couponCode: string | null;
  discount: number;
  isDelete: boolean;
  price: number;
  status: string;
  address: string;
  createdAt: string;
  updateAt: string;
  methodShipping: string;
  transactions: Transaction[];
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data: response }: { data: Order[] } = await axiosInstance.get(`/cart/history/`);

    if (!Array.isArray(response)) {
      throw new Error('Invalid data format: expected an array of orders.');
    }
    const ordersWithTransactions = response.map((order) => ({
      ...order,
      transactions: order.transactions || [],
    }));

    return ordersWithTransactions;
  } catch (err: unknown) {
    console.error('Error fetching orders:', err);

    if (axios.isAxiosError(err)) {
      console.error('Axios error details:', err.response?.data || err.message);
    }

    throw {
      message: 'Failed to fetch orders',
      details: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};
