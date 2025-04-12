import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';  // Corrected the method name to `setupListeners`
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import moviesReducer from './features/movies/moviesSlice';  
const store = configureStore({
  reducer: {
    auth: authReducer,  // Add your auth slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer, 
    movies: moviesReducer,  // Add your movies slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),  // Correct middleware concatenation
  devTools: true,  // Enable Redux DevTools
});

// Setup listeners for caching and re-fetching
setupListeners(store.dispatch);

export default store;
