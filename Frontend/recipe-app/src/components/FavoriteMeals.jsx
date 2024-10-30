import { useEffect, useState } from "react";
import api from "../api";
import { Box, Typography } from "@mui/material";
import MealCard from "./MealCard";
import NavBar from "./NavBar";

const FavoriteMeals = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/recipes/favorites", {
        withCredentials: true,
      });
      setFavoriteMeals(response.data);
    } catch (error) {
      console.error("Error fetching favorite meals", error);
    }
  };

  const handleFavoriteChange = (mealId) => {
    setFavoriteMeals((prevfavorites) => prevfavorites.filter((meal) => meal.recipeId !== mealId))
  };

  return (
    <>
      <NavBar />
      <Box sx={{ p: 3 }}>
        {favoriteMeals.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {favoriteMeals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={{
                  idMeal: meal.recipeId,
                  strMeal: meal.title,
                  strMealThumb: meal.imageUrl,
                }}
                onFetchFavorites={() => handleFavoriteChange(meal.recipeId)}
                isFavoritePage={true}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 , display:'flex',justifyContent:'center' }}>
            No Favorite meals yet
          </Typography>
        )}
      </Box>
    </>
  );
};

export default FavoriteMeals;
