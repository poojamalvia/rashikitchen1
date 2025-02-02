import React, { useEffect } from "react";
import Accordian from "../Components/Accordians";
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
const AdiningCollectionRef = collection(db, "Diningmenu");

function Menu() {
  const [diningdata, setDiningdata] = React.useState([]);
  let navigate = useNavigate();

  const getdiningmenudata = async () => {
    const data = await getDocs(AdiningCollectionRef);

    let mData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    let obj = {};

    mData.map((val) => {
      if (val.category in obj) {
        obj[val.category].push(val);
      } else {
        obj[val.category] = [val];
      }
    });
    setDiningdata(obj);
  };

  useEffect(() => {
    getdiningmenudata();
  }, []);
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
        {" "}
        Menu
      </Typography>

      {Object.keys(diningdata).map((fld) => {
        return (
          <>
            <Accordian
              name={fld}
              menuDetails={diningdata[fld]}
              fld={fld}
              count={diningdata[fld].length}
              isAdd={true}
            />
          </>
        );
      })}
    </div>
  );
}

export default React.memo(Menu);
