import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

// Get current user profile
router.get('/me', userController.getCurrentUser);

// Create or update user profile
router.post('/me', userController.createOrUpdateUser);

// Get user's quotes
router.get('/me/quotes', userController.getUserQuotes);

// Get user's favorites
router.get('/me/favorites', userController.getUserFavorites);

export default router; 