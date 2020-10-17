import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCoins } from '../../api'

export const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    allCoins: [],
  },
  reducers: {
    setCoins: (state, action) => {
      state.allCoins.push(...action.payload.data.data);
    }
  }
});

export const { setCoins } = coinsSlice.actions;

export const fetchCoinsThunk = () => async (dispatch) => {
  const response = await fetchCoins()
  dispatch(setCoins(response));
};

export const selectCoins = state => state.coins.allCoins;

export default coinsSlice.reducer;
