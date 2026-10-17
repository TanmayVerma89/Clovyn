import express from 'express'
import { validateLogin, validateRegister } from '../validators/auth.validator.js';
import { loginController, registerController, googleController, validateGoogleOAuthRoleController } from '../controllers/auth.controller.js';
import passport from 'passport';

const authRouter = express.Router();

// Define your authentication routes here
authRouter.post('/login', validateLogin, loginController)
authRouter.post('/register', validateRegister, registerController)

authRouter.get('/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
authRouter.get('/register/google',
    validateGoogleOAuthRoleController,
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

authRouter.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    googleController
)


export default authRouter