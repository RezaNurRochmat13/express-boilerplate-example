"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = ArticleService;
const article_repository_1 = require("../repository/article.repository");
function ArticleService() {
    const { all, findById, create, update, destroy } = (0, article_repository_1.ArticleRepository)();
    function findAllArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield all();
        });
    }
    function findArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield findById(id);
        });
    }
    function createArticle(title, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield create(title, body);
        });
    }
    function updateArticle(id, title, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield update(id, title, body);
        });
    }
    function deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield destroy(id);
        });
    }
    return {
        findAllArticles,
        findArticle,
        createArticle,
        updateArticle,
        deleteArticle
    };
}
