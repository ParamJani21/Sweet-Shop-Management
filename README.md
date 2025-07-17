# Sweet Shop Management

A full-stack web application for managing a sweet shop, featuring a modern React frontend and a Node.js/Express backend.

## Features
- Animated, professional dashboard UI
- Add new sweets (with unique ID, name, category, price, quantity)
- View all sweets in a searchable, sortable table
- Search sweets by name, category, or price range
- Sort sweets by any field (name, price, category, etc.)
- Purchase sweets (decreases stock, with error if not enough stock)
- Restock sweets (increases stock)
- Delete sweets
- Responsive and accessible design
- Modular, developer-friendly codebase

## Screenshots
> (Add screenshots here if desired)

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

## API Endpoints
- `POST   /sweets` — Add a new sweet
- `GET    /sweets` — Get all sweets
- `GET    /sweets/:id` — Get a sweet by ID
- `PUT    /sweets/:id` — Update a sweet
- `DELETE /sweets/:id` — Delete a sweet
- `GET    /sweets/search?name=&category=&minPrice=&maxPrice=` — Search sweets
- `GET    /sweets/sort?field=&order=` — Sort sweets
- `POST   /sweets/:id/purchase` — Purchase sweet (body: `{ quantity }`)
- `POST   /sweets/:id/restock` — Restock sweet (body: `{ quantity }`)

## Troubleshooting
- If you see no sweets in the dropdown, restart the backend and add new sweets (old sweets may lack an `id`).
- If you get CORS errors, ensure both frontend and backend are running locally.
- For scroll issues, the UI is now fully responsive and scrollable.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
