const express = require('express');
const connectDatabase = require('./database/db');
const dotenv  = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();

connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/recipes',recipeRoutes);

const PORT =  5000;
app.listen(PORT , () => {
    console.log(`Server is running in port ${PORT}`);
})