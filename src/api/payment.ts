import { CreateAddress } from '../components/SelectAdress/SelectAddress';
import axiosInstance from '../services/axios';

export const getAllAddress = async (userId: string) => {
  try {
    const { data: response } = await axiosInstance.get(`/addresses/${userId}`);
    return response;
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
};

export const getDetailAddress = async (addressId: string) => {
  try {
    const { data: response } = await axiosInstance.get(`/addresses/details/${addressId}`);
    return response;
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
};

export const createAddress = async (param: CreateAddress) => {
  try {
    const { data: response } = await axiosInstance.post(`/addresses`, { ...param });
    return response;
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
};
