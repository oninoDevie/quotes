import { Router } from 'express';
import { objectiveController } from '../controllers/objective.controller';

const router = Router();

// Get all objectives for the current user
router.get('/', objectiveController.getObjectives);

// Create a new objective
router.post('/', objectiveController.createObjective);

// Update an objective by ID
router.put('/:id', objectiveController.updateObjective);

// Delete an objective by ID
router.delete('/:id', objectiveController.deleteObjective);

export default router; 