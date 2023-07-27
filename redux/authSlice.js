import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        logIn: false
    }
}

export const authSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
        inputAuth: (state, action) => {
            state.value = action.payload
        },
        clearAuth: (state) => {
            state.value = initialState.value
        },
    },
})

export const { inputAuth, clearAuth } = authSlice.actions

export default authSlice.reducer