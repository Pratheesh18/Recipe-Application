/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react';
import {Card  ,CardContent,CardMedia,Typography,IconButton ,Button} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MealDetailsPopup from './MealDetailsPopup';
import api from '../api';

const MealCard = ({meal , onFetchFavorites , isFavoritePage=false}) => {
    const [favorite , setFavorite] = useState(false);
    const [popupOpen,setPopupOpen] = useState(false);


    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try{
                const response = await api.get('/recipes/favorites',{withCredentials:true});
                const isFav = response.data.some(favMeal => favMeal.recipeId === meal.idMeal);
                setFavorite(isFav);
            }catch(error){
                console.error('Error fetching favorite status',error);
            }
        };

        if (!isFavoritePage) checkFavoriteStatus();
    },[meal.idMeal , isFavoritePage]);

    const handleUpdateFavorite = async () => {
        try{
            if(favorite || isFavoritePage){
                const response = await api.delete(`/recipes/favorites/${meal.idMeal}`,{withCredentials:true});
                if (response.status === 200) {
                    onFetchFavorites(meal.idMeal); // Update favorites immediately on success
                }

            }else{
                console.log("Favs",{
                    recipeId : meal.idMeal,
                    title : meal.strMeal,
                    imageUrl : meal.strMealThumb,
                })
                await api.post('/recipes/favorites',{
                    recipeId : meal.idMeal,
                    title : meal.strMeal,
                    imageUrl : meal.strMealThumb,
                },{withCredentials:true});
                setFavorite(true);
            }
            setFavorite(!favorite);
            onFetchFavorites();
        }catch(error){
            console.error('Error adding favorites',error);
        }
    }

    const handleOpenPopup = () => {
        console.log("Opening popup with mealId:", meal.idMeal);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    }

    return(
        <>
        <Card onClick={handleOpenPopup} sx={{cursor:'pointer',width:300,height:300,display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} >
            <CardMedia component="img" height="150" image={meal.strMealThumb} alt={meal.strMeal} />
            <CardContent>
                <Typography variant='h6'> {meal.strMeal} </Typography>
                {isFavoritePage ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateFavorite();
                            }}
                            sx={{ mt: 1 }}
                        >
                            Remove
                        </Button>
                    ) : (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click event
                                handleUpdateFavorite();
                            }}
                            color={favorite ? 'error' : 'default'}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    )}
            </CardContent>
        </Card>
        <MealDetailsPopup open={popupOpen} close={handleClosePopup} mealId={meal.idMeal} />
        </>

    )
};

export default MealCard;