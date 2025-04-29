import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { redcolor } from "../Design";
import homeimage1 from "../images/homeimage1.jpg";
import caterimg1 from "../images/cateringimg1.JPG";
import caterimg2 from "../images/cateringimg2.JPG";
import caterimg3 from "../images/cateringimg3.JPG";
import homevideo from "../images/homepagevideo.MP4";
import highlight1 from "../images/highlight1.JPG";
import highlight2 from "../images/highlight2.jpg";
import highlight3 from "../images/highlight3.JPG";
import highlight4 from "../images/highlight4.jpg";
import gulabjamun from "../images/gulabjamun.jpg";
import chole1 from "../images/chole1.jpg";
import dalbati from "../images/sliderimg7.jpg";

import "../Pages/Main.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const [currentDateTime, setCurrentDateTime] = React.useState("");
  let navigate = useNavigate();
  useEffect(() => {
    // Function to fetch current date and time
    const updateDateTime = () => {
      const date = new Date();
      // Format the date and time to the local time zone of the user's location
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: true,
      }).format(date);

      setCurrentDateTime(formattedDate);
    };
    // Set an interval to update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <div
        className="row d-flex align-items-center justify-content-center"
        style={{ margin: "5%" }}
      >
        <Box
          className="col-md-6 row align-items-start"
          sx={{
            padding: { xs: "20px", md: "40px" },
            textAlign: "center",
          }}
        >
          <h3 className="heading">Welcome to Rashi's Kitchen - Longwood</h3>
          <Typography variant="h6" sx={{ marginBottom: "20px", color: "#888" }}>
            {currentDateTime}
          </Typography>
          Rashi's Kitchen offers healthy and delicious tasting Chinese and
          Indian cuisines in Longwood, FL. Rashi's Kitchen's convenient location
          and affordable prices make our restaurant a natural choice for dine-in
          and take-out meals in the Longwood community. Established in Sept
          2024, the restaurant is known for its variety of tastes and freshest
          ingredients. Come and experience our friendly atmosphere and excellent
          service.
          <h4
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              color: "#333333",
              fontWeight: "bold",
            }}
          >
            Registration Required To Order Online!
          </h4>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
            }}
          >
            Start ordering online by clicking login above. Simply select the
            menu items you want, add them to your cart, and checkout. Your order
            will be sent to the restaurant and will be ready at the time you
            specify. It's that easy!
          </Typography>
        </Box>

        <div className="col-md-6 text-center">
          <img
            src={homeimage1}
            alt="Restuarant"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            
          </img>
        </div>
      </div>

      <div
        className="row d-flex align-items-center justify-content-center"
        style={{ margin: "5%" }}
      >
        <div className="col-md-6 text-center">
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              position: "relative",
              paddingTop: "100%", // 1:1 Aspect Ratio
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <video
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              controls
              autoPlay
              loop
              muted
            >
              <source src={homevideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <Box className="col-md-6" sx={{ padding: { xs: "20px", md: "40px" } }}>
          <h4 className="fw-bold  mb-3 menu-title">Our Menus</h4>

          <Typography
            variant="body1"
            sx={{ color: "#555", marginBottom: "10px" }}
          >
            Explore our 100% vegetarian menu, crafted with love and fresh
            ingredients. Whether you're in the mood for comforting Indian
            classics or flavorful Indo-Chinese fusion, we have something
            delicious for everyone.
          </Typography>

          <ul style={{ color: "#444", lineHeight: 1.8, paddingLeft: "20px" }}>
            <li>
              <strong>Appetizers:</strong> Veg Samosa, Paneer Pakora, Spring
              Rolls, Gobi Manchurian
            </li>
            <li>
              <strong>Indian Entrées:</strong> Paneer Butter Masala, Chana
              Masala, Baingan Bharta, Dal Tadka
            </li>
            <li>
              <strong>Chinese Entrées:</strong> Veg Hakka Noodles, Chilli Paneer
              (Dry/Gravy), Veg Fried Rice
            </li>
            <li>
              <strong>Breads & Rice:</strong> Tandoori Roti, Butter Naan, Jeera
              Rice, Vegetable Biryani
            </li>
            <li>
              <strong>Desserts & Beverages:</strong> Gulab Jamun, Rasmalai,
              Mango Lassi, Masala Chai
            </li>
          </ul>

          <Typography variant="body2" sx={{ marginTop: "15px", color: "#666" }}>
            All dishes are 100% vegetarian and made fresh to order. Vegan and
            gluten-free options available on request!
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
              navigate("/User/DiningMenu");
            }}
            sx={{
              marginTop: "20px",
              borderRadius: "8px",
              backgroundColor: redcolor,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            View Full Menu
          </Button>
        </Box>
      </div>
      <div
        className="row d-flex align-items-center justify-content-center"
        style={{ margin: "5%" }}
      >
        <Box className="col-md-6" sx={{ padding: { xs: "20px", md: "40px" } }}>
          <h4 className="fw-bold  mb-3 menu-title">Catering</h4>
          <Typography variant="h6" sx={{ color: "#333" }}>
            For All Occasions
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#555", marginBottom: "10px" }}
          >
            Make your events special with Rashi kitchen’s catering services,
            perfect for weddings, private events, and conventions. Explore our
            100% vegetarian menu, crafted with love and fresh ingredients.
            Whether you're in the mood for comforting Indian classics or
            flavorful Indo-Chinese fusion, we have something delicious for
            everyone.
          </Typography>

          <ul style={{ color: "#444", lineHeight: 1.8, paddingLeft: "20px" }}>
            <li>
              <strong>Appetizers:</strong> Veg Samosa, Paneer Pakora, Spring
              Rolls, Gobi Manchurian
            </li>
            <li>
              <strong>Indian Entrées:</strong> Paneer Butter Masala, Chana
              Masala, Baingan Bharta, Dal Tadka
            </li>
            <li>
              <strong>Chinese Entrées:</strong> Veg Hakka Noodles, Chilli Paneer
              (Dry/Gravy), Veg Fried Rice
            </li>
            <li>
              <strong>Breads & Rice:</strong> Tandoori Roti, Butter Naan, Jeera
              Rice, Vegetable Biryani
            </li>
            <li>
              <strong>Desserts & Beverages:</strong> Gulab Jamun, Rasmalai,
              Mango Lassi, Masala Chai
            </li>
          </ul>

          <Button
            variant="contained"
            onClick={() => {
              navigate("/User/CateringMenu");
            }}
            sx={{
              marginTop: "20px",
              borderRadius: "8px",
              backgroundColor: redcolor,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            View Catering Menu
          </Button>
        </Box>
        <div className="col-md-6 text-center">
          <div id="carouselExample" class="carousel slide">
            {/* style={{ width: '500px',   // You can adjust width
      height: '500px',  // You can adjust height
      overflow: 'hidden',
      margin: '0 auto'}}> */}

            <div class="carousel-inner" style={{ height: "100%" }}>
              <div class="carousel-item active" style={{ height: "100%" }}>
                <img src={caterimg1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" style={{ height: "100%" }}>
                <img src={caterimg2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" style={{ height: "100%" }}>
                <img src={caterimg3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          {/* Text & Small Images */}
          <div className="col-lg-8 mb-4">
            <div className="mb-3">
              <h4 className="fw-bold  mb-3 menu-title">Our special</h4>

              <p className="text-muted">
                Experience the essence of Rashi's kitchen with our signature
                dishes—each plate a celebration of flavor, tradition, and
                creativity. From sizzling tandoori delights to rich, aromatic
                gravies, our specials are curated to leave a lasting impression.
              </p>
            </div>

            {/* Large Banner Image */}
            <div className="mb-3 image-container">
              <img
                className="hover-zoom"
                src={dalbati}
                style={{
                  maxHeight: "300px",
                }}
              />
              <div className="image-label">Rajsthani Dal Bati</div>
            </div>

            {/* Two Small Side-by-Side Images */}
            <div className="row">
              <div className="col-md-6 mb-2 image-container">
                <img
                  className="hover-zoom"
                  src={highlight1}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="image-label">Sandwish</div>
              </div>

              <div className="col-md-6 mb-2 image-container">
                <img
                  className="hover-zoom"
                  src={highlight2}
                  style={{
                    height: "250px",
                  }}
                />
                <div className="image-label">Raj Kachori</div>
              </div>
            </div>
          </div>

          {/* Featured Vertical Images */}
          <div className="col-lg-4 d-flex flex-column gap-3">
            <div className="image-container">
              <img
                className="hover-zoom"
                src={gulabjamun}
                style={{
                  height: "300px",
                }}
              />
              <div className="image-label">Gulab Jamun</div>
            </div>
            <div className="image-container">
              <img
                className="hover-zoom"
                src={highlight3}
                style={{
                  height: "300px",
                }}
              />
              <div className="image-label">Special Thali</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
