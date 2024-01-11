import { config } from "dotenv"
config();
import { session, passport, express, bodyParser, path, cookieParser, Home, connectDB, router, blogRouter } from "./import/import.js"
import { auth2_O } from "./services/auth2.0.js"

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

auth2_O();
// setting application routes.
// Home Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/user-blog',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
app.get('/', Home)
// User Routes
app.use('/user', router);
// Blog Routes
app.use("/blog", blogRouter);

// connecting mongodb.
connectDB(process.env.LOCAL_URL).then(() => console.log('connect'));
app.listen(port, () => console.log(`server running on port:${port}`));