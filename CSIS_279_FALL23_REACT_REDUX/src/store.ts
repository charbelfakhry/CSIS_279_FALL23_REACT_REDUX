import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/store/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { apiSlice } from './redux/services/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // rtk query requests
    auth: authReducer,
  },
  // to enable caching and invalidating features of RTK query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

// creating typed versions of useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;