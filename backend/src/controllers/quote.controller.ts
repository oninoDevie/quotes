import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const quoteController = {
  // Get all quotes
  async getAllQuotes(req: Request, res: Response) {
    try {
      const quotes = await prisma.quote.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quotes' });
    }
  },

  // Get quote by ID
  async getQuoteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const quote = await prisma.quote.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quote' });
    }
  },

  // Create new quote
  async createQuote(req: Request, res: Response) {
    try {
      const { title, content, audioUrl, author } = req.body;
      const userId = req.auth.userId;

      const quote = await prisma.quote.create({
        data: {
          title,
          content,
          audioUrl,
          author,
          userId,
        },
      });
      res.status(201).json(quote);
    } catch (error) {
      res.status(500).json({ error: 'Error creating quote' });
    }
  },

  // Update quote
  async updateQuote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, audioUrl, author } = req.body;
      const userId = req.auth.userId;

      const quote = await prisma.quote.findUnique({
        where: { id },
      });

      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }

      if (quote.userId !== userId) {
        return res.status(403).json({ error: 'Not authorized to update this quote' });
      }

      const updatedQuote = await prisma.quote.update({
        where: { id },
        data: {
          title,
          content,
          audioUrl,
          author,
        },
      });
      res.json(updatedQuote);
    } catch (error) {
      res.status(500).json({ error: 'Error updating quote' });
    }
  },

  // Delete quote
  async deleteQuote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.auth.userId;

      const quote = await prisma.quote.findUnique({
        where: { id },
      });

      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }

      if (quote.userId !== userId) {
        return res.status(403).json({ error: 'Not authorized to delete this quote' });
      }

      await prisma.quote.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting quote' });
    }
  },
}; 