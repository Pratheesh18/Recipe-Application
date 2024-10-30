import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { TextField , Button,Typography,Box,Container,Paper } from "@mui/material";
import api from "../api";
import {Link , useNavigate} from 'react-router-dom';


const loginFormValidation = Yup.object().shape({
    email : Yup.string().email('Invalida email format').required('Email is required'),
    password : Yup.string().required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const {register , handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(loginFormValidation)});

    const onSubmit = async (data) => {
        try{
            const response = await api.post('/auth/login',{
                email : data.email,
                password : data.password,
            });
            localStorage.setItem('token',response.data.token);
            navigate('/home');
            console.log(response.data);
        }catch(error){
            console.error('Login error',error.response?.data);
        }
    };

    return(
        <Box sx={{backgroundColor:'#EADFDB',minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{p:{xs:2,sm:4},borderRadius:2,boxShadow:'0 4px 10px rgba(0,0,0,0.1)',maxWidth:500,mx:'auto'}}>
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <Typography variant="h5" component="h1" sx={{mb:2}}>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Box sx={{mb:2}}>
                                <TextField label="Email" fullWidth {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
                            </Box>
                            <Box sx={{mb:2}}>
                                <TextField label="Password" type="password" fullWidth {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
                            </Box>
                            <Button type="submit" fullWidth variant="contained" sx={{mt:3,backgroundColor:'#E84B7D'}}>
                                SIGN IN
                            </Button>
                        </form>
                        <Typography variant="body2">
                            Dont have an account ? <Link to="/register"> Create an account </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
};

export default Login;