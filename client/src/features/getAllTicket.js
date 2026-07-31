import api from "../../utils/api"


const getAllTicket = async() => {
    try{
        const {data} = await api.get("/ticket/get-all-ticket");
        console.log(data.ticket);
        return data.ticket;
    }catch(error){
        console.log("error in geting all ticket", error);
        return [];
    }
}

export default getAllTicket