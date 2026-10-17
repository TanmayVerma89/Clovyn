import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../model/user.model.js";
// Function to generate JWT token for a given user ID
function generateToken(userId) {
    return jwt.sign(
        {
            id: userId,
        },
        config.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );
}

// Function to set token in response cookie and send response with success message and new user data
function sendTokenResponse(user, res, message) {
    res.cookie("token", generateToken(user._id));
    // Send response with success message and new user data
    res.status(201).json({
        message: message,
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            contact: user.contact,
            role: user.role,
        },
    });
}

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { email, password, fullname, contact, role } = req.body;

        // Check if user already exists on basis of contact and
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });
        if (existingUser) {
            return res
                .status(409)
                .json({
                    message:
                        "Email already exists with " + existingUser?.email ==
                            email
                            ? "Email"
                            : "Contact",
                });
        }

        // Save user to database
        const user = await userModel.create({
            email,
            password,
            fullname,
            contact,
            role,
        });

        sendTokenResponse(user, res, "User registered successfully");
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
        const user = await userModel.findOne({ email }).select("+password");
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
        sendTokenResponse(user, res, "User logged in successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error", err });
    }
};

// Google Oauth Controller
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const googleController = async (req, res) => {
    const profile = req.user;
    const { token } = req.cookies;
    try {

        const {role} = jwt.verify(token, config.JWT_SECRET);
        

        let user = await userModel.findOne({ email: profile.emails[0].value });

        // If user does not exist, create a new user
        if (!user) {
            user = await userModel.create({
                email: profile.emails[0].value,
                googleId: profile.id,
                fullname: profile.displayName, 
                
                role,
                ...(profile.phoneNumber && { contact: profile.phoneNumber }),
            });
        }

        // Send token response
        res.cookie("token", generateToken(user._id));
        res.redirect("http://localhost:5173/");
    } catch (err) {
        res.status(500)
            .json({
                success: false,
                message: "Error in Google registering",
                error: err,
            })
    }
};

export const validateGoogleOAuthRoleController = async (req, res, next) => {
    const { role } = req.query;
    if (!role && role !== 'buyer' && role !== 'seller') return res.status(400).json({ message: 'Invalid role' });

    const token = jwt.sign(
        { role },
        config.JWT_SECRET,
        {
            expiresIn: "10m"
        }
    )
    res.cookie("token", token);
    next();
}