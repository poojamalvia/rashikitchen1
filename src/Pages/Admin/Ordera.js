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
import VisibilityIcon from "@mui/icons-material/Visibility";

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

function Ordera() {
  const [search, setSearch] = React.useState("");
  const [selectorder, setSelectorder] = React.useState("");

  const handleChange1 = (event) => {
    setSearch(event.target.value);
  };
  const handleChange = (event) => {
    setSelectorder(event.target.value);
    // {selectorder}
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [orderdetail, setOrderdetail] = React.useState([
    { item: "Samosa" },
    { item: "Cheese Samosa" },
    { item: "Pani Puri" },
    { desc: "it is delecious food" },
  ]);

  const [CustOrder, setCustOrder] = React.useState([
    {
      tokenid: "1",
      datetime: "",
      custname: "pooja malvia",
      amount: "50",
      review: "3.5",
      orderstatus: "confirmed",
    },
    {
      tokenid: "2",
      custname: "Hitesh malvia",
      amount: "100",
      review: "2.5",
      orderstatus: "In Process",
    },
    {
      tokenid: "3",
      custname: "sdfsodlfsdlcdsd;l",
      amount: "250",
      review: "3",
      orderstatus: "canceled",
    },
    {
      tokenid: "4",
      custname: "Hdfgdfgvdflgm,;",
      amount: "200",
      review: "4",
      orderstatus: "In Process",
    },
    {
      tokenid: "5",
      custname: "Hitesh malvia",
      amount: "100",
      review: "5",
      orderstatus: "In Process",
    },
  ]);

  function AddStatusbtn() {
    return (
      <div>
        <button
          variant="contained"
          style={{
            backgroundColor: redcolor,
            color: "#ffffff",
            borderRadius: "5px",
            border: "none",
          }}
          onClick={handleClickOpen}
        >
          Change Status
        </button>
      </div>
    );
  }
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Customer Order Details
      </Typography>

      <Box>
        <FormControl sx={{ width: "30%", margin: "2%" }}>
          <InputLabel id="order-status-label" sx={{ color: "red" }}>
            Search Orders
          </InputLabel>
          <Select
            labelId="order-status-label"
            id="order-status-search"
            value={search}
            label="Search Orders"
            onChange={handleChange1}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "red", // Change border color here
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "red", // Change border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "red", // Change border color on focus
              },
              width: "50%",
              "&.MuiFormLabel-root": {
                color: "red !important",
              },
            }}
          >
            <MenuItem value="Placed Orders">Placed Orders</MenuItem>
            <MenuItem value="Pending Orders">Pending Orders</MenuItem>
            <MenuItem value="Confirmed Orders">Confirmed Orders</MenuItem>
            <MenuItem value="Orders In Process">Orders In Process</MenuItem>
            <MenuItem value="Delivered Orders">Delivered Orders</MenuItem>
            <MenuItem value="Canceled Orders">Canceled Orders</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="customer order table">
          <TableHead>
            <TableRow>
              <TableCell>Token Number</TableCell>
              <TableCell>Order Date/Time</TableCell>

              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>review</TableCell>
              <TableCell>Change Status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Details</TableCell>
            </TableRow>
          </TableHead>
          {CustOrder.map((val) => (
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {val.tokenid}
                </TableCell>
                <TableCell>{val.datetime}</TableCell>
                <TableCell>{val.custname}</TableCell>
                <TableCell>${val.amount}</TableCell>
                <TableCell>
                  <Rating
                    style={{ color: redcolor }}
                    precision={0.5}
                    name="read-only"
                    size="small"
                    value={val.review}
                    readOnly
                  ></Rating>
                </TableCell>

                <TableCell>
                  <AddStatusbtn />
                </TableCell>
                <TableCell>{val.orderstatus}</TableCell>
                <TableCell>
                  <IconButton
                    class="btn btn-#f57c00"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    {" "}
                    <VisibilityIcon style={{ color: redcolor }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>

      <React.Fragment>
        <Dialog
          onClose={handleClose}
          aria-labelledby="order-status-dialog-title"
          open={open}
          sx={{
            minWidth: "400px",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <DialogTitle
            id="order-status-dialog-title"
            sx={{
              m: 0,
              p: 2,
              backgroundColor: redcolor,
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            Order Status
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              "&:hover": {
                backgroundColor: "#f57c00",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent
            dividers
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Update your order status:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <InputLabel id="order-status" sx={{ color: "red" }}>Select Orders</InputLabel>
              <Select
                labelId="order-status-select-label"
                id="order-status-select"
                value={selectorder}
                label="Order Status"
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red", // Change border color here
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red", // Change border color on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red", // Change border color on focus
                  },
            
                  "&.MuiFormLabel-root": {
                    color: "red !important",
                  },
                }}
              >
                <MenuItem value={10}>Placed Orders</MenuItem>
                <MenuItem value={20}>Pending Orders</MenuItem>
                <MenuItem value={30}>Confirmed Orders</MenuItem>
                <MenuItem value={40}>Orders In Process</MenuItem>
                <MenuItem value={50}>Delivered Orders</MenuItem>
                <MenuItem value={60}>Canceled Orders</MenuItem>
              </Select>
            </Box>
          </DialogContent>

          <DialogActions sx={{ backgroundColor: redcolor }}>
            <Button
              onClick={handleClose}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#f57c00",
                },
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: redcolor, color: "#ffffff" }}
            >
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Order Details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ol class="list-group list-group-flush">
                {orderdetail.map((itm) => (
                  <li class="list-group-item">{itm.item}</li>
                ))}
              </ol>

              <div style={{ marginTop: "20px" }}>
                <h6 className="font-weight-bold">Order Description</h6>
                {orderdetail.map((itm, index) => (
                  <p key={index} style={{ color: "#666", fontSize: "14px" }}>
                    {itm.desc}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Typography></Typography>
      </div>
    </Box>
  );
}

export default Ordera;