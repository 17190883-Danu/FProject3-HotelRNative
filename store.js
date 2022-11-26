import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import handleAuthReducer from "./features/service/handleAuth";

const store = configureStore({
    reducer: {
        auth: handleAuthReducer,
    },
});

export default store;