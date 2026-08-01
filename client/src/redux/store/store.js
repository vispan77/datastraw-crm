
import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../slice/ticketSlice";
import messageSlice from "../slice/messageSlice";
import noteSlice from "../slice/noteSlice";

const store = configureStore({
    reducer: {
        ticket: ticketSlice,
        message: messageSlice,
        note: noteSlice
    }
});

export default store;