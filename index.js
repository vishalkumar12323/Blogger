import { config } from "dotenv"
config();
import { express, bodyParser, path, cookieParser, Home, connectDB, router, blogRouter, authentication, checkUserAuth } from "./import/import.js"


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

// setting application routes.
// Home Routes
app.get('/', checkUserAuth, Home)
// User Routes
app.use('/user', router);
// Blog Routes
app.use("/blog", authentication, blogRouter);


// connecting mongodb.
connectDB(process.env.LOCAL_URL).then(() => console.log('connect'));
app.listen(port, () => console.log(`server running on port:${port}`));
