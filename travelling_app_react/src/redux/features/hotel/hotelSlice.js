import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hotelList: null,
    isHotelList: true,
    searchHotelInfo: null
}

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        setHotelList: (state, action) => {
            state.hotelList = action.payload
        },
        setIsHotelList: (state) => {
            state.isHotelList = false;
        },
        setSearchHotelInfo: (state, action) => {
            state.searchHotelInfo = action.payload
        }
    }
});

export const { setHotelList, setIsHotelList, setSearchHotelInfo } = hotelSlice.actions;
export default hotelSlice.reducer;