import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../../constants/auth';
import { getStorageData } from '../../services/storage';

export interface AuthState {
  isAuth: boolean;
  username: string;
  url: string;
}

const checkAuth = (): boolean => Boolean(getStorageData(ACCESS_TOKEN));

const initialState: AuthState = {
  isAuth: checkAuth(),
  username: '',
  url: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.username = '';
      state.url = '';
    },
    updateProfile: (state, action) => {
      if (state.isAuth && (action.payload?.username || action.payload?.url)) {
        state.username = action.payload.username || state.username;
        state.url = action.payload.url || state.url;
      } else {
        console.warn(
          'Invalid payload for updateProfile or user not authenticated:',
          action.payload
        );
      }
    },
  },
});

const { reducer, actions } = authSlice;

export const { login, logout, updateProfile } = actions;

export default reducer;
