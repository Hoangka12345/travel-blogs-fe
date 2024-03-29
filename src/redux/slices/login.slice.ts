import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoginState {
    isLogin: boolean,
}

const initialState: ILoginState = {
    isLogin: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin(state) {
            state.isLogin = true
        },
        setLogout(state) {
            state.isLogin = false
        }
    }
})

export const {
    setLogin,
    setLogout
} = loginSlice.actions

export default loginSlice.reducer