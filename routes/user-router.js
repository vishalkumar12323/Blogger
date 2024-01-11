import { express, multer, User, passport } from "../import/import.js"
import { storage2 } from "../services/file-handle.js"
const router = express.Router();
const upload = multer({ storage: storage2 });

router.get('/', (req, res) => {
    res.render('home');
});

router.get("/signup", (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/signup', (req, res) => {
    User.register(
        { username: req.body.username },
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/signup");
            } else {
                console.log(user);
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            }
        }
    );
});

export { router };
