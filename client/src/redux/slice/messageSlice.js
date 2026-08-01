import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name: "message",
    initialState: {
        messageData: []
    },
    reducers: {
        setMessagesData: (state, action) => {
            state.messageData = action.payload
        },
        addMessageData: (state, action) => {
            state.messageData.push(action.payload)
        },
        clearMessageData: (state) => {
            state.messageData = []
        }
    }
})

export const { setMessagesData, addMessageData, clearMessageData } = messageSlice.actions;

export default messageSlice.reducer;
