import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/quotes_db'
    },
    clerk: {
        secretKey: process.env.CLERK_SECRET_KEY
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
        credentials: true
    }
}; 