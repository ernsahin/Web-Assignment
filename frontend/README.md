# Frontend Application

A React-based user interface for managing users and posts with full CRUD operations, built with TypeScript and Vite.

**Live Frontend URL:** <https://web-assignment-eight-sigma.vercel.app/>

## Features

- User management interface with create, edit, and delete functionality
- Post management with user relationships
- Clean, responsive design with Tailwind CSS
- TypeScript support for type safety
- React Router for navigation
- Axios for API communication

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **UI Components:** React Select

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

1. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173` with hot reload enabled.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```text
frontend/
├── src/
│   ├── components/     # React components
│   ├── api/           # API service functions
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── config/        # Configuration files
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── package.json
└── README.md
```

## Features Overview

### Homepage

- Welcome page with navigation links to Users and Posts sections

### Users Management

- View all users in a clean table format
- Add new users with form validation
- Edit existing user information
- Delete users with confirmation
- Search and filter functionality

### Posts Management

- View all posts with associated user information
- Create new posts and assign to users
- Edit post content and titles
- Delete posts with confirmation
- User relationship management

## API Integration

The frontend communicates with the backend API for all data operations. Ensure the backend server is running for full functionality.

Default backend URL: `http://localhost:3001`

## Environment Setup

The application is configured to work with the backend API. No additional environment variables are required for basic operation.
