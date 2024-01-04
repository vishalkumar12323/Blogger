import { Router } from "express";

const blogRouter = Router();

blogRouter.route("/new-blog").get((req, res) => {
    res.render("new-blog");
}).post(async (req, res) => {

});

blogRouter.route("/edit").get((req, res) => {
    res.render("edit");
}).post(async (req, res) => {

});

export { blogRouter };