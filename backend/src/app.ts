import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { config } from './config/config';
import quoteRoutes from './routes/quote.routes';
import userRoutes from './routes/user.routes';
import favoriteRoutes from './routes/favorite.routes';
import objectiveRoutes from './routes/objective.routes';

// Initialize Prisma client
export const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth middleware for protected routes
app.use('/api', ClerkExpressRequireAuth());

// API Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/objectives', objectiveRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Please authenticate to access this resource'
        });
    }

    // Default error response
    res.status(500).json({
        error: 'Internal Server Error',
        message: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('Database connection established');

        app.listen(config.port, () => {
            console.log(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Closing HTTP server and database connection...');
    await prisma.$disconnect();
    process.exit(0);
});

startServer(); 