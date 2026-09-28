import mongoose from 'mongoose'
import config from './config.js';

export async function connectToDB() {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Mongoose error")
        throw new Error("Error : ", error);
    }
}