import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import { redcolor, fontcolor } from "../Design";
import { db } from "../firebase-config";
import useCart from "../useCart";
import {
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  deleteField,
  doc,
  updateDoc,
  getDocs,
  arrayUnion,
} from "firebase/firestore";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(3),
    fontSize: "1.5rem",
    fontWeight: 600,
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  "& .MuiButtonGroup-root": {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(1),
  },
}));

const uid = localStorage.getItem("uid");
const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "none",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

function Cart({}) {
  const [cartdetails, setCartdetails] = React.useState([]);
  const [Subtotal, setSubtotal] = React.useState(0);
  const [finalamt, setFinalamt] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [update, doUpdate] = React.useState(true);
  const [tempcart, setTempcart] = React.useState({});
  const [currentDateTime, setCurrentDateTime] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [tip, setTip] = React.useState((0.0).toFixed(2));
  const userRef = doc(db, "Userdetails", uid);
  const orderRef = collection(db, "Userorders");
  //const { total, items, handleItemsChange } = useCart();

  const getusercartdetails = async () => {
    try {
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data()); // Log to inspect the structure
        const cartData = docSnap.data().cart;

        // setSubtotal(docSnap.data().totalamt || 0); // Get the existing total amount
        if (cartData) {
          setCartdetails(cartData); // Set the cart data in state
          const calculatedSubtotal = cartData.reduce(
            (acc, item) => acc + item.amt,
            0
          );
          setSubtotal(calculatedSubtotal); // Update subtotal state
        } else {
          console.log("No cart data found.");
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleAddclick = (data) => {
    const updatedData = {
      itemname: data.itemname,
      price: data.price,
      category: data.category, // If category is part of the item
      desc: data.desc,
      image: data.image,
      total: data.total, // Assuming this holds the total amount or quantity of the item
    };

    createAddtocart(updatedData); // Add item to Firebase
    doUpdate(!update);
  };

  const createAddtocart = async (data) => {
    try {
      // Get the current cart data to find if the item already exists
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const currentCart = userDoc.data().cart || [];

        // Check if the item already exists in the cart for the same itemname and category
        const itemIndex = currentCart.findIndex(
          (item) =>
            item.itemname === data.itemname && item.category === data.category
        );

        if (itemIndex !== -1) {
          // If item exists, update the total
          const updatedCart = [...currentCart];
          updatedCart[itemIndex].total += data.total; // Increment the total quantity for the item
          updatedCart[itemIndex].amt = data.amt;

          // Update the cart array with the new total for the item
          await updateDoc(userRef, {
            cart: updatedCart,
          });
        } else {
          const newCart = [
            ...currentCart,
            {
              itemname: data.itemname,
              price: data.price,
              category: data.category,
              desc: data.desc,
              image: data.image,
              total: data.total,
              amt: data.amt,
            },
          ];

          // Update Firestore with the new cart and total amount
          await updateDoc(userRef, {
            cart: newCart,
          });
        }
      }
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  };

  const updateDatetime = () => {
    const date = new Date();
    const formatedatetime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    setCurrentDateTime(formatedatetime);
    const intervalId = setInterval(updateDatetime, 1000);
    return () => clearInterval(intervalId);
  };
  const handleOrderAddclick = async () => {
    const orderData = {
      totalAmount: finalamt,
      status: "pending",
      timestamp: currentDateTime,
    };

    try {
      // Add the order
      await addDoc(orderRef, orderData);

      // Delete the entire 'cart' map field from the user document
      const userDocRef = doc(db, "Userdetails", uid);
      await updateDoc(userDocRef, {
        cart: deleteField(), // This removes the whole cart map
      });

      // Navigate to checkout
      navigate("/Checkout");
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  useEffect(() => {
   // console.log("items from useCart updated:", handleItemsChange(items));
  //  console.log(items);
  }, []);

  useEffect(() => {
    getusercartdetails();
    updateDatetime();

    // Calculate tax (7% of Subtotal) and set it
    const calculatedTax = (0.07 * Subtotal).toFixed(2);
    setTax(calculatedTax);
    const finalAmount = parseFloat(Subtotal) + parseFloat(tax);

    setFinalamt(finalAmount); // Convert back to float
    // setTempcart({...tempcart,amt:finalamt})
  }, [Subtotal, [finalamt]]);

  const handleChange = (e) => {
    setTempcart({ ...tempcart, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  //console.log("Tip", tip);
  return (
    <div style={{ margin: "5%" }}>
      <div style={{ margin: "5%", fontFamily: "Arial, sans-serif" }}>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div
            className="col-md-4"
            style={{
              fontSize: "18px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "15px" }}>
              Order Summary
            </Typography>
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ padding: "10px" }}>Subtotal:</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  ${Subtotal}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>Taxes:</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>${tax}</td>
              </tr>

              <tr>
                <td style={{ padding: "10px" }}>Tip:</td>
                <td
                  style={{
                    padding: "10px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Show the selected tip if available, else show "Set Tip" */}
                  {tip == 0.0 ? (
                    <a
                      href="#"
                      style={{
                        fontSize: "16px",
                        color: "seagreen",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                      onClick={handleClickOpen}
                    >
                      Set Tip
                    </a>
                  ) : (
                    <>
                      <span
                        style={{
                          marginRight: "10px",
                          color: "seagreen",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        ${tip}
                      </span>
                      <a
                        href="#"
                        style={{
                          fontSize: "16px",
                          color: "seagreen",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                        onClick={handleClickOpen}
                      >
                        Edit Tip
                      </a>
                    </>
                  )}
                </td>
              </tr>
              <tr style={{ borderTop: "2px solid #ddd" }}>
                <td style={{ padding: "10px" }}>Total:</td>
                <td
                  style={{
                    padding: "10px",
                    fontWeight: "bold",
                    color: redcolor,
                  }}
                >
                  ${finalamt}
                </td>
              </tr>
            </table>
          </div>
          <div
            className="col-md-4"
            style={{
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="body1"
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: redcolor,
              }}
            >
              Special Instructions
            </Typography>
            <TextField
              name="special_instru"
              label="Enter Special Instructions"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={handleChange}
            />
          </div>
          <div
            className="col-md-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              variant="contained"
              onClick={handleOrderAddclick}
              fullWidth
              style={{
                fontSize: "18px",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: redcolor,
              }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            maxWidth: "400px", // Set max width if needed
            minWidth: "250px", // Set a minimum width for responsiveness
            height: "auto", // Optional: control height
          }}
        >
          <DialogTitle
            id="customized-dialog-title"
            sx={{
              m: 0,
              paddingBottom: 0, // Reduce bottom padding if there's unnecessary space
              paddingTop: 0, // Ensure there’s no top padding
              //textAlign: "center"
            }}
          >
            <Typography
              variant="body1"
              sx={{ marginBottom: 1, fontSize: "16px", color: redcolor }}
            >
              Please Select/Enter a Tip
            </Typography>
            {/* Tip Amount TextField */}
            <TextField
              id="top-textfield"
              variant="standard"
              type="number"
              // Value={tip}
              value={tip}
              //  onChange={(e) => setTip(e.target.value)}
              InputProps={{
                disableUnderline: true, // Removes the underline
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: redcolor }}>
                    $
                  </InputAdornment>
                ),
              }}
              sx={{
                fontSize: "20px", // Larger font for better readability
                //  textAlign: "center",
                width: 150, // Fixed width to keep it consistent

                marginBottom: 0,
                "& .MuiInputBase-input": {
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: redcolor, // Text color inside the input field
                },
              }}
            />
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 10,
              top: 16,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ButtonGroup
              variant="outlined"
              style={{ borderColor: redcolor }}
              aria-label="tip button group"
            >
              <StyledButton
                onClick={() => {
                  setTip((0.1 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                10%
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.15 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                15%
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.2 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                20%
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.25 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                25%
              </StyledButton>
            </ButtonGroup>

            <ButtonGroup variant="outlined" aria-label="tip method group">
              <StyledButton
                onClick={() => {
                  setTip("you'll pay with cash");
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                Cash
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.0).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                No Tip
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip("");
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                Custom
              </StyledButton>
            </ButtonGroup>
          </DialogContent>

          <DialogActions
            sx={{ marginTop: 0, color: redcolor, borderColor: redcolor }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              style={{ backgroundColor: redcolor, color: "#ffffff" }}
            >
              Save Tip
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {cartdetails.length > 0 ? (
          cartdetails.map((data, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar variant="rounded" src={data?.image} />
                </ListItemAvatar>

                <ListItemText
                  primary={data?.itemname}
                  secondary={
                    <div className="row">
                      <div className="col-md-9">
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          -${data?.price}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {data?.desc}
                        </Typography>
                      </div>
                      <div
                        className="col-md-3"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <AddBtn
                          data={data}
                          handleAddclick={handleAddclick}
                          cartdetails={cartdetails}
                        />
                      </div>
                    </div>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
            </div>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No items in cart.
          </Typography>
        )}
      </List>
    </div>
  );
}

function AddBtn({ data, handleAddclick, cartdetails }) {
  const [count, setCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    getCount();
  }, [cartdetails]);

  const handleIncrement = () => {
    console.log("------called----");
    if (data.availibity !== "false") {
      // setCount((prev) => prev + 1); // Update count immediately
      setIsDisabled(true);
      const updatedData = {
        ...data,
        amt: (count ? count + 1 : 1) * data.price,
        total: count ? count + 1 : 1,
      };
      console.log(data, updatedData);
      handleAddclick(updatedData);
    }
  };

  const handleDecrement = () => {
    console.log("------called----");
    if (count > 0) {
      // setCount((prev) => prev - 1); // Update count immediately
      setIsDisabled(true);

      const updatedData = {
        ...data,
        total: count ? count - 1 : 1,
        amt: (count ? count - 1 : 1) * data.price,
      };
      // Ensure amt doesn't go negative

      handleAddclick(updatedData);
    }
  };

  const getCount = () => {
    let x = cartdetails.find(
      (item) =>
        item.itemname === data.itemname && item.category === data.category
    );
    if (x && x.total && x.total > 0) {
      setCount(x.total);
    } else {
      setCount(0);
    }
    setIsDisabled(false);
  };

  return (
    <>
      {" "}
      <div
        class="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
        style={{ display: "inline-flex", borderRadius: "3px" }}
      >
        <button
          type="button"
          disabled={isDisabled}
          class="btn btn-danger"
          style={{
            border: "none",
            maxHeight: "40px",
            backgroundColor: isHovered ? "#FF1B1C" : redcolor,
            cursor: data.availibity === "false" ? "not-allowed" : "pointer", // Change cursor when unavailable
            opacity: data.availibity === "false" ? 0.6 : 1, // Reduce opacity for unavailable items
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleDecrement}
        >
          -
        </button>
        <button
          type="button"
          class="btn btn-danger"
          disabled={isDisabled}
          style={{
            border: "none",
            maxHeight: "40px",
            backgroundColor: isHovered ? "#FF1B1C" : redcolor,
            cursor: data.availibity === "false" ? "not-allowed" : "pointer", // Change cursor when unavailable
            opacity: data.availibity === "false" ? 0.6 : 1, // Reduce opacity for unavailable items
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {count}
        </button>

        <button
          type="button"
          class="btn btn-danger"
          disabled={isDisabled}
          style={{
            border: "none",
            maxHeight: "40px",
            backgroundColor: isHovered ? "#FF1B1C" : redcolor,
            cursor: data.availibity === "false" ? "not-allowed" : "pointer", // Change cursor when unavailable
            opacity: data.availibity === "false" ? 0.6 : 1, // Reduce opacity for unavailable items
            borderTopRightRadius: "5px", // Apply radius to top-right corner
            borderBottomRightRadius: "5px", // Apply radius to bottom-right corner
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleIncrement}
        >
          +
        </button>
        <br></br>
      </div>
    </>
  );
}
export default Cart;
