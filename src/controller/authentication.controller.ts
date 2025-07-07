import { Request, Response } from 'express';
import { AuthService } from "../service/auth.service"
import logger from '../logger';

export function AuthenticationController() {
    const { register, login } = AuthService()

    async function registerUser(req: Request, res: Response) {
        try {
            const result = await register(req.body);
            res.json({
                message: 'User registered successfully',
                data: {
                    token: result.token,
                    user: result.userWithoutPassword
                }
            });

        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async function loginUser(req: Request, res: Response) {
        try {
            const result = await login(req.body);

            res.json({
                message: 'User logged in successfully',
                data: {
                    token: result.token,
                    user: result.userWithoutPassword
                }
            });
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    }

    return {
        registerUser,
        loginUser
    }
}