import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { background } from "../Design";
import backimage from "../images/backimage.jpg"
import '../Pages/Main.css'
function Homepage() {

  const [currentDateTime, setCurrentDateTime] = React.useState("");

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

  
  return (
    <div className="row d-flex align-items-center justify-content-center"  style={{margin:"5%"}}>
    <Box className="col-md-6"
      sx={{
        backgroundColor: background,
        borderRadius: "10px",
        boxShadow: 3,
        padding: { xs: "20px", md: "40px" },
        textAlign: "center",
      }}
    >

      <Typography
        variant="h4"
        component="h1"
      //  className="dancing-script"
         sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}
      >
        Welcome to Rashi's Kitchen - Longwood
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#888" }}>
        {currentDateTime}
      </Typography>

      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ color: "#333" }}>
          Rashi's Kitchen offers healthy and delicious tasting Chinese and
          Indian cuisines in Longwood, FL. Rashi's Kitchen's convenient location
          and affordable prices make our restaurant a natural choice for dine-in
          and take-out meals in the Longwood community. Established in Sept
          2024, the restaurant is known for its variety of tastes and freshest
          ingredients. Come and experience our friendly atmosphere and excellent
          service.
        </Typography>
      </Box>

      <Typography
        variant="h5"
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Registration Required To Order Online!
      </Typography>

      <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
        Start ordering online by clicking login above. Simply select the menu
        items you want, add them to your cart, and checkout. Your order will be
        sent to the restaurant and will be ready at the time you specify. It's
        that easy!
      </Typography>

    

      {/* Add additional elements if needed */}
    </Box>

    <div className="col-md-6 text-center">
     <img src={backimage} style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", marginBottom: "10px" }} ></img>
        abc
      </div>
    
  </div>
  );
}

export default Homepage;
