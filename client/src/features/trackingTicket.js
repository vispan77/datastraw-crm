import api from "../../utils/api"

const trackingTicket = async (ticketId) => {
    try {
        const { data } = await api.get(`/ticket/${ticketId}`);
        return data.ticket;
    } catch (error) {
        console.log(`error in getting ticket by id = ${error}`)
    }
}

export default trackingTicket;