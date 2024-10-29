const express = require('express');
const {getCategories , getMealsByCategory,addFavorite,removeFavorite,getFavorites} = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//only logged in users can access these routes
router.get('/categories',authMiddleware,getCategories);
router.get('/meals/:category',authMiddleware,getMealsByCategory);
router.post('/favorites',authMiddleware,addFavorite);
router.delete('/favorites/:recipeId',authMiddleware,removeFavorite);
router.get('/favorites',authMiddleware,getFavorites);

module.exports = router;