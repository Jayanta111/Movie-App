import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';  // Corrected the method name to `setupListeners`
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add your auth slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,  // Add API slice reducer if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),  // Correct middleware concatenation
  devTools: true,  // Enable Redux DevTools
});

// Setup listeners for caching and re-fetching
setupListeners(store.dispatch);

export default store;
