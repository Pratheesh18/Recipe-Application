import {useState} from 'react';
import {Card  ,CardContent,CardMedia,Typography,IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const MealCard = ({meal}) => {
    const [favorite , setFavorite] = useState(false);

    const handleSetFavorite = () => {
        setFavorite(!favorite);
    }

    return(
        <Card>
            <CardMedia component="img" height="130" image={meal.strMealThumb} alt={meal.strMeal} />
            <CardContent>
                <Typography variant='h6'> {meal.strMeal} </Typography>
                <IconButton onClick={handleSetFavorite} color={favorite ? 'error' : 'default'}>
                    <FavoriteIcon />
                </IconButton>
            </CardContent>
        </Card>
    )
};

export default MealCard;