import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/store/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { apiSlice } from './redux/services/apiSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

/* By default, Redux loses all states when the page is refreshed. To ensure persistence 
  of the authentication state when the page refreshes and securely detect whether the user
  is logged in or not, we used redux-persist. */


// Redux persist configurations
const authPersistConfig = {
  key: 'auth',
  storage: storageSession 
};
// persisting auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


// creating redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // rtk query requests
    auth: persistedAuthReducer, // passing persisted reducer
  },
  // to enable caching and invalidating features of RTK query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


// creating typed versions of useSelector and useDispatch to use them easily in the ts app
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// to wrap our app with the persistor in main.tsx
export const persistor = persistStore(store);

export default store;