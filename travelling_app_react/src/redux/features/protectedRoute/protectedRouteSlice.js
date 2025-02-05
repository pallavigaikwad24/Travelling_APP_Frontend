import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false
}

const protectedSlice = createSlice({
    name: 'protected',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false
        },
    }
});

export const { login, logout } = protectedSlice.actions;
export default protectedSlice.reducer;