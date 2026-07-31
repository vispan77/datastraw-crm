import api from "../../utils/api";


const createMessage = async (ticketId, payload) => {
    try {
        const { data } = await api.post(`/message/create/${ticketId}`, payload)
        console.log("message created successfully");
        return data.message;

    } catch (error) {
        console.log(`error in creating message = ${error}`);
    }
}

export default createMessage;