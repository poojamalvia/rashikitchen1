import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

function Homepage() {
  const [loc, setLoc] = React.useState("Ahmedabad");
  const [data, setData] = React.useState();
  // const [isloading, setIsloading] = React.useState(false)

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

  // useEffect(() => {
  //   axios
  //     .get(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${loc}`)
  //     .then((res) => {
  //       //  setIsloading(false)
  //       console.log("response", res.data.location);
  //       setData(res.data.location);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // });

  return (
    <Box
      sx={{
        margin: "5%",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: 3,
        padding: { xs: "20px", md: "40px" },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
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
    // <div style={{margin:"5%"}}>
    //   <center>
    //     <Box
    //       style={{ width: "50%", align: "center" }}
    //       component="section"
    //       sx={{ p: 1 }}
    //     >
    //       <h2> Welcome to Rashi's Kitchen - Longwood</h2> <br />
    //       <h4> {currentDateTime} </h4>
    //       {/* {data && data.name ? (
    //         <div>

    //           <Typography variant="body2">{data.localtime}</Typography>
    //         </div>
    //       ) : null} */}
    //       <br />
    //       Rashi's Kitchen offers healthy and delicious tasting Chinese and
    //       Indian cuisines in Longwood,FL. Rashi's Kitchen's convenient location
    //       and affordable prices make our restaurant a natural choice for dine-in
    //       and take-out meals in the Longwood community. Established in
    //       Sept,2024, Restaurant is known for its variety of tastes and freshest
    //       ingredients. Come and experience our friendly atmosphere and excellent
    //       service.
    //       <br />
    //       <br />
    //       <h2> Registration Required To Order Online!</h2>
    //       <br />
    //       Start ordering online by clicking login Above. Simply select the menu
    //       items you want, add them to your cart, and checkout. Your order will
    //       be sent to the restaurant and will be ready at the time you specify.
    //       It's that easy!
    //     </Box>
    //   </center>
    // </div>
  );
}

export default Homepage;
