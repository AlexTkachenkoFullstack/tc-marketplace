import { configureStore } from '@reduxjs/toolkit';
import { carsSlice } from './cars/slice';
import { filterSlice } from './filter/slice';
import { authSlice } from './auth/slice';
import { profileSlice } from './profile/slice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const persistConfig = {
  key: 'userRoot',
  storage: storage,
  whitelist: ['token'],
};

const persistFilterConfig = {
  key: 'filterParams',
  storage,
  whitelist: ['select', 'paramsForSubscr', "title"],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
const persistedFilterReducer = persistReducer(persistFilterConfig, filterSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cars: carsSlice.reducer,
    filter: persistedFilterReducer,
    profile: profileSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
