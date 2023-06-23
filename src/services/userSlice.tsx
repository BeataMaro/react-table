import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/user.model';

export interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {
    bio: '',
    first_name: '',
    id: '',
    instagram_username: '',
    last_name: '',
    links: {
      html: '',
      likes: '',
      photos: '',
      portfolio: '',
      self: '',
    },
    location: '',
    name: '',
    portfolio_url: '',
    total_collections: 0,
    total_likes: 0,
    total_photos: 0,
    username: '',
    photos: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserResult: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUserResult } = userSlice.actions;
export default userSlice.reducer;
