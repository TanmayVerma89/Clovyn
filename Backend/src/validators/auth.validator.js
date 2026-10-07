import { body, validationResult } from "express-validator";

function validateRsult(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json({
        message: "Validation failed",
        errors: errors.array().map(({ path, msg }) => ({
            field: path,
            message: msg,
        })),
    });
}

export const validateRegister = [

    body("email")
        .notEmpty()
        .withMessage("Please enter full name")
        .bail()
        .isEmail()
        .withMessage("Please enter correct email address"),

    body("fullname")
        .trim()
        .notEmpty()
        .withMessage("Please enter full name")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("Full name must be between 3 and 30 characters long")
        .bail()
<<<<<<< HEAD
        .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
        .withMessage("Full name can only contain letters and spaces"),
=======
        .isAlpha()
        .withMessage("Full name can only contain letters"),
>>>>>>> feature/auth

    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
        .withMessage('Password must be at least 8 characters and contain uppercase, lowercase, number, and special character')
    ,

    body("contact")
        .notEmpty()
        .withMessage("Please enter contact number")
        .bail()
        .isNumeric()
        .withMessage("Contact number must be numeric")
        .bail()
        .matches(/^\d{10}$/)
        .withMessage('Contact number must be exactly 10 digits')
<<<<<<< HEAD
=======
        .bail()
>>>>>>> feature/auth
    ,
    validateRsult
]

export const validateLogin = [
    body("email")
        .notEmpty()
        .withMessage("Please enter full name")
        .bail()
        .isEmail()
        .withMessage("Please enter correct email address"),

    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
        .withMessage('Password must be at least 8 characters and contain uppercase, lowercase, number, and special character'),
    validateRsult
]