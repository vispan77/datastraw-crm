import api from "../../utils/api";


const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/me");
        
        return data.user;
    } catch (error) {
        console.log(`error in get user ${error}`)
    }
}

export default getCurrentUser;