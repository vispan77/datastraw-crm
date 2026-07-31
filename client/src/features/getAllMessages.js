import api from "../../utils/api"


const getAllMessages = async (ticketId) => {
    try {
        const { data } = await api.get(`/message/${ticketId}`);
        console.log(data.messages);
        return data.messages;
    } catch (error) {
        console.log(`error in getting all messages = ${error}`)
    }
}

export default getAllMessages;