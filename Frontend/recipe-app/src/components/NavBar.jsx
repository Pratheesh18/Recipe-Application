import { AppBar,Toolbar,Box,Button} from "@mui/material";
import { Link , useNavigate} from "react-router-dom";



const NavBar = () => {
    // const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    return(
       <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
            <Box sx={{flexGrow:1,display:'flex',justifyContent:'center'}}>
            <Button color="inherit">
                    <Link to="/home">Home</Link>
            </Button>
            <Button color="inherit">
                    <Link to="/favorites">Favorites</Link>
            </Button>
            <Button color="inherit" onClick={logout}> Logout </Button>
            </Box>
        </Toolbar>
       </AppBar>
    )
};

export default NavBar;