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
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import "../Pages/Main.css";
import Tabs from "@mui/material/Tabs";
import sliderimg1 from "../images/sliderimg1.jpg";
import sliderimg2 from "../images/sliderimg2.jpg";
import sliderimg3 from "../images/sliderimg3.jpg";
import sliderimg4 from "../images/sliderimg4.jpg";
import sliderimg5 from "../images/sliderimg5.jpg";
import sliderimg6 from "../images/sliderimg6.jpg";
import sliderimg7 from "../images/sliderimg7.jpg";
import sliderimg8 from "../images/sliderimg8.jpg";
import panipuri from "../images/panipuri.jpg";
import chole from "../images/chole.JPG";

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

import Logo from "../images/Rashi.png";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useLocation } from "react-router-dom";
import { redcolor } from "../Design";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.jpg";
import pic3 from "../images/pic3.jpg";
import pic4 from "../images/pic4.jpg";
import logo1 from "../images/Rashilogo.png";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const isAdmin = () => {
  return window.location.pathname.toLowerCase().includes("admin");
};

function Navbar(props) {
  let location = useLocation();
  const theme = useTheme();
  const [checkadmin, setCheckadmin] = React.useState(isAdmin());
  const [opendrawer, setOpendrawer] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [auth, setAuth] = React.useState(true);
  const imgCollectionRef = collection(db, "carouselimage");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(4);
  const [checkadminlogin] = React.useState(true);
  const [image, setImage] = React.useState([]);
  let isAuthenticated = !!localStorage.getItem("token");

  const uid = localStorage.getItem("uid");

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    const getCarouselimage = async () => {
      const data = await getDocs(imgCollectionRef);
      setImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getTotalCount = async () => {
      try {
        const userRef = doc(db, "Userdetails", uid); // Replace with dynamic user ID if necessary
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setCartCount(userDoc.data().totalcount || 0); // Update cart count state
        }
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };
    getCarouselimage();
    getTotalCount();
  }, [cartCount]);

  useEffect(() => {
    setCheckadmin(isAdmin());
  }, [location]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarStyle = {
    width: { xs: 60, sm: 100, md: 130 },
  height: { xs: 60, sm: 100, md: 130 },

    borderRadius: "50%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    border: "3px solid #ddd",
  };

  let navigate = useNavigate();
  return (
    <div>
      <div>
        {isMobile ? (
          <div>
            <AppBar
              position="fixed"
              style={{
                backgroundColor: redcolor,
              }}
            >
              <Toolbar>
                {checkadminlogin ? (
                  <IconButton
                    sx={{
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "#FF1B1C",
                        transform: "scale(1.1)",
                      },
                      transition:
                        "transform 0.3s ease, background-color 0.3s ease",

                      //  display: { xs: "block", sm: "none" }
                    }}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => {
                      setDrawerOpen(true);
                    }}
                  >
                    <MenuIcon onMouse style={{ border: "#100" }} />
                  </IconButton>
                ) : (
                  ""
                )}
                <img
                  src={logo1} // Replace with your actual logo path or import
                  alt="Rashi's Kitchen Logo"
                  style={{
                    height: 40,
                    marginRight: 10,
                    borderRadius: "12px", // curved corners
                  }}
                />
                {/* <Typography
                  variant="h5"
                  //  className="dancing-script"
                  style={{
                    color: "white",
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: "bold",
                  }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Rashi’s Kitchen Indian Cuisine
                </Typography> */}


<Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                {isAuthenticated && checkadminlogin ? (
                  auth && (
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
                            backgroundColor: "#FF1B1C",
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
                        {checkadmin ? (
                          <MenuItem
                            onClick={() => {
                              navigate("/Admin/Carouselimg");
                            }}
                          >
                            Profile
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              navigate("/User/Registration");
                            }}
                          >
                            Profile
                          </MenuItem>
                        )}
                        <MenuItem
                          onClick={() => {
                            navigate("/User/login");
                            localStorage.removeItem("token");
                            localStorage.removeItem("uid");
                            handleClose();
                          }}
                        >
                          Log Out
                        </MenuItem>
                      </Menu>
                    </div>
                  )
                ) : (
                  <button
                    type="button"
                    style={{ color: "#ffffff", whiteSpace: "nowrap" }}
                    className="btn"
                    onClick={() => navigate("/User/login")}
                  >
                    Log In
                  </button>
                )}

                {isAuthenticated && !checkadmin ? (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "#FF1B1C", // A nice "Slate Blue" color
                        color: "#FFFFFF", // Icon turns white on hover
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
                </Box>
              </Toolbar>
            </AppBar>
          </div>
        ) : (
          <div style={{ margin: "4%" }}>
            <AppBar position="fixed" style={{ backgroundColor: "#ffffff" }}>
              <Toolbar>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {checkadmin ? (
                    <Tabs>
                      <Box sx={{ width: "50px" }}></Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        {" "}
                        <img
                          // className="rounded-circle img-fluid"
                          style={{ width: "100px", borderRadius: "10px" }}
                          src={Logo}
                        ></img>
                      </Typography>

                      <Box sx={{ width: "50px" }}></Box>
                      <Tab
                        label="Dining Menu"
                        {...a11yProps(3)}
                        style={{ textTransform: "unset" }}
                        sx={{
                          color: redcolor,
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#ffffff", // Replace with your desired hover color
                          },
                        }}
                        onClick={() => {
                          navigate("/Admin/DiningMenu");
                        }}
                      />
                      <Tab
                        label="Catering Menu"
                        {...a11yProps(4)}
                        style={{ color: redcolor, textTransform: "unset" }}
                        sx={{ fontSize: "1.2rem" }}
                        onClick={() => {
                          navigate("/Admin/CateringMenu");
                        }}
                      />
                      <Tab
                        label="Orders"
                        {...a11yProps(5)}
                        style={{ color: redcolor, textTransform: "unset" }}
                        sx={{ fontSize: "1.2rem" }}
                        onClick={() => {
                          navigate("/Admin/UserOrder");
                        }}
                      />
                    </Tabs>
                  ) : (
                    <Tabs>
                      <Tab
                        label="Home"
                        {...a11yProps(0)}
                        sx={{
                          color: redcolor,
                          textTransform: "unset",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                        onClick={() => {
                          navigate("/User/home");
                        }}
                      />
                      <Tab
                        label="Menu"
                        {...a11yProps(1)}
                        sx={{
                          color: redcolor,
                          textTransform: "unset",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                        onClick={() => {
                          navigate("/User/DiningMenu");
                        }}
                      />
                      <Tab
                        label="Catering"
                        {...a11yProps(2)}
                        sx={{
                          color: redcolor,
                          textTransform: "unset",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                        onClick={() => {
                          navigate("/User/CateringMenu");
                        }}
                      />
                      <Box sx={{ width: "50px" }}></Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        {" "}
                        <img
                          // className="rounded-circle img-fluid"
                          style={{ width: "100px", borderRadius: "10px" }}
                          src={Logo}
                        ></img>
                      </Typography>

                      <Box sx={{ width: "50px" }}></Box>
                      <Tab
                        label="Orders"
                        {...a11yProps(3)}
                        sx={{
                          color: redcolor,
                          textTransform: "unset",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                        onClick={() => {
                          navigate("/User/orders");
                        }}
                      />
                      <Tab
                        label="Location & Hours"
                        {...a11yProps(4)}
                        sx={{
                          color: redcolor,
                          textTransform: "unset",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                        onClick={() => {
                          navigate("/User/Locationhours");
                        }}
                      />
                      <Tab
                        label="Contact Us"
                        {...a11yProps(5)}
                        sx={{
                          color: redcolor,
                          textTransform: "unset",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "#333",
                          },
                        }}
                        onClick={() => {
                          navigate("/User/contactus");
                        }}
                      />
                    </Tabs>
                  )}
                </Box>

                {isAuthenticated ? (
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color={redcolor}
                      sx={{
                        mr: 2,
                        "&:hover": {
                          backgroundColor: redcolor,
                          color: "#FFFFFF",
                          transform: "scale(1.1)",
                        },
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease",
                      }}
                    >
                      <AccountCircle
                        sx={{
                          color: redcolor,
                          "&:hover": { color: "#FFFFFF" },
                        }}
                      />
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          navigate(
                            checkadmin
                              ? "/Admin/Carouselimg"
                              : "/User/Registration"
                          );
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/User/login");
                          localStorage.removeItem("token");
                          handleClose();
                        }}
                      >
                        Log Out
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <button
                    type="button"
                    style={{ color: redcolor }}
                    class="btn btn-light"
                    onClick={() => navigate("/User/login")}
                  >
                    Log In
                  </button>
                )}

                {/* ShoppingCart button */}

                {isAuthenticated && !checkadmin && (
                  <IconButton
                    size="large"
                    edge="start"
                    color={redcolor}
                    aria-label="menu"
                    sx={{
                      mr: 2,
                      "&:hover": {
                        backgroundColor: redcolor,
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
                      badgeContent={cartCount}
                      sx={{
                        ".MuiBadge-dot": {
                          backgroundColor: "purple",
                        },
                      }}
                    >
                      <ShoppingCartIcon
                        sx={{
                          color: redcolor,
                          "&:hover": { color: "#FFFFFF" },
                        }}
                      />
                    </Badge>
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>
          </div>
        )}

        {/* {checkadminlogin
                  ?
                   auth && (
                      <div>
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color={redcolor}
                          sx={{
                            mr: 2,
                            "&:hover": {
                              backgroundColor: redcolor,
                              transform: "scale(1.1)",
                            },
                            transition:
                              "transform 0.3s ease, background-color 0.3s ease",
                          }}
                        >
                          <AccountCircle sx={{ color: redcolor }} />
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
                          {checkadmin ? (
                            <MenuItem
                              onClick={() => {
                                navigate("/Admin/Carouselimg");
                              }}
                            >
                              Profile
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={() => {
                                navigate("/User/Registration");
                              }}
                            >
                              Profile
                            </MenuItem>
                          )}
                          <MenuItem
                            onClick={() => {
                              navigate("/User/login");
                              localStorage.removeItem("token")
                              handleClose();
                            }}
                          >
                            Log Out
                          </MenuItem>
                        </Menu>
                      </div>
                    )
                  : ""} */}

        {/* carousel images */}
        {!checkadmin ? (
          <div
            // style={{ marg }}
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <img
                  src={sliderimg1}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 1"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg2}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 2"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg3}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 3"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg4}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 4"
                />
              </div>

              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg5}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 5"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg6}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 6"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg7}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 7"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={panipuri}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 9"
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src={sliderimg8}
                  className="d-block w-100"
                  style={{
                    maxHeight: "550px",
                    objectFit: "fill",
                  }}
                  alt="slide 8"
                />
              </div>

              {/* Map through the images array and render each image in the carousel */}
              {/* {image.map((val, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`} // Set the first item as active
                  data-bs-interval="2000"
                >
                  <img
                    src={val.image}
                    style={{
                      width: "100%", // Make sure the image takes full width
                      height: "100%", // Make the image take full height of the container
                      //  objectFit: "cover", // Ensure the image covers the container while maintaining aspect ratio
                      //  maxHeight: "500px", // Set max height to avoid stretching too much
                      //  width: "100%",
                      maxHeight: "550px",
                      objectFit: "fill",
                    }}
                    className="d-block w-100"
                    alt={`carousel-item-${index}`}
                  />
                </div>
              ))} */}
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

        {/* avtar images */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "-70px",
            flexWrap: "wrap",
          }}
        >
          <Avatar src={pic1} sx={avatarStyle} className="avatar-hover" />
          <Avatar src={pic2} sx={avatarStyle} className="avatar-hover" />
          <Avatar src={pic3} sx={avatarStyle} className="avatar-hover" />
          <Avatar src={pic4} sx={avatarStyle} className="avatar-hover" />
        </div>

        <Drawer
          anchor={"left"}
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
          //  sx={{ display: { xs: "block", sm: "none" },}}
        >
          <RenderList checkadmin={checkadmin} setDrawerOpen={setDrawerOpen} />
        </Drawer>
      </div>

      {/* <Login /> */}
    </div>
  );
}

const RenderList = ({ setDrawerOpen, checkadmin }) => {
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
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: window.innerHeight,
        }}
      >
        {!checkadmin ? (
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
