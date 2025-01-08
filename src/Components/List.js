import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList({ menuDetails, isAdd }) {
  const [isHovered1, setIsHovered1] = React.useState(
    new Array(menuDetails.length).fill(false)
  );

  const handleMouseEnter = (index) => {
    const newHoveredState = [...isHovered1];
    newHoveredState[index] = true;
    setIsHovered1(newHoveredState);
  };

  // Handle mouse leave for a specific button
  const handleMouseLeave = (index) => {
    const newHoveredState = [...isHovered1];
    newHoveredState[index] = false;
    setIsHovered1(newHoveredState);
  };
  // State to track if the "Add to Cart" button was clicked for an unavailable item
  const [disabledItems, setDisabledItems] = React.useState(
    new Array(menuDetails.length).fill(false)
  );

  const handleAddToCartClick = (index, availability) => {
    if (availability === "no") {
      const updatedDisabledItems = [...disabledItems];
      updatedDisabledItems[index] = true;
      setDisabledItems(updatedDisabledItems);
    } // Disable the button for unavailable item
    //else {
    //   // Add to cart logic goes here
    //   // For now, just log for demo
    //   console.log("Item added to cart");
    // }
  };
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {menuDetails.map((data, index) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar variant="rounded" src={data.img} />
              </ListItemAvatar>
              <ListItemText
                primary={data.itemname}
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

                      {data.availibity == "no" ? (
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
                      {isAdd && <AddBtn data={data} />} &nbsp;&nbsp;
                      {isAdd && (
                        <button
                          type="button"
                          style={{
                            backgroundColor: isHovered1[index]
                              ? "#FF1B1C"
                              : "#f57c00",
                            border: "none",
                            color: "white",
                            borderRadius: "5px",
                            cursor:
                              data.availibity === "no"
                                ? "not-allowed"
                                : "pointer", // Change cursor when unavailable
                            opacity: data.availibity === "no" ? 0.6 : 1, // Reduce opacity for unavailable items
                          }}
                          disabled={data.availibity === "no"} // Disable button if unavailable
                          onMouseEnter={() => handleMouseEnter(index)} // use index here
                          onMouseLeave={() => handleMouseLeave(index)}
                          onClick={() => {
                            handleAddToCartClick(index, data.availibity);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}

function AddBtn({ data }) {
  const [count, setCount] = React.useState(0);

  //const [detail, setDetail] = React.useState();

  const [isHovered, setIsHovered] = React.useState(false);

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
          class="btn btn-danger"
          style={{
            border: "none",
            backgroundColor: isHovered ? "#FF1B1C" : "#f57c00",
            cursor: data.availibity === "no" ? "not-allowed" : "pointer", // Change cursor when unavailable
            opacity: data.availibity === "no" ? 0.6 : 1, // Reduce opacity for unavailable items
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (count > 0 && data.availibity !== "no") {
              setCount(count - 1);

              // <Cart data={data} />;
            }
          }}
        >
          -
        </button>
        <button
          type="button"
          class="btn btn-danger"
          style={{
            border: "none",
            backgroundColor: isHovered ? "#FF1B1C" : "#f57c00",
            cursor: data.availibity === "no" ? "not-allowed" : "pointer", // Change cursor when unavailable
            opacity: data.availibity === "no" ? 0.6 : 1, // Reduce opacity for unavailable items
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {count == 0 ? "0" : count}
        </button>

        <button
          type="button"
          class="btn btn-danger"
          style={{
            border: "none",
            backgroundColor: isHovered ? "#FF1B1C" : "#f57c00",
            cursor: data.availibity === "no" ? "not-allowed" : "pointer", // Change cursor when unavailable
            opacity: data.availibity === "no" ? 0.6 : 1, // Reduce opacity for unavailable items
            borderTopRightRadius: "5px", // Apply radius to top-right corner
            borderBottomRightRadius: "5px", // Apply radius to bottom-right corner
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (data.availibity !== "no") {
              setIsHovered(true);
              setCount(count + 1);
            }
          }}
        >
          +
        </button>
        <br></br>
      </div>
    </>
  );
}
