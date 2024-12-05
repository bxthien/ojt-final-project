import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../../constants/auth';
import { getStorageData } from '../../services/storage';

export interface AuthState {
  isAuth: boolean;
}

const checkAuth = (): boolean => Boolean(getStorageData(ACCESS_TOKEN));

const initialState: AuthState = {
  isAuth: checkAuth(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

const { reducer, actions } = authSlice;

export const { logout, login } = actions;

export default reducer;
