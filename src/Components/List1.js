import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { redcolor } from "../Design";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

const uid = localStorage.getItem("uid");
function AlignItemsList1({ menuDetails, isAdd }) {
  const [isHovered1, setIsHovered1] = React.useState(
    new Array(menuDetails.length).fill(false)
  );
  const [total, setTotal] = React.useState(0);
  const [amt, setAmt] = React.useState(1);

  const [addtocartitem, setAddtocartitem] = React.useState([]);
  const [disabledItems, setDisabledItems] = React.useState(
    new Array(menuDetails.length).fill(false)
  );
  const [cart, setCart] = React.useState([]);
  const [update, doUpdate] = React.useState(true);

  React.useEffect(() => {
    console.log("in ue");
    getCartData();
  }, [update]);

  const getCartData = async () => {
    const userRef = doc(db, "Userdetails", uid);

    // Get the current cart data to find if the item already exists
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentCart = userDoc.data().cart || [];

      setCart(currentCart);
      const totalcount = currentCart.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      );

      await updateDoc(userRef, { totalcount });
    }
  };

  const handleAddclick = (data) => {
    const updatedData = {
      itemname: data.itemname,
      price: data.price,
      category: data.category, // If category is part of the item
      desc: data.desc,
      image: data.image,
      total: data.total,
      amt: data.amt, // Assuming this holds the total amount or quantity of the item
    };

    createAddtocart(updatedData); // Add item to Firebase
    doUpdate(!update);
  };

  const createAddtocart = async (data) => {
    try {
      const userRef = doc(db, "Userdetails", uid);

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
          updatedCart[itemIndex].total = data.total; // Increment the total quantity for the item
          updatedCart[itemIndex].amt = data.amt;

          // Update the cart array with the new total for the item
          await updateDoc(userRef, {
            cart: updatedCart,
          });
        } else {
          // If item does not exist, add it to the cart array
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
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {menuDetails.map((data, index) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <div className="col-md-4">
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={data.image}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "16px",
                      objectFit: "cover",
                    }} // adjust size as needed
                  />
                </ListItemAvatar>
              </div>
              <div className="col-md-8">
                <ListItemText
                  primary={<b>{data.itemname}</b>}
                  secondary={
                    <div className="row">
                      <div className="col-md-9">
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {isAdd && " - $" + data.price}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {data.desc}
                        </Typography>

                        {data.availibity == "false" ? (
                          <label
                            style={{
                              top: "30px", // Center it vertically for better alignment
                              left: "50%", // Center it horizontally as well
                              // transform: "rotate(45deg)", // Make the label centered and rotated
                              backgroundColor: "rgba(243, 158, 158, 0.7)", // Slight transparency for a cleaner look
                              color: "white",
                              fontWeight: "bold",
                              padding: "5px 25px",
                              position: "absolute",
                              borderRadius: "5px", // Slightly rounded corners for smoother design
                              fontSize: "14px", // Make the text smaller for elegance
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow for depth
                            }}
                          >
                            UNAVAILABLE
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className="col-md-3"
                        style={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        {isAdd && isAuthenticated && (
                          <AddBtn
                            data={data}
                            handleAddclick={handleAddclick}
                            cart={cart}
                          />
                        )}{" "}
                      </div>
                    </div>
                  }
                />
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}

function AddBtn({ data, handleAddclick, cart }) {
  const [count, setCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    console.log("in add ue", cart, count);
    getCount();
  }, [cart]);

  const handleIncrement = () => {
    if (data.availibity !== "false") {
      // setCount((prev) => prev + 1); // Update count immediately
      setIsDisabled(true);
      const updatedData = {
        ...data,
        amt: (count ? count + 1 : 1) * data.price,
        total: count ? count + 1 : 1,
      };
      handleAddclick(updatedData);
    }
  };

  const handleDecrement = () => {
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
    let x = cart.find(
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

export default React.memo(AlignItemsList1);
