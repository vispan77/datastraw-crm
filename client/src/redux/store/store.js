
import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../slice/ticketSlice";
import messageSlice from "../slice/messageSlice";

const store = configureStore({
    reducer: {
        ticket: ticketSlice,
        message: messageSlice
    }
});

export default store;