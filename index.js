import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import path from "path";

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

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signin", (req, res) => {
    res.render("signin");
});
app.listen(port, () => console.log(`server up & running port:${port}`));
