import { express, multer, getSigninPage, signin, getLoginPage, login, Logout, storage2 } from "../import/import.js"
const router = express.Router();

const upload = multer({ storage: storage2 });

// signin page route
router.route("/signin").get(getSigninPage).post(upload.single('profileImage'), signin);

// login page route
router.route("/login").get(getLoginPage).post(login);

// logout page route
router.route("/logout").get(Logout);
export { router };
