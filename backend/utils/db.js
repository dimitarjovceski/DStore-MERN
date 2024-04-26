import mongoose from "mongoose";

const connectDb = async () => {
    try {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    console.log("Successfully connected to Mongo Db!");
    } catch (error) {   
        console.log(error);
    }
}

export default connectDb;