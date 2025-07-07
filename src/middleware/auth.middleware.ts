import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verifyToken } from '../utils/jwt_util';

export function useAuth() {
    function authenticate(req: Request, res: Response, next: NextFunction) {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const token = header?.split(' ')[1];
            const decoded = verifyToken(token as string);
            (req as Request & { user: JwtPayload }).user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }

    return {
        authenticate
    }
}
