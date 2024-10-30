const axios = require('axios');
const Recipe = require('../models/Recipe');


exports.getCategories = async (req,res) => { //fetch all meal categories
    try{
        const {data} = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        res.json({categories:data.categories.slice(0,5)});
    }catch(error){
        res.status(500).json({message : 'Failed to fetch categories'});
    }
};

exports.getMealsByCategory = async(req,res) => { // fetch meals by categories
    const {category} = req.params;
    try{
        const {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        res.json(data.meals);
    }catch(error){
        res.status(500).json({message : 'Failed to fetch meals'});
    }
};

exports.addFavorite = async (req, res) => {
    const { recipeId, title, imageUrl} = req.body;
    console.log("Req.user",req.user);
    try {
        // Check if the recipe is already in the favorites to prevent duplicates
        const existingFavorite = await Recipe.findOne({ userId: req.user._id, recipeId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Recipe already in favorites' });
        }

        // Create and save the new favorite
        const fav = new Recipe({ userId: req.user._id, recipeId, title, imageUrl});
        await fav.save();
        res.status(201).json({ message: 'Recipe added to favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
};

exports.removeFavorite = async(req,res) => { //remove  favorite recipes
    try{
        const deletedFavorite = await Recipe.findOneAndDelete({userId :req.user._id , recipeId:req.params.recipeId});
        if(!deletedFavorite){
            return res.status(404).json({message : 'Favorite not found'});
        }
        res.status(200).json({message : "Favorite removed successfully"});
        
    }catch(error){
        res.status(500).json({message : 'Failed to remove favorite'});
    }
};

exports.getFavorites = async (req,res) => { //get users' favorite meals
    try{
        const fav = await Recipe.find({userId:req.user._id});
        res.json(fav);
    }catch(error){
        res.status(500).json({message : 'failed to fetch favorites'})
    }
}