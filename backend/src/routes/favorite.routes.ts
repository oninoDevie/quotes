import { Router } from 'express';
import { favoriteController } from '../controllers/favorite.controller';

const router = Router();

// Add quote to favorites
router.post('/', favoriteController.addFavorite);

// Remove quote from favorites
router.delete('/:quoteId', favoriteController.removeFavorite);

// Check if quote is in favorites
router.get('/:quoteId', favoriteController.checkFavorite);

export default router; 