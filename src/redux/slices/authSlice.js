import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage when initializing state
const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("authUser")) : null;

const initialState = {
    user: storedUser?.user || null,
    authToken: storedUser?.authToken || null,
    _id: storedUser?._id || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.authToken = action.payload.authToken;
            state._id = action.payload._id;

            // Save user data to localStorage
            localStorage.setItem("authUser", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.authToken = null;
            state._id = null;

            // Remove user data from localStorage on logout
            localStorage.removeItem("authUser");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
