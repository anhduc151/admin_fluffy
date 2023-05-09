import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    schoolsData: []
}

export const schoolsSlice = createSlice({
    name: 'schools',
    initialState,
    reducers: {
        setSchools: (state, action) => {
            state.schoolsData = action.payload
        }
    },
})

export const { setSchools } = schoolsSlice.actions

export default schoolsSlice.reducer