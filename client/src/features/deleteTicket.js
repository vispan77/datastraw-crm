import api from "../../utils/api";


const deleteTicket = async (ticketId) => {
    try {
        await api.delete(`/ticket/${ticketId}`);
        
    } catch (error) {
        console.log(`error in delete ticket ${error}`)
    }
}

export default deleteTicket;