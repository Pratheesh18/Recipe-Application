const axios = require('axios');
const Recipe = require('../models/Recipe');


exports.getCategories = async (req,res) => { //fetch all meal categories
    try{
        const {data} = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        res.json(data.categories);
    }catch(error){
        req.status(500).json({message : 'Failed to fetch categories'});
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

exports.addFavorite = async (req,res) => { // adding favorite meals
    const {recipeId,title,imageUrl,category} = req.body;
    try{
        const fav = new Recipe({userId:req.user._id,recipeId,title,imageUrl,category});
        await fav.save();
        res.status(201).json({message : 'Recipe added to favorites'});
    }catch(error){
        res.status(500).json({message : 'Failed to add favorites'})
    }
};

exports.removeFavorite = async(req,res) => { //remove  favorite recipes
    try{
        await Recipe.findOneAndDelete({userId :req.user._id , recipeId:req.params,recipeId})
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