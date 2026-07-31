import { createSlice } from "@reduxjs/toolkit";


const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        ticketData: null
    },
    reducers: {
        setTicketData: (state, action) => {
            state.ticketData = action.payload;
        }
    }
})

export const { setTicketData } = ticketSlice.actions;

export default ticketSlice.reducer;
