import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './searchSlice'
import authSlice from './authSlice'

export const store = configureStore({
    reducer: {
        search: searchSlice,
        auth: authSlice
    },
})