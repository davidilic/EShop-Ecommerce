import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {

    try{
        const URI = process.env.MONGO_URI
        const connection = await mongoose.connect(URI)
        
        const log = "MongoDB Connected: " + connection.connection.host
        console.log(log.cyan.underline)
    }
    catch (error){
        console.log(("Error:" + error.message).red.bold)
        process.exit(1)
    }
}

export default connectDB
