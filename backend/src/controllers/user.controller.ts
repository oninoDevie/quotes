import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { clerkClient } from '@clerk/clerk-sdk-node';

const prisma = new PrismaClient();

export const userController = {
  // Get current user profile
  async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
          quotes: true,
          favorites: {
            include: {
              quote: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error fetching user profile' });
      }
    }
  },

  // Create or update user profile
  async createOrUpdateUser(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const { email, name } = req.body;

      // Get user from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);

      // Create or update user in database
      const user = await prisma.user.upsert({
        where: { clerkId: userId },
        update: {
          email: email || clerkUser.emailAddresses[0].emailAddress,
          name: name || clerkUser.firstName,
        },
        create: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: clerkUser.firstName,
        },
      });

      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error creating/updating user profile' });
      }
    }
  },

  // Get user's quotes
  async getUserQuotes(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
          quotes: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user.quotes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error fetching user quotes' });
      }
    }
  },

  // Get user's favorites
  async getUserFavorites(req: Request, res: Response) {
    try {
      const userId = req.auth.userId;
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
          favorites: {
            include: {
              quote: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user.favorites);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error fetching user favorites' });
      }
    }
  },
}; 