import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'features/globalSlice';
import { adminApi } from 'features/apiSlice';

export const initialState = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e',
};

const store = configureStore({
  reducer: {
    global: globalReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(adminApi.middleware),
});

export default store;
