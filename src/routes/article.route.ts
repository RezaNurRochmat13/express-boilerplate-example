import express from "express";
import { ArticleController } from "../controller/article.controller";
import { useAuth } from "../middleware/auth.middleware";

const articleRouter = express.Router();
const {  authenticate } = useAuth();
const { index, show, create, update, destroy, sendEmail } = ArticleController()

articleRouter.get("/articles", authenticate, index);
articleRouter.get("/articles/:id", show);
articleRouter.post("/articles", create);
articleRouter.put("/articles/:id", update);
articleRouter.delete("/articles/:id", destroy);
articleRouter.post("/articles/send-email", sendEmail);

export default articleRouter;