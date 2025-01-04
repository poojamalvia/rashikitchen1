import React from "react";
import Accordian from "../Components/Accordians";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import Typography from "@mui/material/Typography";


function Catering() {
  const [cmenu, setCmenu] = React.useState({
    Appetizer: [
      {
        name: "Veg Manchurian dry and gravy",
        desc: "It is delicious product made with milk and palm sugar decorated with cashews and almonds",
        availy: "no",
      },
      { name: "Gobi Manchurian", desc: "cc",
        availy: "no",
       },
      { name: "Chilli Paneer,dry and gravy" },
      { name: "Crispy vegetable" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Drink: [
      { name: "Veg Manchurian dry and gravy", availy: "no" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Paneer_ke_pakwan: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Sabz_e_bahar: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Yogurts: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],

    Scent_of_Rice: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Dal_ranga_rang: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Special_food: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Breads_delight: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Sweet_dessert: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Healthy_salad: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
    Tangy_pickels: [
      { name: "Veg Manchurian dry and gravy" },
      { name: "Gobi Manchurian" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
      { name: "Samosa" },
    ],
  });

  return (
    <div style={{ margin: "3%" }}>
      <Typography
        variant="h4"
        style={{
          color: "",
          fontFamily: "open sans",
          fontWeight: "bold",
        }}
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Catering Menu
      </Typography>

      {Object.keys(cmenu).map((fld) => {
        console.log("Fld", fld);
        return (
          <>
            <Accordian
              name={fld}
              menuDetails={cmenu[fld]}
              fld={fld}
              count={cmenu[fld] && cmenu[fld].length}
              isAdd={false}
            />
          </>
        );
      })}
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          sx={{
            borderColor: "red",
            color: "red",
            "&:hover": {
              borderColor: "darkred", // Darker red on hover
              backgroundColor: "rgba(255, 0, 0, 0.1)", // Optional hover background
            },
          }}
          tabIndex={-1}
          startIcon={<CloudDownloadIcon />}
          onClick={() => {
            {
              Object.keys(cmenu).map((val) => {
                console.log("val", val);
                return (
                  <div>
                    doc.text(val.name, 10, 20); doc.text(val.phoneno, 20, 30);
                    {/* doc.text(val.email, 30, 40);
                doc.text(val.address, 40, 50); */}
                    doc.save("menu.pdf");
                  </div>
                );
              });
            }
          }}
        >
          Download Catering Menu
        </Button>
      </div>
    </div>
  );
}

export default Catering;
