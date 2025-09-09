# Web Development Assignment

A full-stack web application built with React frontend and NestJS backend, implementing user and post management with complete CRUD operations.

## Live Applications

- **Frontend:** <https://web-assignment-eight-sigma.vercel.app/>
- **Backend API:** <https://crud-project.up.railway.app/>

## Project Overview

This project demonstrates modern web development practices with a clean separation between frontend and backend services. The application allows users to manage user profiles and posts with full create, read, update, and delete functionality.

## Tech Stack

### Frontend

- **React** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router** for navigation
- **Axios** for API communication

### Backend

- **NestJS** with TypeScript
- **Node.js** runtime
- **Express** (within NestJS)
- **Class-validator** for input validation
- **Helmet** for security headers

## Project Structure

```text
Web-Assignment/
├── frontend/           # React application
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/            # NestJS API server
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md          # This file
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Running Locally

1. **Clone the repository:**

```bash
gh repo clone ernsahin/Web-Assignment
cd Web-Assignment
```

1. **Setup and run the backend:**

```bash
cd backend
npm install
npm run start:dev
```

Backend will run on `http://localhost:3001`

1. **Setup and run the frontend (in a new terminal):**

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features

### User Management

- View all users in a responsive table
- Add new users with form validation
- Edit existing user information
- Delete users with confirmation prompts
- Search and filter capabilities

### Post Management

- Display posts with user relationships
- Create new posts and assign to users
- Edit post titles and content
- Delete posts with confirmation
- Visual indication of post-user relationships

### Additional Features

- Clean, modern UI with Tailwind CSS
- Responsive design for mobile and desktop
- Type-safe development with TypeScript
- ESLint integration for code quality
- CORS-enabled API for cross-origin requests

## API Documentation

The backend provides RESTful endpoints for both users and posts:

### Users Endpoints

- `GET /users` - Retrieve all users
- `GET /users/:id` - Get specific user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts Endpoints

- `GET /posts` - Retrieve all posts
- `GET /posts/:id` - Get specific post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Development

### Code Quality

Both frontend and backend include ESLint configuration for maintaining code quality:

```bash
# Backend linting
cd backend && npm run lint

# Frontend linting
cd frontend && npm run lint
```

## Deployment

- **Frontend:** Deployed on Vercel with automatic builds from Git
- **Backend:** Deployed on Railway with environment-based configuration

## License

This project is for educational/assignment purposes.
