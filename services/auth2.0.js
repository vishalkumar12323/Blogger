import { passport, GoogleStrategy, User } from "../import/import.js";
GoogleStrategy.Strategy;

const auth2_O = () => {
    passport.use(User.createStrategy());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/auth/google/user-blog',
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            User.findOrCreate({ googleId: profile.id }, (err, user) => {
                return cb(err, user);
            })
        }
    ))
};

export { auth2_O };