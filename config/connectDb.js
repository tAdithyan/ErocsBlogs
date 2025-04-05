import mongoose from "mongoose";
import dontenv from "dotenv";
import { error } from "console";
dontenv.config()


if(!process.env.MONGODB_URI){
    throw new Error(
        "please Provide MONGODB_URI in the .env file"
    )
}

async function connectDb(){ 

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect Db")
    } catch (error) {
        console.log("failed to Connect Db",error)
        process.exit(1)

        
    }

}
export default connectDb;
