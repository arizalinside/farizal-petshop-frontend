# Farizal Petshop Frontend

This is a modern web application for managing petshop inventory and sales, built with React, Redux Toolkit, and Tailwind CSS. It provides features for product management, sales input, dark/light theme switching, and responsive UI components.

## Features
- Product inventory management (CRUD)
- Sales input and tracking
- Pagination and items per page selection
- Dark mode and light mode support
- Toast notifications for user feedback
- Responsive design with Tailwind CSS
- Modular component structure

## Tech Stack
- React + Vite
- Redux Toolkit
- Axios
- Tailwind CSS
- React Toastify

## Getting Started
1. **Install dependencies:**
   ```zsh
   npm install
   ```
2. **Set environment variables:**
   Edit `.env` and set your API URL:
   ```env
   VITE_API_URL="http://localhost:3000"
   ```
3. **Run the app:**
   ```zsh
   npm run dev
   ```
4. **Open in browser:**
   Visit `http://localhost:5173` (default Vite port)

## Folder Structure
- `src/components/` — UI components (tables, forms, dialogs, etc.)
- `src/pages/` — Main pages
- `src/redux/` — Redux slices and store
- `src/types/` — Type definitions
- `src/common/` — Shared utilities and loaders

## Customization
- Update theme colors in `tailwind.config.cjs`
- Add new features by creating components in `src/components/`
- Connect to your backend by updating the API URL in `.env`

## License
MIT
