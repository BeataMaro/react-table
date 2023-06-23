import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApi } from '../models/api.model';
import { IUser } from '../models/user.model';
import { IPhoto } from '../models/photo.model';

export const photoApi = createApi({
  reducerPath: 'photoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.unsplash.com/' }),
  endpoints: (builder) => ({
    getPhotoByKeyword: builder.query<IApi, string>({
      query: (keyword) =>
        `search/photos?query=${keyword}&orientation=landscape&per_page=4&client_id=${
          import.meta.env.VITE_ACCESS_KEY
        }`,
    }),
    // getRandomPhotos: builder.query({
    //   query: () =>
    //     `photos/random?count=30&page=20&orientation=landscape&client_id=${import.meta.env.VITE_ACCESS_KEY}`,
    // }),
    getUserByUsername: builder.query<IUser, string>({
      query: (keyword) => `users/${keyword}/?client_id=${import.meta.env.VITE_ACCESS_KEY}`,
    }),
  }),
});

export const { useGetPhotoByKeywordQuery, useGetUserByUsernameQuery } = photoApi;
