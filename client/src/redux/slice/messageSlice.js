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
        addMessageData: (state, action) =>{
            state.messageData.push(action.payload)
        }
    }
})

export const { setMessagesData, addMessageData } = messageSlice.actions; 

export default messageSlice.reducer;
