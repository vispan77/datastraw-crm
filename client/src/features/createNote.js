import api from "../../utils/api";

const createNote = async (ticketId, noteText) => {
    try {
        const { data } = await api.post(`/ticket/notes/${ticketId}`, {
            note_text: noteText
        });
        return data.note;
    } catch (error) {
        console.log(`error in creating note = ${error}`);
    }
}

export default createNote;
