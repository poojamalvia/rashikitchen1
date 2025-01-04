import React from "react";
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
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

let redcolor = "#FF1B1C";

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

  const [CustOrder, setCustOrder] = React.useState([
    {
      tokenid: "1",
      amount: "50",
      review: "3.5",
      orderstatus: "confirmed",
    },
    {
      tokenid: "2",
      amount: "100",
      review: "2.5",
      orderstatus: "In Process",
    },
    {
      tokenid: "3",
      amount: "250",
      review: "3",
      orderstatus: "canceled",
    },
    {
      tokenid: "4",
      amount: "200",
      review: "4",
      orderstatus: "In Process",
    },
    {
      tokenid: "5",
      amount: "100",
      review: "5",
      orderstatus: "In Process",
    },
  ]);

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
      <Typography variant="h4" align="center" gutterBottom>
        Customer Order Details
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="customer order table">
          <TableHead>
            <TableRow>
              <TableCell>Token Number</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Ordered Items</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>review</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          {CustOrder.map((val) => (
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {val.tokenid}
                </TableCell>
                <TableCell></TableCell>

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

                <TableCell>$-{val.amount}</TableCell>
                <TableCell>
                  <Rating
                    value={val.review}
                    style={{ color: redcolor }}
                    size="small"
                  ></Rating>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    style={{ borderColor: redcolor, color: redcolor }}
                  >
                    {val.orderstatus}
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
