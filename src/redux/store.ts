import { configureStore } from '@reduxjs/toolkit'
import { carsSlice } from './cars/slice'
export const store = configureStore({
    reducer: {
        cars:carsSlice.reducer
    }
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch