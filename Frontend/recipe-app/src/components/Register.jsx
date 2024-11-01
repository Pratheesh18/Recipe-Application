import { useState } from 'react';
import {TextField,Button,Typography,Box,Container, Paper , IconButton , CircularProgress} from '@mui/material';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import api from "../api";
import { Link } from 'react-router-dom';
import {Visibility , VisibilityOff} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const formValidation = Yup.object().shape({
    firstName : Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email : Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber : Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10,'Phone number must be at leats 10 digits').required('Phone number is required'),
    password : Yup.string().min(6,'Password must be at least 6 characters').required('Password is required'),
    confirmPassword : Yup.string().oneOf([Yup.ref('password'),null],'Passwords must match').required('Confirm Password is required'),               
});

const Register = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [loading,setLoading] = useState(false);
    const {register , handleSubmit , formState:{errors}} = useForm({resolver:yupResolver(formValidation)});
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try{
            const res = await api.post('/api/auth/register',{
                firstName : data.firstName,
                lastName : data.lastName,
                email : data.email,
                phoneNumber : data.phoneNumber,
                password : data.password,
            });
            navigate('/');
            toast.success('Registration Successful',{position:'bottom-right'});
        }catch(error){
            console.error('Registration error',error);
            toast.error('Error in Registration',{position:'bottom-right'});
        }finally{
            setLoading(false)
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return(
        <Box
            sx={{
                backgroundColor: '#EADFDB', 
                minHeight: '100vh',         
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
       <Container maxWidth="sm">
        <Paper elevation={3} sx={{p:{xs:2,sm:4},mt:3,borderRadius:2,boxShadow:'0 4px 10px rgba(0,0,0,0.1)',maxWidth:500,mx:'auto'}}>
            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography variant="h5" component="h1" sx={{mb:2}}>
                    REGISTER
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                            }}
                        >
                            <Box sx={{ flex: '1 1 45%' }}>
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    {...register('firstName')}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    {...register('lastName')}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    {...register('email')}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    {...register('phoneNumber')}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <TextField
                                    label="Password"
                                    type= {showPassword ? 'text' : 'password'}
                                    fullWidth
                                    {...register('password')}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps = {{
                                        endAdornment:(
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <TextField
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    fullWidth
                                    {...register('confirmPassword')}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    InputProps = {{
                                        endAdornment:(
                                            <IconButton
                                                       onClick={handleClickShowConfirmPassword}
                                                       edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 , backgroundColor:'#E84B7D' }} disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}
                         >
                            {loading ? "CREATING.." : "CREATE AN ACCOUNT"}
                        </Button>
                    </form>
                    <Typography variant="body2" color="textSecondary" sx={{mt:2}}>
                        Already have an account ? <Link style={{textDecoration:'none'}} to="/"> Login </Link>
                    </Typography>
            </Box>
        </Paper>
       </Container>
       </Box>
    )
};

export default Register;
