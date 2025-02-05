import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../features/auth/loginSlice';
import searchHotelReducer from '../features/searchHotel/searchHotelSlice';
import backendUrlReducer from '../features/backendUrl/backendUrl';
import hotelReducer from '../features/hotel/hotelSlice';
import protectedRouteReducer from '../features/protectedRoute/protectedRouteSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        searchHotel: searchHotelReducer,
        backendUrl: backendUrlReducer,
        hotel: hotelReducer,
        protected: protectedRouteReducer
    }
});

export default store;