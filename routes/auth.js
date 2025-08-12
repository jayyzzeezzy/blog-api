require("dotenv").config();
const { Router } = require("express");
const authController = require("../controllers/authControllers");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const db = require('../db/queries');

const authRouter = Router();

/*
* ----------------- CONFIGURE PASSPORT STRATEGIES -------------------
*/
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_VERIFY_KEY,
    algorithms: ['RS256'],
};

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.findUserByUsername(username);
            // console.log(user);
    
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            // compare passwords using bcryptjs
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user, { message: "Logged in successfully!" });
        } catch(err) {
            return done(err);
        }
    })
);
// create user session and persist their login credentials 
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await db.findUserById(payload.sub);
            console.log(user);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        } catch(err) {
            return done(err, false);
        }
    })
);

/*
* ------------------------- ROUTES --------------------------------
*/
authRouter.post("/login", authController.postLogin);
authRouter.get("/logout", authController.getLogOut);
authRouter.post("/signup", authController.postSignUp);

module.exports = authRouter;