import  {useEffect , useState , useCallback} from 'react';
import {Box,Button , CircularProgress} from '@mui/material';
import MealCard from './MealCard';
import api from '../api';
import NavBar from './NavBar';


const Home = () => {
    const [categories , setCategories] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState('');
    const [meals,setMeals] = useState([]);
    const [showMeals , setShowMeals] = useState(10);
    const [loading,setLoading] = useState(false);

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
        setLoading(true);
        try {
            const response = await api.get(`/recipes/meals/${category}`);
            setMeals(response.data);
            setShowMeals(10); 
        } catch (error) {
            console.error("Error fetching meals", error);
        }finally{
            setLoading(false);
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
        <Box sx={{p:3 ,  backgroundColor: "#EADFDB" , minHeight:'100vh'}}>
            <Box sx={{display:'flex',gap:2,mb:4,justifyContent:'center' , flexWrap:'wrap'}}>
                {categories.map(category => (
                    <Button sx={{
                        backgroundColor: selectedCategory === category.strCategory ? '#E84B7D' : 'transparent',
                        color: selectedCategory === category.strCategory ? 'white' : '#E84B7D',
                        borderColor: '#E84B7D',
                        borderRadius: '20px',
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: selectedCategory === category.strCategory ? '#E84B7D' : 'rgba(232, 75, 125, 0.1)',
                            borderColor: '#E84B7D',
                        },
                        padding: '6px 20px',
                    }}
                    type='button' 
                    key={category.idCategory}
                    variant = "outlined"
                    onClick={() => setSelectedCategory(category.strCategory)}>
                        {category.strCategory}
                    </Button>
                ))}
            </Box>
            {loading ? (
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh'}}>
                      <CircularProgress />
                </Box>
            ) : meals.length > 0 && (
            <Box sx={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center'}}>
                {meals.slice(0,showMeals).map(meal => (
                    <Box key={meal.idMeal}>
                        <MealCard meal={meal} />
                    </Box>
                ))}
            </Box> )}
        </Box>
        </>
    )
};


export default Home;