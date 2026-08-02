
import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../slice/ticketSlice";
import messageSlice from "../slice/messageSlice";
import noteSlice from "../slice/noteSlice";
import userSlice from "../slice/userSlice";



const store = configureStore({
    reducer: {
        user: userSlice,
        ticket: ticketSlice,
        message: messageSlice,
        note: noteSlice
    }
});

export default store;