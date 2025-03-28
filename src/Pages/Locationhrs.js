import React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import logo from "../images/Rashi.png";
import { background, redcolor } from "../Design";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, currentDay } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          margin: 0,
          width: "400px",
          height: "400px",
          maxWidth: "100%",
          overflow: "hidden",
          borderRadius: "12px", // Rounded corners
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)", // Soft shadow
        },
      }}
    >
      <DialogTitle
        style={{
          color: "#AF1740",
          fontWeight: "bold",
          fontSize: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Hours
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{
            color: "#AF1740", // Icon color matches the title
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <div style={{ padding: "20px", overflowY: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse", // Make sure the borders collapse together
            fontFamily: "'Roboto', sans-serif", // Clean font
          }}
        >
          <tbody>
            {[
              { day: "Monday", hours: "Closed" },
              { day: "Tuesday", hours: "11:00 AM - 9:00 PM" },
              { day: "Wednesday", hours: "11:00 AM - 9:00 PM" },
              { day: "Thursday", hours: "11:00 AM - 9:00 PM" },
              { day: "Friday", hours: "11:00 AM - 9:00 PM" },
              { day: "Saturday", hours: "11:00 AM - 9:00 PM" },
              { day: "Sunday", hours: "11:00 AM - 9:00 PM" },
            ].map((row, index) => (
              <tr
                key={index}
                style={{
                  //  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  backgroundColor:
                    row.day === currentDay
                      ? "#D6CFB4"
                      : index % 2 === 0
                      ? "#f9f9f9"
                      : "white", // Highlight current day
                }}
              >
                <td
                  style={{
                    padding: "10px",
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {row.day}
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: row.hours === "Closed" ? "#d32f2f" : "#388e3c", // Color coding for open/closed
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <b>{row.hours}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dialog>
  );
}

function Locationhrs() {
  const [currentDateTime, setCurrentDateTime] = React.useState("");

  const [currentDay, setCurrentDay] = React.useState(""); // Add state for current day

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
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
      setCurrentDay(dayOfWeek); // Save the current day
    };

    // Set an interval to update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [selectedValue, setSelectedValue] = React.useState();

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const handleClickmap = () => {
    window.open(
      "https://maps.app.goo.gl/3fYsxU53kd48vcty9?g_st=com.google.maps.preview.copy",
      "_blank"
    );
  };
  let navigate = useNavigate();

  return (
    <div style={{ margin: "5%" }}>
      <h4>Location and Hours</h4>
      <br />

      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper elevation={3} style={{ width: "25rem" }}>
          <div className="col-md-12">
            <div class="card" style={{ width: "25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: background,
                }}
              >
                <img
                  src={logo}
                  class="card-img-top"
                  style={{ width: "200px" }}
                />
              </div>
              <div class="card-body" style={{ backgroundColor: background }}>
                {/* <h5 class="card-title">Card title</h5> */}
                <p class="card-text">
                  <h4> Rashi's Kitchen - Longwood</h4>
                  <br />
                  3260 N US Hwy 17 92 #100
                  <br />
                  Longwood, FL 32750 (
                  <a
                    class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    onClick={handleClickmap}
                    href="#"
                  >
                    See on map
                  </a>
                  )<br />
                  Phone : +1(689)207-7593
                  <br />
                  <br />
                  <h6>
                    {" "}
                    Today's Hours( {currentDateTime})<br />
                    11:00 AM - 9:00 PM
                  </h6>
                  <br />
                  <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    sx={{
                      borderColor: redcolor,
                      color: redcolor,
                      "&:hover": {
                        borderColor: "darkred", // Darker red on hover
                        backgroundColor: "rgba(255, 0, 0, 0.1)", // Optional hover background
                      },
                    }}
                  >
                    View All Hours
                  </Button>
                  <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                    currentDateTime={currentDateTime}
                    currentDay={currentDay} // Pass current day to SimpleDialog
                  />
                </p>
              </div>
              <ul
                class="list-group list-group-flush"
                style={{ alignItems: "center", backgroundColor: background }}
              >
                <li
                  class="list-group-item"
                  style={{ backgroundColor: background }}
                >
                  <button
                    class="btn btn-warning"
                    style={{ backgroundColor: redcolor, color: "#FFFFFF" }}
                    onClick={() => {
                      navigate("/menu");
                    }}
                  >
                    Order From here
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Locationhrs;
