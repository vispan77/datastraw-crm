import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Ready State:", mongoose.connection.readyState);
console.log("Mongo URL exists:", !!process.env.MONGODB_URL);


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