import  {useEffect , useState} from 'react';
import axios from 'axios';
import {Box,Typography,Button} from '@mui/material';
import MealCard from './MealCard';

const Home = () => {
    const [categories , setCategories] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState('');
    const [meals,setMeals] = useState([]);

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
             .then(response => setCategories(response.data.categories.slice(0,5)))
             .catch(error => console.error('Error fetching categories',error));
    },[]);

    useEffect(() => {
        if(selectedCategory){
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
                .then(response => setMeals(response.data.meals))
                .catch(error => console.error('Error fetching meals',error));
        }
    },[selectedCategory]); //if category changes it will fetch the meals based on the category

    return(
        <Box sx={{p:3}}>
            <Typography variant='h4' gutterBottom> Categories </Typography>
            <Box sx={{display:'flex',gap:2,mb:4}}>
                {categories.map(category => (
                    <Button key={category.idCategory} variant={selectedCategory === category.strCategory ? 'contained' : 'outlined'} onClick={() => setSelectedCategory(category.strCategory)}>
                        {category.strCategory}
                    </Button>
                ))}
            </Box>
            <Box sx={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center'}}>
                {meals.map(meal => (
                    <Box key={meal.idMeal}>
                        <MealCard meal={meal} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
};


export default Home;