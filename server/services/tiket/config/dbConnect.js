import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();




const dbConnect = async() => {
    try{
        const url = process.env.MONGODB_URL;

        if(url){
            await mongoose.connect(url);
            console.log("DB id connected successfully");
        }
        
    }catch(error){
        console.log(`error in the database = ${error}`);
        process.exit(1)
    }
}

export default dbConnect;