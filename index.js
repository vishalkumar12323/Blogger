import { config } from "dotenv";
config();
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
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
app.use('/', checkUserAuth, router);
app.use("/blog", authentication, blogRouter);


// connecting mongodb.
connectDB(process.env.CONNECTION_STRING).then(() => console.log('connect'));
app.listen(port, () => console.log(`server running on port:${port}`));
