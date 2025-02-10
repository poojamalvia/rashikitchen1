import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import { redcolor ,background} from "../Design";

function Contact() {
  let navigate = useNavigate();

  const handleClickfb = () => {
    window.open(
      'https://www.facebook.com/share/1GuGfQUntk/?mibextid=LQQJ4d".com/your-profile',
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
  const handleClickmap = () => {
    window.open(
      "https://maps.app.goo.gl/3fYsxU53kd48vcty9?g_st=com.google.maps.preview.copy",
      "_blank"
    );
  };
  return (
    <div style={{ margin: "5%" }}>
      <center>
        <Box
          style={{ width: "50%", align: "center", minWidth: "400px" }}
          component="section"
          sx={{ p: 2 }}
        >
          {" "}
          <h3>
            <b> Contact Rashi's Kitchen - Longwood</b>{" "}
          </h3>
          <br />
          If you would like to contact Rashi's Kitchen - Longwood, such as to
          ask questions about our menu, service, or other non-technical issues,
          please contact us using the information below. Thanks, and we
          appreciate your feedback!
        </Box>
      </center>

      <center>
        <Box
          style={{ width: "50%", align: "center", minWidth: "400px" ,backgroundColor:background}}
          component="section"
          sx={{ p: 1, border: "1px solid grey" }}
        >
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-7">
              <h3>Rashi's Kitchen - Longwood</h3>
            </div>
            <div className="col-md-3">
              <IconButton
                style={{ color: "#B80000" }}
                onClick={handleclickinsta}
                // component="a" href="https://www.instagram.com/rashikitchen23?igsh=MXc3NjdiYnp4eTFzbA=="
              >
                <InstagramIcon />
              </IconButton>
              <IconButton style={{ color: "#3D3BF3" }} onClick={handleClickfb}>
                <FacebookIcon />
              </IconButton>
              <IconButton
                style={{ color: "#06D001" }}
                onClick={handleClickwhats}
              >
                <WhatsAppIcon />
              </IconButton>
            </div>
          </div>
          <br />
          3260 N US Hwy 17 92 #100
          <br /> Longwood, FL 32750 (
          <a
            class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            onClick={handleClickmap}
            href="#"
          >
            See on map
          </a>
          )
          <br />
          Phone : +1(689)207-7593 <br />
          <br />
          Rashikitchen23@gmail.com
        </Box>
        <br />
        <Alert
          variant="outlined"
          severity="warning"
          style={{ width: "50%", align: "center", minWidth:"400px", backgroundColor: "#FFF7D1" }}
        >
          Note: If you need to make a change to your order, please call us
          directly as we may not see your email in time!
        </Alert>
      </center>
    </div>
  );
}

export default Contact;
