import { ArticleRepository } from "../repository/article.repository";

export function ArticleService() {
    const {  all, findById, create, update, destroy } = ArticleRepository();

    async function findAllArticles() {
        return await all()
    }

    async function findArticle(id: string) {
        return await findById(id)
    }

    async function createArticle(title: string, body: string) {
        return await create(title, body)
    }

    async function updateArticle(id: string, title: string, body: string) {
        return await update(id, title, body)
    }

    async function deleteArticle(id: string) {
        return await destroy(id)
    }

    return {
        findAllArticles,
        findArticle,
        createArticle,
        updateArticle,
        deleteArticle
    }
}