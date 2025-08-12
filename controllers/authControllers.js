require("dotenv").config();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const lengthErr = "must be between 1 and 10 characters.";
const alphaNumErr = "must only contain letters and/or numbers.";
const passwordErr = "must be between 5 and 20 characters.";

const validateUser = [
    body("username").trim().notEmpty()
        .isAlphanumeric().withMessage(`username ${alphaNumErr}`)
        .isLength({ min: 1, max: 30 }).withMessage(`username ${lengthErr}`)
    // prevent duplicate username
        .custom(async value => {
            const user = await db.findUserByUsername(value);
            if (user) {
                throw new Error("Username already in use");
            }
        }),
    body("password").trim().notEmpty()
        .isLength({ min: 5, max: 20 }).withMessage(`password ${passwordErr}`),
    body("confirmPassword").trim().notEmpty()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
    body("secretCode").trim().notEmpty().optional()
        .custom((value) => value === process.env.SECRET_CODE)
        .withMessage('Invalid code'),
];

exports.postSignUp = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                statusCode: "400",
                errors: errors.array(),
            });
        }
        const { username, password, secretCode } = req.body;
        const hashedPassword = await bcrypt.hash(password, 20);

        // validate secret code
        let user;
        if (secretCode === process.env.SECRET_CODE) {
            user = await db.createUser(username, hashedPassword, true);
        } else {
            user = await db.createUser(username, hashedPassword, false);
        }

        // issue jwt
        const expiresIn = '14d';
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        const payload = {
            sub: user.id,
            iat: Date.now()
        };
        const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiresIn });
        const token = "Bearer" + signedToken;

        return res.json({
            success: true,
            id: user.id,
            username: user.username,
            isAuthor: user.isAuthor,
            token,
            expiresIn,
        });
    }
];

exports.postLogin = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json({ success: false, msg: "Failed to log in" });
            }
            req.login(user, { session: false }, async (error) => {
                if (error) { return next(error); }

                // issue jwt after log in 
                const expiresIn = '14d';
                const PRIVATE_KEY = process.env.PRIVATE_KEY;
                const payload = {
                    sub: user.id,
                    iat: Date.now()
                };
                const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiresIn });
                const token = "Bearer" + signedToken;

                return res.json({
                    success: true,
                    message: "Logged in successfully",
                    token,
                    expiresIn,
                });
            });
        } catch (error) {
            return res.status(400).json({ success: false, msg: "Error while authenticating" });
        }
    })(req, res, next);
};

exports.getLogOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    return res.json({
        message: "You have logged out",
    });
};