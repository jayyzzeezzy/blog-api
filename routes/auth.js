const { Router } = require("express");
const authController = require("../controllers/authControllers");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const db = require('../db/queries');

const authRouter = Router();

/*
* ----------------- CONFIGURE PASSPORT STRATEGIES -------------------
*/
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.findUserByUsername(username);
            console.log(user);
    
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


/*
* ------------------------- ROUTES --------------------------------
*/
authRouter.post("/login", authController.postLogin);
authRouter.get("/logout", authController.getLogOut);
authRouter.post("/signup", authController.postSignUp);

module.exports = authRouter;