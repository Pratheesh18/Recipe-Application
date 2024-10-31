import  {useEffect , useState , useCallback} from 'react';
import {Box,Button} from '@mui/material';
import MealCard from './MealCard';
import api from '../api';
import NavBar from './NavBar';


const Home = () => {
    const [categories , setCategories] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState('');
    const [meals,setMeals] = useState([]);
    const [showMeals , setShowMeals] = useState(10);

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
        if (selectedCategory) {
            fetchMealsByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchMealsByCategory = async (category) => {
        try {
            const response = await api.get(`/recipes/meals/${category}`);
            setMeals(response.data);
            setShowMeals(10); 
        } catch (error) {
            console.error("Error fetching meals", error);
        }
    };

    const handleScrollFunction = useCallback(() => {
        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight-50){
            setShowMeals(prevShow => prevShow + 10)
        }
    },[]);

    useEffect(() => { //used throttling to show the meals 
        window.addEventListener('scroll',handleScrollFunction);
        return () => window.removeEventListener('scroll',handleScrollFunction);
    },[handleScrollFunction]);

    return(
        <>
        <NavBar />
        <Box sx={{p:3}}>
            <Box sx={{display:'flex',gap:2,mb:4,justifyContent:'center' , flexWrap:'wrap'}}>
                {categories.map(category => (
                    <Button sx={{backgroundColor:'#E84B7D' , color:'white'}} type='button' key={category.idCategory} variant={selectedCategory === category.strCategory ? 'contained' : 'outlined'} onClick={() => setSelectedCategory(category.strCategory)}>
                        {category.strCategory}
                    </Button>
                ))}
            </Box>
            <Box sx={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center'}}>
                {meals.slice(0,showMeals).map(meal => (
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