import api from "../../utils/api"



const createTicket = async (payload) => {
    try {
        const { data } = await api.post("/ticket/create-ticket", payload);
        console.log("data from the feature", data.ticket._id);
        return data.ticket._id;
    } catch (error) {
        console.log(`error in creating ticket = ${error}`)
    }
}

export default createTicket;