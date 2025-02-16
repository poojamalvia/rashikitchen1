import React, { useEffect } from "react";
import Accordian from "../Components/Accordians";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { db } from "../firebase-config";
import Logo from "../Rashi.png";
import backimg from "../backimg2_1.jpg";
import {redcolor} from "../Design"
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
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yOffset = 45;

    const addHeader = () => {
        doc.addImage(backimg, "JPEG", 0, 0, pageWidth, pageHeight, "", "FAST");

        // Logo
        const logoWidth = 28;
        const logoHeight = 28;
        doc.addImage(Logo, "PNG", 20, 14, logoWidth, logoHeight);

        // Title
        doc.setTextColor(178, 34, 34);
        doc.setFontSize(24);
        doc.setFont("times", "bolditalic");
        doc.text("Rashi's Kitchen Catering Menu", pageWidth / 2, 23, { align: "center" });

        // Address & Phone
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.setTextColor(139, 69, 19);
        doc.text("3260 N US Hwy 17 92 #100, Longwood, FL 32750", pageWidth / 2, 30, { align: "center" });
        doc.text("Phone: +1 (689) 207-7593", pageWidth / 2, 36, { align: "center" });

        yOffset = 45;

        // Separator Line
        doc.setDrawColor(178, 34, 34);
        doc.setLineWidth(0.5);
        doc.line(margin, yOffset, pageWidth - margin, yOffset);
        yOffset += 10;
    };

    addHeader(); // Call header once for the first page

    Object.keys(cateringdata).forEach((category) => {
        // Check if we need a new page
        if (yOffset + 20 >= pageHeight - margin) {
            doc.addPage();
            addHeader();
        }

        doc.setFont("times", "bolditalic");
        doc.setFontSize(16);
        doc.setTextColor(139, 0, 0);
        doc.text(category.toUpperCase(), pageWidth / 2, yOffset, { align: "center" });

        yOffset += 2;
        doc.setDrawColor(178, 34, 34);
        doc.setLineWidth(0.2);
        doc.line(50, yOffset, pageWidth - 50, yOffset);
        yOffset += 5;

        cateringdata[category].forEach((item) => {
            if (yOffset + 10 >= pageHeight - margin) {
                doc.addPage();
                addHeader();
            }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`• ${item.itemname} `, 23, yOffset);
            yOffset += 5;
        });

        yOffset += 8;
    });

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
            borderColor: redcolor,
            backgroundColor:redcolor,
            color: "white",
            "&:hover": {
              borderColor: "darkred", // Darker red on hover
              backgroundColor: "rgba(255, 0, 0, 0.1)", // Optional hover background
            },
          }}
          tabIndex={-1}
          startIcon={<CloudDownloadIcon />}
          onClick={downloadPDF}
        >
          Download Catering Menu
        </Button>
      </div>
    </div>
  );
}

export default Catering;
