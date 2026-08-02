import api from "../../utils/api";



const updateStatus = async (ticketId, status) => {
    try {
        const { data } = await api.put(`/ticket/${ticketId}`, { status });
        
        return data.ticket;
    } catch (error) {
        console.log(`error in updating status = ${error}`);

    }
}

export default updateStatus;