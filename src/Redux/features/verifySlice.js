import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    verify: {}
}

export const verifySlice = createSlice({
    name: 'verify',
    initialState,
    reducers: {
        setVerify: (state, action) => {
            state.verify = action.payload
        }
    },
})

export const { setVerify } = verifySlice.actions

export default verifySlice.reducer