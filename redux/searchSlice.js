import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:{
        searchInput: '',
        searchType: '',
        searchSex: ''
    }
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        inputSearch: (state, action) => {
            state.value = action.payload
        },
        clearSearch: (state) => {
            state.value = initialState.value
        },
    },
})

export const { inputSearch, clearSearch } = searchSlice.actions

export default searchSlice.reducer