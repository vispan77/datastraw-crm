
import api from "../../utils/api";


const getNote = async (ticketId) => {
    try {
        const { data } = await api.get(`/ticket/notes/${ticketId}`);
        console.log("data after creating notes", data);
        return data.note;
    } catch (error) {
        console.log(`error in creating note ${error}`)
    }
}

export default getNote;