import { config } from "dotenv";
config();
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { connectDB } from "./db/connection.js";
import { router } from "./routes/user-router.js";
import { blogRouter } from "./routes/blog-router.js";
import { authentication } from "./middlewares/validate-user.js";

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", 'ejs');
app.set('ejs', path.resolve("./views"));

app.use(express.static("public"));
app.use(express.static(path.resolve("./node_modules/bootstrap/")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render("home");
});

app.use('/', router);
app.use("/blog", authentication, blogRouter);

connectDB(process.env.CONNECTION_STRING).then(() => console.log('connect'));
app.listen(port, () => console.log(`server running on port:${port}`));
