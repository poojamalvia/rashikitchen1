import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { styled } from "@mui/system";
import {
  Drawer,
  ListItemText,
  Divider,
  ListItem,
  List,
  Badge,
  ListItemButton,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Carouselimg from "../Pages/Admin/Carouselimg";
import { Login } from "@mui/icons-material";
import Logo from "../Rashilogo.png";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useLocation } from "react-router-dom";

let redcolor = "#FF1B1C";

const isAdmin = () => {
  return window.location.pathname.toLowerCase().includes("admin");
};

function Navbar(props) {
  let location = useLocation();
  const [checkuser, setCheckuser] = React.useState(isAdmin());

  const [auth, setAuth] = React.useState(true);
  const imgCollectionRef = collection(db, "carouselimage");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(4);
  const [checkadminlogin] = React.useState(true);
  const [image, setImage] = React.useState([]);

  useEffect(() => {
    const getCarouselimage = async () => {
      const data = await getDocs(imgCollectionRef);
      setImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCarouselimage();
  }, []);

  useEffect(() => {
    setCheckuser(isAdmin());
  }, [location]);

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#FF1B1C", // Hover effect: change background color
      transform: "scale(1.1)", // Hover effect: slightly enlarge the button
    },
  }));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    navigate("/User/Login");
  };

  let navigate = useNavigate();
  return (
    <div>
      <div>
        <div style={{ margin: "7%" }}>
          <AppBar position="fixed" style={{ backgroundColor: redcolor }}>
            <Toolbar>
              {checkadminlogin ? (
                <IconButton
                  sx={{
                    mr: 2,
                    "&:hover": {
                      backgroundColor: "#FF5722",
                      transform: "scale(1.1)",
                    },
                    transition:
                      "transform 0.3s ease, background-color 0.3s ease",
                  }}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  // sx={{ mr: 2 }}
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                >
                  <MenuIcon onMouse style={{ border: "#100" }} />
                </IconButton>
              ) : (
                ""
              )}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {" "}
                <img
                  // className="rounded-circle img-fluid"
                  style={{ width: "100px", borderRadius: "10px" }}
                  src={Logo}
                ></img>
              </Typography>

              <Typography
                variant="h5"
                style={{
                  color: "white",
                  fontFamily: "open sans",
                  fontWeight: "bold",
                }}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Rashi’s Kitchen Indian Cuisine
              </Typography>

              {checkadminlogin
                ? auth && (
                    <div>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        sx={{
                          mr: 2,
                          "&:hover": {
                            backgroundColor: "#FF5722",
                            transform: "scale(1.1)",
                          },
                          transition:
                            "transform 0.3s ease, background-color 0.3s ease",
                        }}
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {checkuser ? (
                          <MenuItem
                            onClick={() => {
                              navigate("/Registration");
                            }}
                          >
                            Profile
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              navigate("/Admin/Carouselimg");
                            }}
                          >
                            Profile
                          </MenuItem>
                        )}
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                      </Menu>
                    </div>
                  )
                : ""}

              {!checkuser ? (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    mr: 2,
                    "&:hover": {
                      backgroundColor: "#FF5722",
                      transform: "scale(1.1)",
                    },
                    transition:
                      "transform 0.3s ease, background-color 0.3s ease",
                  }}
                  onClick={() => {
                    navigate("/User/Cart");
                  }}
                >
                  <Badge
                    badgeContent={cartCount} // Show the number of items in the cart
                    // color="secondary" // Red badge color
                    // dot
                    sx={{
                      ".MuiBadge-dot": {
                        backgroundColor: "purple", // Change the secondary badge color to purple
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              ) : (
                ""
              )}
            </Toolbar>
          </AppBar>
        </div>

        {!checkuser ? (
          <div
            style={{ margin: "5%" }}
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {/* Map through the images array and render each image in the carousel */}
              {image.map((val, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`} // Set the first item as active
                  data-bs-interval="2000"
                >
                  <img
                    src={val.image}
                    style={{
                      width: "20%",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                    className="d-block w-100"
                    alt={`carousel-item-${index}`}
                  />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          ""
        )}

        <React.Fragment>
          <Drawer
            anchor={"left"}
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <RenderList
              checkuser={checkuser}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </Drawer>
        </React.Fragment>
      </div>

      {/* <Login /> */}
    </div>
  );
}

const RenderList = ({ drawerOpen, setDrawerOpen, checkuser }) => {
  let anchor = "left";
  let navigate = useNavigate();

  function getIcon(val) {
    if (val == "Menu") {
      return <MenuBookIcon style={{ color: redcolor }} />;
    } else if (val == "Contact Us") {
      return <ContactPhoneIcon style={{ color: redcolor }} />;
    } else if (val == "Home") {
      return <HomeIcon style={{ color: redcolor }} />;
    } else if (val == "Catering") {
      return <LocalDiningIcon style={{ color: redcolor }} />;
    } else if (val == "Orders") {
      return <DomainVerificationIcon style={{ color: redcolor }} />;
    } else if (val == "Location & Hours") {
      return <WatchLaterIcon style={{ color: redcolor }} />;
    } else {
      return null;
    }
  }
  return (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        overflow: "hidden",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      //onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: window.innerHeight,
        }}
      >
        {!checkuser ? (
          <List>
            {[
              { name: "Home", value: "home" },
              { name: "Menu", value: "DiningMenu" },
              { name: "Catering", value: "CateringMenu" },
              { name: "Orders", value: "orders" },
              { name: "Location & Hours", value: "Locationhours" },
              { name: "Contact Us", value: "contactus" },
            ].map((val, index) => (
              <ListItem
                key={val}
                disablePadding
                onClick={() => {
                  navigate("/User/" + val.value);
                  setDrawerOpen(false);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{getIcon(val.name)}</ListItemIcon>
                  <ListItemText primary={val.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {[
              { name: "Menu", value: "DiningMenu" },
              { name: "Catering", value: "CateringMenu" },
              { name: "Orders", value: "Userorder" },
            ].map((val, index) => (
              <ListItem
                key={val}
                disablePadding
                onClick={() => {
                  navigate("/Admin/" + val.value);
                  setDrawerOpen(false);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{getIcon(val.name)}</ListItemIcon>
                  <ListItemText primary={val.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        <Divider style={{ border: "1px solid black" }} />

        <Divider style={{ border: "1px solid black" }} />
        <div
          style={{
            height: "100%",
            display: "flex",
            //   justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <List>
            <ListItem>
              <b>Rashi's kitchen Indian Cuisine</b>
            </ListItem>
            <ListItem>3260 N US Hwy 17 92 #100 Longwood, FL 32750</ListItem>
          </List>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
