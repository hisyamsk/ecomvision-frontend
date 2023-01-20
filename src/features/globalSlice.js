import { createSlice } from '@reduxjs/toolkit';
import { LIGHT_THEME, DARK_THEME } from 'constants';

export const initialState = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e',
};

export const globalSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
