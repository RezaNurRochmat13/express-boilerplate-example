import { Request, Response } from "express";
import { ArticleService } from "../service/article.service";

export function ArticleController() {
    const {  findAllArticles, findArticle, createArticle, updateArticle, deleteArticle, sendingEmailConfirmation } = ArticleService();

    async function index(request: Request, response: Response) {
        const articles = await findAllArticles();

        response.status(200).json({
            message: 'Articles retrieved successfully',
            data: articles
        })
    }

    async function show(request: Request, response: Response) {
        const id = request.params.id;
        const article = await findArticle(id);

        if (!article) {
            response.status(404).json({
                message: 'Article not found'
            })
        }

        response.status(200).json({
            message: 'Articles retrieved successfully',
            data: article
        })
    }

    async function create(request: Request, response: Response) {
        const { title, description } = request.body;

        const article = await createArticle(title, description);

        response.status(201).json({
            message: 'Article created successfully',
            data: article
        })
    }

    async function update(request: Request, response: Response) {
        const id = request.params.id;
        const { title, description } = request.body;

        const article = await updateArticle(id, title, description);

        response.status(200).json({
            message: 'Article updated successfully',
            data: article
        })
    }

    async function destroy(request: Request, response: Response) {
        const id = request.params.id;
        await deleteArticle(id);

        response.status(200).json({
            message: 'Article deleted successfully',
            data: {}
        })
    }

    async function sendEmail(request: Request, response: Response) {
        const { email } = request.body;
        await sendingEmailConfirmation(email);

        response.status(200).json({
            message: 'Email sent successfully and processed on background',
            data: {}
        })
    }


    return {
        index,
        show,
        create,
        update,
        destroy,
        sendEmail
    }
}