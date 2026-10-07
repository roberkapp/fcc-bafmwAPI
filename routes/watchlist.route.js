import { Router } from 'express';
import { addMovie, deleteMovie, getWatchlist, updateMovie } from '../utils/db.js';
import { authorizeModification } from '../middleware/authorize.js';

const router = Router();

router.get('/:userId', (req, res) => {
    const { userId } = req.params
    const watchlist = getWatchlist(Number(userId));

    res.status(200).json(watchlist);
    return;
});

router.post('/:userId/movies',authorizeModification, (req, res) => {
    const {userId} = req.params;
    addMovie(Number(userId), req.body);
    
    res.status(201).json({message: 'Movie added to watchlist.'});
    return;
})


router.put('/:userId/movies/:movieId',authorizeModification, (req, res) => {
    const { userId, movieId } = req.params;
    
    updateMovie(Number(userId), Number(movieId), req.body);
    res.status(200).json({message: 'Movie updated successfully.'});
    return;
})

router.delete('/:userId/movies/:movieId',authorizeModification, (req ,res) => {
    const { userId, movieId } = req.params
    
    deleteMovie(Number(userId), Number(movieId));
    res.status(200).json({message: 'Movie deleted succesfully.'});
    return;
})

export default router;
