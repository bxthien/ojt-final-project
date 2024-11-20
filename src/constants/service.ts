import axios from 'axios';

const API_URL = 'https://267c-103-216-74-18.ngrok-free.app';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      fullName?: string;
      role?: string;
    };
  };
}

export class AuthService {
  async signIn(credentials: SignInPayload): Promise<SignInResponse> {
    try {
      const response = await axios.post<SignInResponse>(`${API_URL}/auth/login`, credentials);

      if (response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Đăng nhập thất bại',
          status: error.response?.status,
        };
      }
      throw new Error('Đã xảy ra lỗi khi đăng nhập');
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

export const authService = new AuthService();
