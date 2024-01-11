import { express, multer } from "../import/import.js"
import { storage2 } from "../services/file-handle.js"
const router = express.Router();
const upload = multer({ storage: storage2 });


router.get("/signup", (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/signup', upload('profileImage'), async (req, res) => {

});

export { router };
