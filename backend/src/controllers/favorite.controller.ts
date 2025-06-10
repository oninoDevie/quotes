import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const favoriteController = {
  // Add quote to favorites
  async addFavorite(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const { quoteId } = req.body;

      // Check if quote exists
      const quote = await prisma.quote.findUnique({
        where: { id: quoteId },
      });

      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }

      // Add to favorites
      const favorite = await prisma.favorite.create({
        data: {
          userId,
          quoteId,
        },
        include: {
          quote: true,
        },
      });

      res.status(201).json(favorite);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Quote is already in favorites' });
      }
      res.status(500).json({ error: 'Error adding to favorites' });
    }
  },

  // Remove quote from favorites
  async removeFavorite(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const { quoteId } = req.params;

      const favorite = await prisma.favorite.findFirst({
        where: {
          userId,
          quoteId,
        },
      });

      if (!favorite) {
        return res.status(404).json({ error: 'Favorite not found' });
      }

      await prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error removing from favorites' });
    }
  },

  // Check if quote is in favorites
  async checkFavorite(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const { quoteId } = req.params;

      const favorite = await prisma.favorite.findFirst({
        where: {
          userId,
          quoteId,
        },
      });

      res.json({ isFavorite: !!favorite });
    } catch (error) {
      res.status(500).json({ error: 'Error checking favorite status' });
    }
  },
}; 