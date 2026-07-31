import api from "../../utils/api"



const createTicket = async (payload) => {
    try {
        const { data } = await api.post("/ticket/create-ticket", payload);
        console.log(data);
        return data.ticket;
    } catch (error) {
        console.log(`error in creating ticket = ${error}`)
    }
}

export default createTicket;