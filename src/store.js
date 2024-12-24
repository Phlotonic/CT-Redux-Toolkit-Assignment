// store.js
import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from './slices/exercisesSlice';

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
  },
});
