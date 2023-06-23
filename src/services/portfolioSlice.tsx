import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '../models/photo.model';

export interface PortfolioState {
  portfolio: IPhoto[];
}

const initialState: PortfolioState = {
  portfolio: [],
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolioResults: (state, action: PayloadAction<IPhoto[]>) => {
      state.portfolio = action.payload;
    },
  },
});

export const { updatePortfolioResults } = portfolioSlice.actions;
export default portfolioSlice.reducer;