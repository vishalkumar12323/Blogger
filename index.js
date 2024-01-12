import { config } from "dotenv"
config();
import { GoogleStrategy, User, session, passport, express, bodyParser, path, cookieParser, connectDB, blogRouter } from "./import/import.js"
GoogleStrategy.Strategy;
// setting express app.
const app = express();
const port = process.env.PORT || 8080;

// setting view engine templates.
app.set("view engine", 'ejs');
app.set('ejs', path.resolve("./views"));

// setting middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
connectDB(process.env.LOCAL_URL).then(() => console.log('connect'));

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
        User.findOrCreate({ googleId: profile.id, name: profile.displayName, userProfileImageURL: profile.photos[0].value }, (err, user) => {
            return cb(err, user);
        })
    }
))

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/user-blog',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.get('/signup', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/signup', (req, res) => {
    User.register(
        { username: req.body.username, name: req.body.name },
        req.body.password,
        (err, user) => {
            if (err) {
                console.log('Registeration error', err);
                res.redirect('/signup');
            } else {
                console.log(user);
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/');
                });
            }
        });
});

app.post('/login', (req, res) => {

});

app.get('/logout', (req, res) => {

});

app.listen(port, () => console.log(`server running on port:${port}`));