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
        },
        updateTicketStatus: (state, action) => {
            const { ticketId, status } = action.payload;
            const ticketIndex = state.ticketData.findIndex((ticket) => ticket._id === ticketId);
            if (ticketIndex !== -1) {
                state.ticketData[ticketIndex].status = status;
            }
        },
        updateSelectedData: (state, action) => {
            const { status } = action.payload;
            state.selectedTicket.status = status;
        }

    }
})

export const { setTicketData, setSelectedTicket, updateTicketStatus, updateSelectedData } = ticketSlice.actions;

export default ticketSlice.reducer;
