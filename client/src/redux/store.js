import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});