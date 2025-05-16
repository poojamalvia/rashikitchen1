import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Rating from "@mui/material/Rating";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import EmailIcon from "@mui/icons-material/Email";
import { redcolor } from "../Design";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import   Divider from "@mui/material/ListItemIcon"

function Footer() {
  const [value, setValue] = React.useState(4.5);
  const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickfb = () => {
    window.open(
      'https://www.facebook.com/share/1GuGfQUntk/?mibextid=LQQJ4d".com/your-profile',
      "_blank"
    );
  };

  const handleClickmap = () => {
    window.open(
      "https://maps.app.goo.gl/3fYsxU53kd48vcty9?g_st=com.google.maps.preview.copy",
      "_blank"
    );
  };

  const handleclickinsta = () => {
    window.open(
      "https://www.instagram.com/rashikitchen23?igsh=MXc3NjdiYnp4eTFzbA==",
      "_blank"
    );
  };
  const handleClickwhats = () => {
    window.open("https://wa.me/message/U7PTJRRCHHYXP1", "_blank");
  };
  return (
    <div>
      <footer
        style={{
          borderTop: "1px solid black",
          borderTopLeftRadius: "50% 20px",
          borderTopRightRadius: "50% 20px",
          backgroundColor: redcolor,
          color: "white",
          padding: "50px",
          textAlign: "center",
        }}
      >
        {isMobile?  <div className="row">
          <div
            className="col-md-3"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            REVIEW
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Rating
                style={{ color: "#FFFFFF" }}
                name="read-only"
                value={value}
                precision={0.5}
                readOnly
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingRight: "5px",
                }}
              >
                {value}
              </div>
            </div>
            <div>
              JOIN US ON
              <div>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={handleclickinsta}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={handleClickfb}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={handleClickwhats}
                >
                  <WhatsAppIcon />
                </IconButton>{" "}
              </div>
            </div>
          </div>
           <Divider style={{ border: "1px solid white" }} />
          <div className="col-md-5" style={{ textAlign: "center" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <h5>Contact Info</h5>
              <div onClick={handleClickmap} style={{ cursor: "pointer" }}>
                {" "}
                <IconButton style={{ color: "#FFFFFF", cursor: "pointer" }}>
                  <LocationOnIcon />
                </IconButton>{" "}
                3260 N US Hwy 17 92 #100 Longwood, FL 32750
              </div>
              <div>
                <EmailIcon style={{ color: "#FFFFFF" }} />{" "}
                Rashikitchen23@gmail.com
              </div>
              <div onClick={handleClickwhats} style={{ cursor: "pointer" }}>
                <IconButton style={{ color: "#FFFFFF" }}>
                  <WhatsAppIcon />
                </IconButton>{" "}
                +1(689)207-7593
              </div>
            </div>
          </div>
           <Divider style={{ border: "1px solid white" }} />
          <div className="col-md-4">
            <h5>Opening Hours</h5>
            <br />
            <WatchLaterIcon style={{ color: "#FFFFFF" }} />
            11.00 AM - 09.00 PM, Tuesday - Sunday
          </div>
        </div>
:   <div className="row">
          <div
            className="col-md-3"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            REVIEW
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Rating
                style={{ color: "#FFFFFF" }}
                name="read-only"
                value={value}
                precision={0.5}
                readOnly
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingRight: "5px",
                }}
              >
                {value}
              </div>
            </div>
            <div>
              JOIN US ON
              <div>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={handleclickinsta}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={handleClickfb}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={handleClickwhats}
                >
                  <WhatsAppIcon />
                </IconButton>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-5" style={{ textAlign: "center" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <h5>Contact Info</h5>
              <div onClick={handleClickmap} style={{ cursor: "pointer" }}>
                {" "}
                <IconButton style={{ color: "#FFFFFF", cursor: "pointer" }}>
                  <LocationOnIcon />
                </IconButton>{" "}
                3260 N US Hwy 17 92 #100 Longwood, FL 32750
              </div>
              <div>
                <EmailIcon style={{ color: "#FFFFFF" }} />{" "}
                Rashikitchen23@gmail.com
              </div>
              <div onClick={handleClickwhats} style={{ cursor: "pointer" }}>
                <IconButton style={{ color: "#FFFFFF" }}>
                  <WhatsAppIcon />
                </IconButton>{" "}
                +1(689)207-7593
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Opening Hours</h5>
            <br />
            <WatchLaterIcon style={{ color: "#FFFFFF" }} />
            11.00 AM - 09.00 PM, Tuesday - Sunday
          </div>
        </div>
} 
            </footer>
    </div>
  );
}

export default Footer;
