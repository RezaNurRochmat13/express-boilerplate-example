"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const article_controller_1 = require("../controller/article.controller");
const articleRouter = express_1.default.Router();
const { index, show, create, update, destroy } = (0, article_controller_1.ArticleController)();
articleRouter.get("/articles", index);
articleRouter.get("/articles/:id", show);
articleRouter.post("/articles", create);
articleRouter.put("/articles/:id", update);
articleRouter.delete("/articles/:id", destroy);
exports.default = articleRouter;
