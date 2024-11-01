/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MealDetailsPopup from "./MealDetailsPopup";
import api from "../api";
import { toast } from "react-toastify";

const MealCard = ({ meal, onFetchFavorites, isFavoritePage = false }) => {
  const [favorite, setFavorite] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await api.get("/api/recipes/favorites", {
          withCredentials: true,
        });
        const isFav = response.data.some(
          (favMeal) => favMeal.recipeId === meal.idMeal
        );
        setFavorite(isFav);
      } catch (error) {
        console.error("Error fetching favorite status", error);
      }
    };

    if (!isFavoritePage) checkFavoriteStatus();
  }, [meal.idMeal, isFavoritePage]);

  const handleUpdateFavorite = async () => {
    try {
      if (favorite || isFavoritePage) {
        await api.delete(`/api/recipes/favorites/${meal.idMeal}`, {
          withCredentials: true,
        });
        setFavorite(false);
        onFetchFavorites(meal.idMeal); // Update favorites immediately on success
        toast.success("Meal removed successfully", {
          position: "bottom-right",
        });
      } else {
        await api.post(
          "/api/recipes/favorites",
          {
            recipeId: meal.idMeal,
            title: meal.strMeal,
            imageUrl: meal.strMealThumb,
          },
          { withCredentials: true }
        );
        setFavorite(true);
        toast.success("Meal added to favorites", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Error adding favorites", error);
    }
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleOpenPopup}
        sx={{
            cursor: 'pointer',
            width: 280,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
            },
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
        />
        <CardContent>
          <Typography variant="h6"> {meal.strMeal} </Typography>
          {isFavoritePage ? (
            <Button
              variant="contained"
              // color="secondary"

              onClick={(e) => {
                e.stopPropagation();
                handleUpdateFavorite();
              }}
              sx={{ mt: 1, backgroundColor: "#E84B7D" }}
            >
              Remove
            </Button>
          ) : (
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleUpdateFavorite();
              }}
              color={favorite ? "error" : "default"}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </CardContent>
      </Card>
      <MealDetailsPopup
        open={popupOpen}
        close={handleClosePopup}
        mealId={meal.idMeal}
      />
    </>
  );
};

export default MealCard;
