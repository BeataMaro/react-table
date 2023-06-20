// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { IApi } from 'models/apimodel';

// export const photoApi = createApi({
//   reducerPath: 'photoApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://api.unsplash.com/' }),
//   endpoints: (builder) => ({
//     getPhotoByKeyword: builder.query<IApi, string>({
//       query: (keyword) =>
//         `search/photos?query=${keyword}&orientation=landscape&per_page=12&client_id=${
//           import.meta.env.VITE_ACCESS_KEY
//         }`,
//     }),
//   }),
// });

// export const { useGetPhotoByKeywordQuery } = photoApi;
