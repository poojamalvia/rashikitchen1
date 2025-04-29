import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CommentIcon from "@mui/icons-material/Comment";

import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  Typography,
  TextField,
} from "@mui/material";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

import { redcolor } from "../Design";
import { db } from "../firebase-config";
import firebase from "firebase/compat/app";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const longText = `
item1 : Manchurian     -$15,  
item2 : Panner Tikka   -$12,
item3 : Crispy veg     -$20,


`;

function Order() {
  const [age, setAge] = React.useState("");
  const [CustOrder, setCustOrder] = React.useState([]);
  const orderRef = collection(db, "Userorders");

  const getuserorder = async () => {
    const data = await getDocs(orderRef);
    setCustOrder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getuserorder();
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 
  const [item, setItem] = React.useState([
    { name: "Manchurian" },
    { name: "Paneer Chily" },
    { name: "crispy Veg" },
  ]);

  function AddStatusbtn() {
    return (
      <div>
        <Button variant="contained">Order In Process</Button>
      </div>
    );
  }
  return (
    <Box>
      <h3 className="heading"> Customer Order Records
      </h3>

      <TableContainer component={Paper}>
        <Table
          aria-label="customer order table"
         
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: redcolor, // Background color for the header
                "& th": {
                  fontWeight: "bold", // Bold font weight for header cells
                  fontSize: "16px",
                  color: "#ffffff",
                },
              }}
            >
              <TableCell>Token Number</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Ordered Items</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>review</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell></TableCell>

              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          {CustOrder.map((val) => (
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {val.tokenno}
                </TableCell>
                <TableCell>{val.timestamp}</TableCell>

                <TableCell>
                  <>
                    <Tooltip
                      title={item
                        .map((i) => {
                          return i.name;
                        })
                        .join(", ")}
                      sx={{ color: "red" }}
                    >
                      <label>
                        {item
                          .map((i) => {
                            return i.name;
                          })
                          .join(", ").length > 10
                          ? item
                              .map((i) => {
                                return i.name;
                              })
                              .join(", ")
                              .substring(0, 15) + "..."
                          : item
                              .map((i) => {
                                return i.name;
                              })
                              .join(", ")}
                      </label>
                    </Tooltip>
                  </>
                </TableCell>

                <TableCell>${val.totalAmount}</TableCell>

                <TableCell>
                  <Rating
                    value={val.review}
                    style={{ color: redcolor }}
                    size="small"
                  ></Rating>
                </TableCell>
                <TableCell>
                  <TextField fullWidth type="text"></TextField>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <CommentIcon style={{ color: redcolor }} />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    style={{ borderColor: redcolor, color: redcolor }}
                  >
                    {val.status}
                  </Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Order;
