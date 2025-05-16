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
  Tooltip,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { handleItemsChange } from "../useCart";

const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

const uid = localStorage.getItem("uid");
function AlignItemsList({ menuDetails, isAdd }) {
  const [cart, setCart] = React.useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  React.useEffect(() => {
    getCartData();
  }, []);

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
    if (!data || !data.itemname) {
      console.warn("❗ Invalid data passed to handleAddclick:", data);
      return;
    }
    const itemIndex = cart.findIndex((item) => item.itemname === data.itemname);
    if (itemIndex !== -1) {
      console.log("available");

      const updatedCart = cart.map((val, index) => {
        if (index === itemIndex) {
          return {
            ...val,
            amt: data.amt,
            total: data.total,
          };
        }
        return val;
      });

      setCart(updatedCart);
      handleItemsChange(updatedCart);
    } else {
      setCart([...cart, data]);
      handleItemsChange([...cart, data]);
    }
    console.log("cart-------", cart);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {menuDetails.map((data, index) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              {isMobile ? (
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={data.image}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "16px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (isMobile) {
                        setSelectedImage(data.image);
                        setOpen(true);
                        // open dialog on mobile
                      }
                    }}
                  />
                </ListItemAvatar>
              ) : (
                <Tooltip
                  title={
                    <img
                      src={data.image}
                      alt="preview"
                      style={{
                        width: 500,
                        height: 500,
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                  }
                  placement="right"
                  // arrow
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={data.image}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "16px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </ListItemAvatar>
                </Tooltip>
              )}

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
                sx={{ pl: 2 }}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
              <DialogContent sx={{ position: "relative", p: 0 }}>
                <IconButton
                  onClick={() => setOpen(false)}
                  sx={{ position: "absolute", top: 4, right: 8, zIndex: 1 }}
                >
                  <CloseIcon sx={{ color: "#ffffff" }} />
                </IconButton>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "16px",
                    }}
                  />
                )}
              </DialogContent>
            </Dialog>
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
    getCount();
  }, [cart]);

  const handleIncrement = () => {
    if (data.availibity !== "false") {
      // setCount((prev) => prev + 1); // Update count immediately
      // setIsDisabled(true);
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
      //setIsDisabled(true);

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
      console.log("-------X", x);
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
          // disabled={isDisabled}
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
          // disabled={isDisabled}
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
          // disabled={isDisabled}
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

export default React.memo(AlignItemsList);
