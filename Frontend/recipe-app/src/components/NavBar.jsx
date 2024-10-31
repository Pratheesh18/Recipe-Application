import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully", { position: "bottom-right" });
    navigate("/");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box
          sx={{ flexGrow:1,flexWrap:'wrap', display: "flex", justifyContent: "space-evenly" }}
        >
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none" , color:'black'}}
              to="/home"
            >
              HOME
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none",color:'black'}}
              to="/favorites"
            >
              FAVORITE
            </Link>
          </Button>
          <IconButton onClick={logout}>
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
