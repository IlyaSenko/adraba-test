import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './slices/coinsSlice'

export default configureStore({
  reducer: {
    coins: coinsReducer
  },
});
