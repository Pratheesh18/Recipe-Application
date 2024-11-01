/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useEffect , useState} from 'react';
import {Dialog,DialogTitle,DialogContent,Typography,CircularProgress,Box} from '@mui/material';
import api from '../api';


const MealDetailsPopup = ({open,close,mealId}) => {
    const [mealDetails,setMealDetails] = useState(null);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if(mealId && open){
            setLoading(true);
         
            api.get(`/api/recipes/meals/details/${mealId}`,{withCredentials:true})
                 .then(response => {setMealDetails(response.data); setLoading(false)})
                 .catch(error => {
                    console.error('Error fetching meal details',error);
                    setLoading(false);
                 })
        }
    },[mealId , open]);

    return(
        <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
              <DialogTitle sx={{textAlign:'center'}}> Meal Details </DialogTitle>
              <DialogContent>
                {loading ? (
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:200}}>
                        <CircularProgress />
                    </Box>
                ) : (
                    mealDetails && (
                        <Box sx={{textAlign:'center'}}>
                            <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} style={{width:'70%',borderRadius:'8px',marginBottom:'16px'}} />
                            <Typography variant="h6"> {mealDetails.strMeal} </Typography>
                            <Typography variant='body2' color='textSecondary' sx={{mt:1}}>
                                Category : {mealDetails.strCategory}
                            </Typography>
                            <Typography variant='body2' color='textScondary' sx={{mt:1}}>
                                Area : {mealDetails.strArea}
                            </Typography>
                            <Typography variant='body1' sx={{mt:1}}>
                                Instructions : {mealDetails.strInstructions}
                            </Typography>
                        </Box>
                    )
                )}
              </DialogContent>
        </Dialog>
    )
};

export default MealDetailsPopup;