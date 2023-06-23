import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { photoApi } from '../services/api.service';
// import searchKeywordReducer from '../services/searchKeywordSlice';
import searchResultsReducer from '../services/resultsSlice';
// import newUserCardReducer from '../services/newCardSlice';

export const store = configureStore({
  reducer: {
    // searchKeyword: searchKeywordReducer,
    searchResults: searchResultsReducer,
    // formCards: newUserCardReducer,

    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(photoApi.middleware),
});

const rootReducer = combineReducers({
//   searchKeywordReducer,
  searchResultsReducer,
//   newUserCardReducer,
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