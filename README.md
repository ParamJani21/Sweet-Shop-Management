# Sweet Shop Management

A full-stack web application for managing a sweet shop, featuring a modern React frontend and a Node.js/Express backend.

## Features
- Animated, professional dashboard UI
- Add, view, and filter sweets
- Modular, developer-friendly codebase
- Ready for further extension (edit, delete, purchase, restock)

## Project Structure
```
sweet-shop-managment/
  backend/    # Node.js/Express API
  frontend/   # React + Vite frontend
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   # or
   node src/server.js
   ```
   The backend will run at `http://localhost:3001` by default.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
4. Open your browser at the address shown in the terminal (usually http://localhost:5173).

## API
- The frontend expects the backend API to be running at `http://localhost:3001`.
- Endpoints for managing sweets (CRUD) should be available.

## Customization
- You can extend the app by adding more features to the backend and frontend components.
- The animated background and UI can be customized in `frontend/src/App.css`.

## License
MIT
