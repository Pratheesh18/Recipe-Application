import React from "react";
import {TextField,Button,Typography,Box,Container} from '@mui/material';


const Register = () => {
    return(
      <Container maxWidth="xs">
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',mt:8}}>
            <Typography variant="h5" sx={{mb:2}}>
                Register
            </Typography>
            <form noValidate>
                <TextField label='First Name' fullWidth margin="normal" />
                <TextField label='Last Name' fullWidth margin="normal" />
                <TextField label='Email' fullWidth margin="normal" />
                <TextField label='Phone Number' fullWidth margin="normal" />
                <TextField label='Password' fullWidth margin="normal" />
                <TextField label='Confirm Password' fullWidth margin="normal" />
                <Button fullWidth variant="contained" color="primary" sx={{mt:2}}>
                    Create Account
                </Button>
            </form>
        </Box>
      </Container>
    )
};

export default Register;