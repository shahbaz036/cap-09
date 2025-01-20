# User Management System

A simple web application for managing user details, built with vanilla JavaScript and Vite. The application uses JSONPlaceholder API as a mock backend.

## Features

- View list of users with their details
- Add new users
- Edit existing users
- Delete users
- Responsive design
- Error handling and success notifications

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Setup Instructions

1. Clone the repository or download the source code

2. Navigate to the project directory:
```bash
cd user-management-system
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── index.html
├── package.json
├── src/
│   ├── main.js        # Main application logic
│   └── style.css      # Application styles
└── README.md
```

## API Integration

The application uses JSONPlaceholder (`https://jsonplaceholder.typicode.com/users`) as a mock API. Note that while all CRUD operations will appear to work, changes are not actually persisted as it's a mock API.

## Available Operations

- **View Users**: Users are automatically loaded when the application starts
- **Add User**: Click "Add New User" button and fill in the form
- **Edit User**: Click the "Edit" button next to a user and modify their details
- **Delete User**: Click the "Delete" button next to a user (requires confirmation)

## Browser Support

The application uses modern JavaScript features and should work in all recent versions of major browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Built with vanilla JavaScript using ES6+ features
- Uses the Fetch API for HTTP requests
- Implements class-based architecture for better organization
- Includes error handling and success notifications
- Responsive design that works on mobile devices