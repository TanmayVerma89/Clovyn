import dotenv from "dotenv";
dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}

if (!config.MONGO_URI) {
    throw new Error(" Mongo URI is not defined in the environment variables.")
}

if (!config.JWT_SECRET) {
    throw new Error(" JWT_SECRET is not defined in the environment variables");
}

if (!config.PORT) {
    throw new Error(" PORT is not defined in the environment variables");
}

export default config;