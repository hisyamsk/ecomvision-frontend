import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'features/globalSlice';
import { api } from 'features/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const initialState = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e',
};

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store);

export default store;
