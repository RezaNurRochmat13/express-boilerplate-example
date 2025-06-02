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
exports.ArticleController = ArticleController;
const article_service_1 = require("../service/article.service");
function ArticleController() {
    const { findAllArticles, findArticle, createArticle, updateArticle, deleteArticle } = (0, article_service_1.ArticleService)();
    function index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield findAllArticles();
            response.status(200).json({
                message: 'Articles retrieved successfully',
                data: articles
            });
        });
    }
    function show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const article = yield findArticle(id);
            if (!article) {
                response.status(404).json({
                    message: 'Article not found'
                });
            }
            response.status(200).json({
                message: 'Articles retrieved successfully',
                data: article
            });
        });
    }
    function create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = request.body;
            const article = yield createArticle(title, description);
            response.status(201).json({
                message: 'Article created successfully',
                data: article
            });
        });
    }
    function update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const { title, description } = request.body;
            const article = yield updateArticle(id, title, description);
            response.status(200).json({
                message: 'Article updated successfully',
                data: article
            });
        });
    }
    function destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            yield deleteArticle(id);
            response.status(200).json({
                message: 'Article deleted successfully',
                data: {}
            });
        });
    }
    return {
        index,
        show,
        create,
        update,
        destroy
    };
}
