import { configureStore } from '@reduxjs/toolkit'
import { carsSlice } from './cars/slice'
import { filterSlice } from './filter/slice'
export const store = configureStore({
    reducer: {
        cars:carsSlice.reducer,
        filter: filterSlice.reducer
    }
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
