import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "../redux/slices/templateSlice";

export const store = configureStore({
    reducer: {
        template: templateReducer,
    },
});

export default store;
