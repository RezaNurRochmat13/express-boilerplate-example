import prisma from "../config/database.config"

export function ArticleRepository() {
    async function all() {
        return await prisma.article.findMany()
    }

    async function findById(id: string) {
        return await prisma.article.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }

    async function create(title: string, description: string) {
        return await prisma.article.create({
            data: {
                title: title,
                description: description
            }
        })
    }

    async function update(id: string, title: string, description: string) {
        return await prisma.article.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                description: description
            }
        })
    }

    async function destroy(id: string) {
        return await prisma.article.update({
            where: {
                id: parseInt(id)
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