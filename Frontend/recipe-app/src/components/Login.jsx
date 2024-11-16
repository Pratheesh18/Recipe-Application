import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Visibility , VisibilityOff } from "@mui/icons-material";
import api , {setAccessToken} from "../api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const loginFormValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      const  {accessToken,refreshToken} = response.data;
      setAccessToken(accessToken);
      localStorage.setItem("refreshToken",refreshToken);
      toast.success("Login Successful",{position:"bottom-right"});
      navigate('/home');
    } catch (error) {
      console.error("Login error", error.response?.data);
      toast.error('Error ! Failed to Login',{position:'bottom-right'});
    }finally{
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EADFDB",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
              LOGIN
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps = {{
                    endAdornment:(
                        <IconButton
                                  onClick={handleShowPassword}
                                  edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    )
                  }}

                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, backgroundColor: "#E84B7D" }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20}  /> : null}
              >
                 {loading  ? "SIGNING IN.." : "SIGN IN"}
              </Button>
            </form>
            <Typography variant="body2" sx={{mt:2}}>
              Dont have an account ?{" "}
              <Link style={{textDecoration:'none'}} to="/register"> Create an account </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
