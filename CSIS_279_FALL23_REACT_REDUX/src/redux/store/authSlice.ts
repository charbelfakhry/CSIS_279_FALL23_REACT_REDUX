import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean,
  accessToken: string,
  user: User | null
}

interface User {
  id: number,
  username: string
}

interface SetAuthPayload {
  isAuthenticated: boolean,
  accessToken: string,
  user: User | null
}


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    accessToken: ''
  } as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = '';
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
