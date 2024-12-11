import axiosInstance from '../services/axios';

export const getAllCategory = async () => {
  try {
    const { data: response } = await axiosInstance.get(`/category`);
    return response;
  } catch (err) {
    console.error('Registration error:', err);
    throw err;
  }
};
