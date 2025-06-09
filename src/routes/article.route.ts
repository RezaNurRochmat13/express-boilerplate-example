import express from "express";
import { ArticleController } from "../controller/article.controller";

const articleRouter = express.Router();
const { index, show, create, update, destroy, sendEmail } = ArticleController()

articleRouter.get("/articles", index);
articleRouter.get("/articles/:id", show);
articleRouter.post("/articles", create);
articleRouter.put("/articles/:id", update);
articleRouter.delete("/articles/:id", destroy);
articleRouter.post("/articles/send-email", sendEmail);

export default articleRouter;