import { Request, Response } from "express";
import { ArticleService } from "../service/article.service";
import { connection as redis } from "../config/redis.config";
import logger from "../logger";

export function ArticleController() {
    const {  findAllArticles, findArticle, createArticle, updateArticle, deleteArticle, sendingEmailConfirmation } = ArticleService();

    const ARTICLE_LIST_KEY = 'articles:all';

    async function index(request: Request, response: Response) {
        try {
            const cached = await redis.get(ARTICLE_LIST_KEY);

            if (cached) {
                response.status(200).json({
                    message: 'Articles retrieved from cache',
                    data: JSON.parse(cached),
                });
            }

            const articles = await findAllArticles();

            // Simpan ke cache selama 60 detik
            await redis.set(ARTICLE_LIST_KEY, JSON.stringify(articles), 'EX', 60);

            response.status(200).json({
                message: 'Articles retrieved successfully',
                data: articles,
            });
        } catch (error) {
            logger.error(error);
            response.status(500).json({ message: 'Internal server error' });
        }
    }

    async function show(request: Request, response: Response) {
        const id = request.params.id;
        const cacheKey = `article:${id}`;

        try {
            const cached = await redis.get(cacheKey);

            if (cached) {
                response.status(200).json({
                    message: 'Article retrieved from cache',
                    data: JSON.parse(cached),
                });
            }

            const article = await findArticle(id);

            if (!article) {
                response.status(404).json({
                    message: 'Article not found',
                });
            }

            await redis.set(cacheKey, JSON.stringify(article), 'EX', 60);

            response.status(200).json({
                message: 'Article retrieved successfully',
                data: article,
            });
        } catch (error) {
            logger.error(error);
            response.status(500).json({ message: 'Internal server error' });
        }
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

        // Invalidate cache 
        await redis.del(`article:${id}`);
        await redis.del('articles:all');

        response.status(200).json({
            message: 'Article updated successfully',
            data: article
        })
    }

    async function destroy(request: Request, response: Response) {
        const id = request.params.id;
        await deleteArticle(id);

        // Invalidate cache
        await redis.del(`article:${id}`);
        await redis.del('articles:all');

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