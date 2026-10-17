import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        (_, __, profile, done) => {
            try {
                return done(null, profile); // Return the user object to the passport middleware
            } catch (error) {
                return done(null, error); // Handle any errors that occur during authentication
            }
        },
    ),
);  

export default passport