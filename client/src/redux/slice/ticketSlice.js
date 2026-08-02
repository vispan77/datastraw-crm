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
        },
        removeDeletedTicketData: (state, action) => {
            const ticketId = action.payload;
            state.ticketData = state.ticketData.filter((ticket) => ticket._id !== ticketId);
            state.selectedTicket = null;
        }

    }
})

export const {
    setTicketData, setSelectedTicket,
    updateTicketStatus, updateSelectedData, removeDeletedTicketData
} = ticketSlice.actions;

export default ticketSlice.reducer;
