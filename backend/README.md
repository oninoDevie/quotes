# Quotes Backend

Backend service for the Quotes application, built with Node.js, Express, TypeScript, Prisma, Clerk, and Supabase.

## Features

- User authentication with Clerk
- Database management with Prisma and Supabase
- RESTful API for quotes management
- User favorites system
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Clerk account

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your-supabase-connection-string"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   PORT=3000
   NODE_ENV=development
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Quotes
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get quote by ID
- `POST /api/quotes` - Create new quote
- `PUT /api/quotes/:id` - Update quote
- `DELETE /api/quotes/:id` - Delete quote

### Users
- `GET /api/users/me` - Get current user profile
- `POST /api/users/me` - Create/update user profile
- `GET /api/users/me/quotes` - Get user's quotes
- `GET /api/users/me/favorites` - Get user's favorites

### Favorites
- `POST /api/favorites` - Add quote to favorites
- `DELETE /api/favorites/:quoteId` - Remove quote from favorites
- `GET /api/favorites/:quoteId` - Check if quote is in favorites

## Database Schema

The application uses the following database schema:

- User
  - id (String)
  - clerkId (String)
  - email (String)
  - name (String)
  - createdAt (DateTime)
  - updatedAt (DateTime)

- Quote
  - id (String)
  - title (String)
  - content (String)
  - audioUrl (String)
  - author (String)
  - userId (String)
  - createdAt (DateTime)
  - updatedAt (DateTime)

- Favorite
  - id (String)
  - userId (String)
  - quoteId (String)
  - createdAt (DateTime)

## License

ISC 