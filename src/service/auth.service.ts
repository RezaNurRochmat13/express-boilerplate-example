import bcrypt from 'bcryptjs';
import { UserRepository } from '../repository/user.repository'
import { generateToken } from '../utils/jwt_util';
import { RegisterDTO, LoginDTO } from '../types/auth';

export function AuthService() {
    const { findByEmail, create } = UserRepository()

    async function register(dto: RegisterDTO) {
        const existingUser = await findByEmail(dto.email);
        if (existingUser) throw new Error('Email already in use');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await create(dto.name, dto.email, hashed);

        const token = generateToken({ id: user.id, email: user.email });
        const { password, ...userWithoutPassword } = user;

        return { token, userWithoutPassword };
    }

    async function login(dto: LoginDTO) {
        const user = await findByEmail(dto.email);
        if (!user) throw new Error('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.password as string);
        if (!valid) throw new Error('Invalid credentials');

        const token = generateToken({ id: user.id, email: user.email });
        const { password, ...userWithoutPassword } = user;

        return { token, userWithoutPassword};
    }

    return {
        register,
        login
    }
}
