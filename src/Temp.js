import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import menu from "../images/menu.png";
import home from "../images/home.png";
import hotel from "../images/hotel.png";
import contact from "../images/mobile.png";


function Header() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar
      // position="static"
      position="fixed"
      sx={{ marginBottom: 2, backgroundColor: "#e6e6fa" }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="black"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { xs: "block", sm: "none" }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <Typography sx={{ padding: 2 }}>
              <Link to="/" style={{ textDecoration: "none", color: "black" ,  fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Times New Roman, serif",}}>
              <img src={home} alt="No image found" style={{ width: '40px' }} />   Home
              </Link>
            </Typography>
            <Typography sx={{ padding: 2 }}>
              <Link
                to="/Menu"
                style={{ textDecoration: "none", color: "black" ,  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "Times New Roman, serif",}}
              >
            {/* <RestaurantMenuIcon/>    */}
            <img src={menu} alt="No image found" style={{ width: '40px' }} />  Menu
             
              </Link>
            </Typography>
            <Typography sx={{ padding: 2 }}>
              <Link
                to="/About"
                style={{ textDecoration: "none", color: "black",  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "Times New Roman, serif", }}
              >
                 <img src={hotel} alt="No image found" style={{ width: '40px' }} /> About
              </Link>
            </Typography>
            <Typography sx={{ padding: 2 }}>
              <Link
                to="/Contact"
                style={{ textDecoration: "none", color: "black" ,  fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Times New Roman, serif",}}
              >
                 <img src={contact} alt="No image found" style={{ width: '40px' }} />  Contact
              </Link>
            </Typography>
          
            
          
          </Box>
        </Drawer>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
            width: "100%",
            // fontFamily: "Times New Roman, serif",
          }}
        >
          <Typography sx={{ marginRight: 5 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Times New Roman, serif",
              }}
            >
              Home
            </Link>
          </Typography>
          <Typography sx={{ marginRight: 5 }}>
            <Link
              to="/Menu"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Times New Roman, serif",
              }}
            >
              Menu
            </Link>
          </Typography>
          <Typography sx={{ marginRight: 5 }}>
            <Link
              to="/About"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Times New Roman, serif",
              }}
            >
              About
            </Link>
          </Typography>
          <Typography sx={{ marginRight: 5 }}>
            <Link
              to="/Contact"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Times New Roman, serif",
              }}
            >
              Contact
            </Link>
          </Typography>
        </Box>

        
      </Toolbar>
    </AppBar>
  );
}

export default Header;