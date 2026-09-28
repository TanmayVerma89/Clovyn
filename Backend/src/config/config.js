import "dotenv/config"

const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI
}

if(!config.PORT){
    throw new Error('PORT is not defined in environmental variables')
}

if(!config.MONGO_URI){
    throw new Error("MONGO_URI is not defined in environmental variables ");
}

export default config