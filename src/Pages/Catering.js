import React, { useEffect } from "react";
import Accordian from "../Components/Accordians";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Catering() {
  const AcateringCollectionRef = collection(db, "Cateringmenu");
  const [cateringdata, setCateringdata] = React.useState([]);
  const [data, setData] = React.useState({});
  let navigate = useNavigate();

  const getcateringmenudata = async () => {
    const data = await getDocs(AcateringCollectionRef);

    let mData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    let obj = {};

    mData.map((val) => {
      if (val.category in obj) {
        obj[val.category].push(val);
      } else {
        obj[val.category] = [val];
      }
    });
    setCateringdata(obj);
  };

  useEffect(() => {
    getcateringmenudata();
  },[]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set the font for the document
    doc.setFont("helvetica", "normal");

    // Add centered title "Catering Menu"
    const title = "Catering Menu";
    const pageWidth = doc.internal.pageSize.width;
    const titleWidth =
      (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; // Center the title
    doc.setFontSize(22); // Larger font size for the title
    doc.text(title, titleX, 20); // Add the title to the center of the page

    let yOffset = 30; // Start content after the title

    // Add a horizontal line under the title for separation
    doc.setLineWidth(0.5);
    doc.line(10, yOffset, pageWidth - 10, yOffset);
    yOffset += 5; // Space after the line

    // Loop through each category and its items
    Object.keys(cateringdata).forEach((val, index) => {
      // Add category name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16); // Larger font for category name
      doc.text(val, 10, yOffset); // Add the category name
      yOffset += 8; // Space after category name

      // Add the items under the category
      cateringdata[val].forEach((item, itemIndex) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const itemText = `${item.itemname}- ${
          item.desc || "No description available"
        }`;
        doc.text(itemText, 10, yOffset); // Item name and description
        yOffset += 8; // Space after each item
      });

      // Add space after each category for better readability
      yOffset += 12; // Additional space between categories
    });

    // Save the generated PDF with the name "catering_menu.pdf"
    doc.save("catering_menu.pdf");
  };

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

      {Object.keys(cateringdata).map((fld) => {
        console.log("Fld", fld);
        return (
          <>
            <Accordian
              name={fld}
              menuDetails={cateringdata[fld]}
              fld={fld}
              count={cateringdata[fld] && cateringdata[fld].length}
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
          onClick={downloadPDF}

          // Object.keys(cateringdata).map((val) => {
          //   console.log("val", val);
          //   return (
          //     <div>
          //       doc.text(val.name, 10, 20); doc.text(val.phoneno, 20, 30);
          //       {/* doc.text(val.email, 30, 40);
          //   doc.text(val.address, 40, 50); */}
          //       doc.save("menu.pdf");
          //         </div>
          //       );
          //     });
          //   }
          // }}
        >
          Download Catering Menu
        </Button>
      </div>
    </div>
  );
}

export default Catering;
