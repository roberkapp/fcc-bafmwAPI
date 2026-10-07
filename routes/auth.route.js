import { Router } from 'express'
import { findByUsername } from '../utils/db.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';

const router = Router();
router.post('/login', async (req, res) => {
    const { username, password } =  req.body;
    if(!username || !password){
        res.status(400).json({message: 'Bad request, username or password is missing.'});
        return;
    }

    const user = findByUsername(username);
    if(!user){
        res.status(401).json({message: 'Username does not exist.'})
        return;
    }

    const verifyPassword = await bcrypt.compare(password, user.passwordHash);
    if(!verifyPassword){
        res.status(401).json({message: 'Invalid credentials'});
        return;
    }

    const payload = {
        id: user.id,
        role: user.role,
        username
    }

    const token = signToken(payload);
    res.status(200).json({message: 'Authenticated', token});
    return;
})

export default router;