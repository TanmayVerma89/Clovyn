import express from 'express'
import { validateLogin, validateRegister } from '../validators/auth.validator.js';
import { loginController, registerController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Define your authentication routes here
authRouter.post('/login', validateLogin, loginController)
authRouter.post('/register', validateRegister, registerController)


export default authRouter