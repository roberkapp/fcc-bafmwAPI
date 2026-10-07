import { verifyToken } from '../utils/jwt.js';

export function authenticate(req, res, next){
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')){
        res.status(401).json({error: 'No token provided.'});
        return;
    }
    const token = auth.split(' ').at(-1);
    
    const decoded = verifyToken(token);
    if(!decoded){
        res.status(401).json({error: 'Invalid or expired token.'});
        return;
    }
    
    req.user = decoded;
    next();
}