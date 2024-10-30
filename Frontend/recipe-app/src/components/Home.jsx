import  {useEffect , useState} from 'react';
import {Box,Button} from '@mui/material';
import MealCard from './MealCard';
import api from '../api';
import NavBar from './NavBar';


const Home = () => {
    const [categories , setCategories] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState('');
    const [meals,setMeals] = useState([]);

    useEffect(() => {
        api.get('/recipes/categories')
             .then(response => {
                setCategories(response.data.categories);
                if(response.data.categories.length > 0){
                    setSelectedCategory(response.data.categories[0].strCategory);
                }
             })
             .catch(error => console.error('Error fetching categories',error));
    },[]);

    useEffect(() => {
        if(selectedCategory){
            api.get(`/recipes/meals/${selectedCategory}`)
                .then(response => {
                    console.log("Meals fetched",response.data);
                    setMeals(response.data);
                })
                .catch(error => console.error('Error fetching meals',error));
        }
    },[selectedCategory]); //if category changes it will fetch the meals based on the category

    return(
        <>
        <NavBar />
        <Box sx={{p:3}}>
            <Box sx={{display:'flex',gap:2,mb:4,justifyContent:'center' , flexWrap:'wrap'}}>
                {categories.map(category => (
                    <Button type='button' key={category.idCategory} variant={selectedCategory === category.strCategory ? 'contained' : 'outlined'} onClick={() => setSelectedCategory(category.strCategory)}>
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
        </>
    )
};


export default Home;