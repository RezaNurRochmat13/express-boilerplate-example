import prisma from "../config/database.config"

export function ArticleRepository() {
    async function all() {
        return await prisma.article.findMany()
    }

    async function findById(id: string) {
        return await prisma.article.findUnique({
            where: {
                id: id
            }
        })
    }

    async function create(title: string, body: string) {
        return await prisma.article.create({
            data: {
                title: title,
                body: body
            }
        })
    }

    async function update(id: string, title: string, body: string) {
        return await prisma.article.update({
            where: {
                id: id
            },
            data: {
                title: title,
                body: body
            }
        })
    }

    async function destroy(id: string) {
        return await prisma.article.update({
            where: {
                id: id
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    return {
        all,
        findById,
        create,
        update,
        destroy
    }
}