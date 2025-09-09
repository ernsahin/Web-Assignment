# Backend API

A RESTful API built with NestJS and TypeScript for managing users and posts with full CRUD operations.

**Live Backend URL:** <https://crud-project.up.railway.app/>

## Features

- User management (Create, Read, Update, Delete)
- Post management with user relationships
- TypeScript support
- Input validation with class-validator
- CORS enabled for frontend integration
- Security headers with Helmet

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Runtime:** Node.js
- **Security:** Helmet middleware
- **Validation:** class-validator, class-transformer

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:

```bash
cd backend
```

1. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

The server will start on `http://localhost:3001` with hot reload enabled.

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Environment Variables

The application uses the following environment variables:

- `PORT` - Server port (defaults to 3001)

## Project Structure

```text
backend/
├── src/
│   ├── users/          # User module
│   ├── posts/          # Post module
│   ├── data/           # Sample data
│   ├── app.module.ts   # Main application module
│   └── main.ts         # Application entry point
├── package.json
└── README.md
```
