const express = require('express');
const connectDatabase = require('./database/db');
const dotenv  = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();

connectDatabase();

const app = express();
app.use(cors({
    origin: ['https://recipe-application-api.vercel.app','http://localhost:3000'], // Update this to match your frontend URL
    credentials: true,               // Allows cookies and credentials to be sent
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/recipes',recipeRoutes);

app.get('/',(req,res) => {
    res.send('Welcome to the Recipe apis');
})

const PORT =  process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running in port ${PORT}`);
})