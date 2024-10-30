import { AppBar,Toolbar,Typography,Button } from "@mui/material";
import { Link} from "react-router-dom";



const NavBar = () => {
    // const location = useLocation();

    return(
       <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/home">Cook</Link>
            </Typography>
            <Button color="inherit">
                    <Link to="/home">Home</Link>
            </Button>
            <Button color="inherit">
                    <Link to="/favorites">Favorites</Link>
            </Button>
        </Toolbar>
       </AppBar>
    )
};

export default NavBar;