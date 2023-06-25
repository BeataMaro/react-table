import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPhoto } from '../models/photo.model';

export interface PhotoState {
  photo: IPhoto;
}

const InitialPhotoState: IPhoto = {
  id: '',
  slug: '',
  color: '',
  urls: {
    full: '',
    regular: '',
    raw: '',
    small: '',
    thumb: '',
  },
  blur_hash: '',
  description: undefined,
  alt_description: undefined,
  user: {
    total_likes: 0,
    total_collections: 0,
    total_photos: 0,
    id: '',
    username: '',
    name: '',
    bio: '',
    location: '',
    portfolio_url: '',
    links: {
        html: '',
        likes: '',
        photos: '',
        portfolio: '',
        self: ''
    },
    first_name: '',
    profile_image: {
      small: '',
      medium: '',
      large: '',
    },
  },
  likes: 0,
  width: 0,
  height: 0,
  current_user_collections: [],
  links: {
    self: '',
    html: '',
    download: '',
    download_location: '',
  },
};

const initialState: PhotoState = {
  photo: InitialPhotoState,
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    updatePhotoResult: (state, action: PayloadAction<IPhoto>) => {
      state.photo = action.payload;
    },
  },
});

export const { updatePhotoResult } = photoSlice.actions;
export default photoSlice.reducer;
