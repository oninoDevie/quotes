import { Router } from 'express';
import { quoteController } from '../controllers/quote.controller';

const router = Router();

// Get all quotes
router.get('/', quoteController.getAllQuotes);

// Get quote by ID
router.get('/:id', quoteController.getQuoteById);

// Create new quote
router.post('/', quoteController.createQuote);

// Update quote
router.put('/:id', quoteController.updateQuote);

// Delete quote
router.delete('/:id', quoteController.deleteQuote);

export default router; 