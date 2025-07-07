import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt_util';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const token = header.split(' ')[1];
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
