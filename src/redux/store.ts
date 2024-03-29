import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/login.slice";

export const store = configureStore({
    reducer: {
        login: loginSlice
    },
})

export type RootState = ReturnType<typeof store.getState>