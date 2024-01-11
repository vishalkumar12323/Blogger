import { express, multer } from "../import/import.js"
import { storage2 } from "../services/file-handle.js"
import { Logout, getLoginPage, getSigninPage, login, signin, } from "../controllers/user.js"
const router = express.Router();

const upload = multer({ storage: storage2 });

// signin page route
router.route("/signin").get(getSigninPage).post(upload.single('profileImage'), signin);

// login page route
router.route("/login").get(getLoginPage).post(login);

// logout page route
router.route("/logout").get(Logout);
export { router };
