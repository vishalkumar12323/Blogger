import { config } from "dotenv";
config();
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Home } from "./controllers/home.js";
import { connectDB } from "./db/connection.js";
import { router } from "./routes/user-router.js";
import { blogRouter } from "./routes/blog-router.js";
import { authentication, checkUserAuth } from "./middlewares/authentication.js";

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
