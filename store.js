import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import handleAuthReducer from "./features/service/handleAuth";
import handleBookingReducer from "./features/service/handleBooking";

const store = configureStore({
    reducer: {
        auth: handleAuthReducer,
        booking: handleBookingReducer,
    },
});

export default store;