import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define user schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // Google ID field is optional for Google users, but required for local users
        googleId: {
            type: String,
            unique: true,
            sparse: true,
            select: false
        },
        // Password field is optional for Google users,
        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
            minLength: 8,
            select: false,
        },
        fullname: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: false,
            sparse:true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["seller", "buyer"],
            default: "buyer",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function () {

    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);

}

const userModel = mongoose.model("User", userSchema);
export default userModel;
