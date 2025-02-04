import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: '',
    alertView: false,
    showPassword: false,
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
            console.log("Action Payload 18:", action);
        },
        showPassword: (state) => {
            state.showPassword = true
        }
    }
});

export const { showAlert, showError, showPassword, hideAlert } = loginSlice.actions;
export default loginSlice.reducer;