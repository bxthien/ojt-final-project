import axiosInstance from '../services/axios';

//đúng
export const getCartItems = async (transactionId: string) => {
  const response = await axiosInstance.get(`/cart/items/${transactionId}`);
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
export const removeFromCart = async (productId: string) => {
  const response = await axiosInstance.delete(`/cart/product/${productId}`);
  return response.data;
};

export const plusQuantityCartProduct = async (id: string) => {
  const response = await axiosInstance.patch(`/cart/${id}/plus-quantity`);
  return response.data;
};

export const minusQuantityCartProduct = async (id: string) => {
  const response = await axiosInstance.patch(`/cart/${id}/minus-quantity`);
  return response.data;
};
