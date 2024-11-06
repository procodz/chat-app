
import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        mongoose.connect(process.env.DB_URI);
        console.log("DB connected")
    } catch (error) {
        console.log("DB could not be connected" + error.message);
    }
}

export default connectDB;