import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: '',
    alertView: false,
    showPassword: false,
    userInfo: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        showAlert: (state) => {
            state.alertView = true
        },
        hideAlert: (state) => {
            state.alertView = false
        },
        showError: (state, action) => {
            state.error = action.payload;
        },
        showPassword: (state) => {
            state.showPassword = true
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
});

export const { showAlert, showError, showPassword, hideAlert, setUserInfo } = loginSlice.actions;
export default loginSlice.reducer;