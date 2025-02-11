import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    authToken: null,
    _id: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.authToken = action.payload.authToken;
            state._id = action.payload._id; // Store MongoDB ObjectId
        },
        logout: (state) => {
            state.user = null;
            state.authToken = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
