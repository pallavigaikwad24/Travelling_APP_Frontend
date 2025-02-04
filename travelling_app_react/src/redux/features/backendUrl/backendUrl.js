import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    url: import.meta.env.VITE_BACKEND_URL
}

const searchHotelSlice = createSlice({
    name: 'backendUrl',
    initialState,
    reducers: {}
});

export default searchHotelSlice.reducer;