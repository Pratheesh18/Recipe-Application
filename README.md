# Recipes World

Recipes World is a web application that allows users to search for recipes, view detailed instructions, and save their favorite recipes. This project is built using **React** for the frontend and **Node.js/Express** for the backend, and it integrates with an external recipe API to fetch a variety of recipes.

## Features

- **Recipe Search**: Users can search for recipes by keywords, ingredients, or cuisine type.
- **Recipe Details**: View detailed information for each recipe, including ingredients, instructions, and nutrition facts.
- **Favorites**: Users can add recipes to their favorite list and easily access them later.
- **User Authentication**: Secure login and registration with JWT-based access and refresh tokens.
- **Automatic Token Refresh**: Axios interceptors to automatically refresh access tokens when expired.
- **Responsive Design**: The application is fully responsive and accessible on all devices.

## Technologies Used

### Frontend
- **React**: Library for building user interfaces
- **Axios**: HTTP client for making API requests
- **React Router**: Library for handling routing in React applications
- **React Hook Form & Yup**: For form handling and validation
- **Material-UI**: Component library for responsive and accessible design
- **Toastify**: For user notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **JWT (jsonwebtoken)**: For secure token-based authentication
- **MongoDB & Mongoose**: Database and ORM for storing user and favorite recipes
- **dotenv**: For managing environment variables

### External API
- **TheMealDB API**: Provides access to a large database of recipes for various cuisines.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** running locally or accessible remotely
- Access to **TheMealDB API** (no API key needed for free usage)

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo/backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** in the `backend` folder with the following environment variables:
    ```plaintext
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    REFRESH_SECRET=your-refresh-secret
    ```

4. **Run the backend server**:
    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables** by creating a `.env` file in the `frontend` folder:
    ```plaintext
    VITE_BACKEND_URL=http://localhost:5000
    ```

4. **Run the frontend development server**:
    ```bash
    npm run dev
    ```

5. The frontend will be accessible at `http://localhost:5173`.

### Running the Project

Once both servers are running, you can visit the frontend URL in your browser to:
- Search for recipes by entering keywords in the search bar.
- View recipe details by selecting a recipe from the results.
- Register and log in to access the favorite recipes feature.
- Add recipes to your favorites list to view them anytime.

## Project Structure

    ├── backend                  # Backend server folder
    │   ├── config               # Configuration files
    │   ├── controllers          # Controller logic for handling requests
    │   ├── middleware           # Middleware for token validation, etc.
    │   ├── models               # Mongoose models for MongoDB
    │   └── routes               # Routes for user authentication and recipe handling
    ├── frontend                 # Frontend React application
    │   ├── src
    │   │   ├── components       # Reusable React components
    │   │   ├── api              # Axios instance and interceptors
    │   │   └── App.js           # Main app component
    └── README.md



