import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean,
  user: User | null
}

interface User {
  id: number,
  username: string
}

interface SetAuthPayload {
  isAuthenticated: boolean,
  user: User | null
}


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  } as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
