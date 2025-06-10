import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import quoteRoutes from './routes/quote.routes';
import userRoutes from './routes/user.routes';
import favoriteRoutes from './routes/favorite.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
app.use(ClerkExpressRequireAuth());

// Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 