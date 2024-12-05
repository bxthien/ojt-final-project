import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://0837-113-160-225-96.ngrok-free.app',
  headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
});

//đúng
export const getCartItems = async (transactionId: string) => {
  const response = await axiosInstance.get(`/cart/${transactionId}`);
  return response.data;
};

//đúng
export const addToCart = async (
  transactionId: string,
  product: { productId: number; quantity: number }
) => {
  const response = await axiosInstance.post(`/cart`, { transactionId, ...product });
  return response.data;
};

//đúng
export const removeFromCart = async (productId: number) => {
  const response = await axiosInstance.delete(`/cart/product/${productId}`);
  return response.data;
};
