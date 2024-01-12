import { config } from "dotenv"
config();
import { GoogleStrategy, User, session, passport, express, bodyParser, path, connectDB } from "./import/import.js"
import multer from "multer";
import { storage2 } from "./services/file-handle.js";
GoogleStrategy.Strategy;
// setting express app.

const app = express();
const port = 8080;
const upload = multer({ storage: storage2 });
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('ejs', path.resolve('./views'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.get('/signup', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/new-blog', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('new-blog');
    } else {
        res.redirect('/login');
    }
});

app.post('/signup', upload.single('profileImage'), (req, res) => {
    User.register(
        { username: req.body.username, name: req.body.name, userProfileImageURL: `uploads/user/${req.file.filename}` },
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect('/');
                })
            }
        });
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            console.log('login error', err);
            res.redirect('login');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            });
        }
    });
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('logout error', err);
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    })
});

connectDB(process.env.LOCAL_URL).then(() => console.log('connect'));
app.listen(port, () => console.log(`start on port: ${port}`));