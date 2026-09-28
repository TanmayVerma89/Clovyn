import app from "./src/app";
import config from "./src/config/config";
import { connectToDB } from "./src/config/db";

connectToDB

app.listen(config.PORT,() => {
    console.log('Server is running on port 3000');
})