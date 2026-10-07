import jwt from "jsonwebtoken";
import config from '../config/config.js'
import userModel from "../model/user.model.js";

// Function to handle token logic

function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        {
            userId: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );
    //
    res.cookie('token', token)
    // Send response with success message and new user data
    res.status(201).json({
        message: message,
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            contact: user.contact,
            role: user.role
        },
    });
}

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { email, password, fullname, contact, role } = req.body;

        // Check if user already exists on basis of contact and 
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }]
        });
        if (existingUser) {
<<<<<<< HEAD
            const field = existingUser.email === email ? "Email" : "Contact";
            return res.status(409).json({ message: `${field} already exists` });
=======
            return res.status(409).json({ message: "Email already exists with " + existingUser?.email == email ? "Email" : "Contact" });
>>>>>>> feature/auth
        }

        // Save user to database
        const user = await userModel.create({
            email,
            password,
            fullname,
            contact,
            role,
        });

        sendTokenResponse(user, res, "User registered successfully")

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", err });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Compare entered password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Send token response
        sendTokenResponse(user, res, "User logged in successfully")
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", err });
    }
};
