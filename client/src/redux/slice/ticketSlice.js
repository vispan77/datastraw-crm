import { createSlice } from "@reduxjs/toolkit";


const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        ticketData: [],
        selectedTicket: null
    },
    reducers: {
        setTicketData: (state, action) => {
            state.ticketData = action.payload;
        },
        setSelectedTicket: (state, action) => {
            state.selectedTicket = action.payload;
        }
    }
})

export const { setTicketData, setSelectedTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
