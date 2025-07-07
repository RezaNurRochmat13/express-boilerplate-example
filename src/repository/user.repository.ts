import prisma from "../config/database.config"

export function UserRepository() {
    async function findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async function create(name: string, email: string, password: string) {
        return await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
    }

    return {
        findByEmail,
        create
    }
}
