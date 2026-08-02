
import api from "../../utils/api";


const getNote = async (ticketId) => {
    try {
        const { data } = await api.get(`/ticket/notes/${ticketId}`);
        
        return data.notes;
    } catch (error) {
        console.log(`error in creating note ${error}`)
    }
}

export default getNote;