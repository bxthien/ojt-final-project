import axiosInstance from '../services/axios';

export interface Category {
  id: string;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>('/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategory = async (id: string): Promise<Category> => {
  try {
    const response = await axiosInstance.get<Category>(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};
