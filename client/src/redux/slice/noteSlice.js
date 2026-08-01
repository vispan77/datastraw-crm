import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: "note",
    initialState: {
        notesData: [],
    },
    reducers: {
        setNotesData: (state, action) => {
            state.notesData = action.payload || [];
        },
        addNoteData: (state, action) => {
            state.notesData.unshift(action.payload);
        },
    }
});

export const { setNotesData, addNoteData } = noteSlice.actions;
export default noteSlice.reducer;
