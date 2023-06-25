import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { photoApi } from '../services/api.service';
import searchResultsReducer from '../services/resultsSlice';
import userReducer from '../services/userSlice';
import portfolioReducer from '../services/portfolioSlice';
import photoReducer from '../services/photoSlice';

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    photoResults: photoReducer,
    userResults: userReducer,
    portfolioResults: portfolioReducer,

    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(photoApi.middleware),
});

const rootReducer = combineReducers({
  searchResultsReducer,
  photoReducer,
  userReducer,
  portfolioReducer,
  [photoApi.reducerPath]: photoApi.reducer,
});

setupListeners(store.dispatch);
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(photoApi.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
