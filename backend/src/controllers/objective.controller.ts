import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const objectiveController = {
  // Get all objectives for the current user
  async getObjectives(req: Request, res: Response) {
    try {
      const userId = req.auth?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID not found' });
      }

      const objectives = await prisma.objective.findMany({
        where: { userId },
        orderBy: [
          { priority: 'asc' }, // Sort by priority first
          { estado: 'asc' }, // Then by state
        ],
      });
      res.json(objectives);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error fetching objectives' });
      }
    }
  },

  // Create a new objective
  async createObjective(req: Request, res: Response) {
    try {
      const userId = req.auth?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID not found' });
      }

      const { titulo, priority, estado, urgency } = req.body;

      // Basic validation
      if (!titulo || !priority || !estado || !urgency) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check for max 3 objectives per priority
      const countForPriority = await prisma.objective.count({
        where: {
          userId,
          priority,
        },
      });

      if (countForPriority >= 3) {
        return res.status(400).json({ error: 'Maximum 3 objectives per priority reached.' });
      }

      const objective = await prisma.objective.create({
        data: {
          titulo,
          priority,
          estado,
          urgency,
          userId,
        },
      });
      res.status(201).json(objective);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error creating objective' });
      }
    }
  },

  // Update an objective
  async updateObjective(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.auth?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID not found' });
      }

      const { titulo, priority, estado, urgency } = req.body;

      const objective = await prisma.objective.findUnique({
        where: { id },
      });

      if (!objective || objective.userId !== userId) {
        return res.status(404).json({ error: 'Objective not found or unauthorized' });
      }

      const updatedObjective = await prisma.objective.update({
        where: { id },
        data: {
          titulo,
          priority,
          estado,
          urgency,
        },
      });
      res.json(updatedObjective);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error updating objective' });
      }
    }
  },

  // Delete an objective
  async deleteObjective(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.auth?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID not found' });
      }

      const objective = await prisma.objective.findUnique({
        where: { id },
      });

      if (!objective || objective.userId !== userId) {
        return res.status(404).json({ error: 'Objective not found or unauthorized' });
      }

      await prisma.objective.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error deleting objective' });
      }
    }
  },
}; 