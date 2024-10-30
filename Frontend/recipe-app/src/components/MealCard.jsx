import {useState} from 'react';
import {Card  ,CardContent,CardMedia,Typography,IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MealDetailsPopup from './MealDetailsPopup';


const MealCard = ({meal}) => {
    const [favorite , setFavorite] = useState(false);
    const [popupOpen,setPopupOpen] = useState(false);

    const handleSetFavorite = () => {
        setFavorite(!favorite);
    };

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    }

    return(
        <>
        <Card onClick={handleOpenPopup} sx={{cursor:'pointer'}} >
            <CardMedia component="img" height="130" image={meal.strMealThumb} alt={meal.strMeal} />
            <CardContent>
                <Typography variant='h6'> {meal.strMeal} </Typography>
                <IconButton onClick={handleSetFavorite} color={favorite ? 'error' : 'default'}>
                    <FavoriteIcon />
                </IconButton>
            </CardContent>
        </Card>
        <MealDetailsPopup open={popupOpen} close={handleClosePopup} mealId={meal.idMeal} />
        </>

    )
};

export default MealCard;