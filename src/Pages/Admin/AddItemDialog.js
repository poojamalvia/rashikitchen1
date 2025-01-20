import React from "react";
import {
  TextField,
  IconButton,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
  Paper,
  TableContainer,
  Button,
  Box,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Dialog,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { redcolor } from "../../Design";

function AddItemDialog(props) {
  const { open, handleClose, data, setData } = props;

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const AdiningCollectionRef = collection(db, "Diningmenu");
  const [diningdata, setDiningdata] = React.useState([]);
  //const [data, setData] = React.useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    return (
      data.itemname && data.category && data.price && data.desc && data.image
    );
  };
  const handleAddclick = (e) => {
    if (!validateFields()) {
      alert("Please fill in all dining fields before adding.");
      return; // Prevent further execution if fields are not valid
    }

    createDiningmenu(data); // Add item to Firebase

    //setNo(no + 1);
    setData({
      itemname: "",
      price: "",
      category: "",
      desc: "",
      availibity: "true",
      image: "",
    }); // Clear form
  };
  // Add item in firebase Database   await addDoc(usersCollectionRef, { name: newName, age: newAge });
  const createDiningmenu = async (data) => {
    await addDoc(AdiningCollectionRef, {
      // no: data.no,
      category: data.category,
      itemname: data.itemname,
      price: data.price,
      desc: data.desc,
      availibity: data.availibity,
      image: data.image,
    });

    setDiningdata([
      ...diningdata,
      {
        // no: no, // This will be the new no
        category: data.category,
        itemname: data.itemname,
        price: data.price,
        desc: data.desc,
        availibity: data.availibity,
        image: data.image,
      },
    ]);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        var reader = new FileReader();
        reader.onloadend = async function () {
          const imageData = reader.result; // This is the base64 data of the image

          // Add to Firestore

          setData({ ...data, image: reader.result });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error adding file: ", error);
      }
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          margin: 0,
          // width: "600px",
          // height: "600px",
          maxWidth: "100%",
          //overflow: "hidden",
          borderRadius: "12px", // Rounded corners
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)", // Soft shadow
        },
      }}
    >
      <Container maxWidth="sm" style={{ padding: "40px 20px" }}>
        <Box
          sx={{
            border: "2px solid #f57c00",
            borderRadius: "8px",
            padding: "30px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Update Dining Menu Item
          </Typography>

          {/* Catering Category Selection */}
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Catering Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                label="Catering Category"
                fullWidth
                onChange={handleChange}
                value={data.category}
              >
                <MenuItem value="">
                  <em>Choose a category</em>
                </MenuItem>
                <MenuItem value="Appetizer">Appetizer</MenuItem>
                <MenuItem value="Chef_special">Chef Special</MenuItem>
                <MenuItem value="Sabjz_e_bahar">Sabjz-E-Bahar</MenuItem>
                <MenuItem value="Dal">Dal</MenuItem>
                <MenuItem value="rice">Rice</MenuItem>
                <MenuItem value="bread">Bread</MenuItem>
                <MenuItem value="beverages">Beverages</MenuItem>
                <MenuItem value="dessert">Dessert</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Item Name Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              name="itemname"
              label="Item Name"
              type="text"
              variant="outlined"
              value={data.itemname}
              style={{ backgroundColor: "#f5f5f5" }}
              onChange={handleChange}
            />
          </Box>

          {/* price Field */}
          {window.location.pathname.includes("DiningMenu") ? (
            <Box mb={3}>
              <TextField
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                value={data.price}
                style={{ backgroundColor: "#f5f5f5" }}
                onChange={handleChange}
              />
            </Box>
          ) : (
            ""
          )}

          {/* Description Field */}
          <Box mb={3}>
            <TextField
              required
              fullWidth
              name="desc"
              label="Description"
              type="text"
              variant="outlined"
              multiline
              rows={4}
              style={{ backgroundColor: "#f5f5f5" }}
              value={data.desc}
              onChange={handleChange}
            />
          </Box>

          {/* set availibity */}
          {window.location.pathname.includes("DiningMenu") ? (
            <div class="form-check form-switch">
              <Switch
                {...label}
                checked={data.availibity === "true" || data.availibity === true} // Ensure it's a boolean value
                name="availibity"
                onChange={(e) => {
                  setData({
                    ...data,
                    availibity: e.target.checked ? "true" : "false",
                  }); // Update availibity as "true" or "false"
                }}
              />

              <label class="form-check-label" for="flexSwitchCheckChecked">
                Item Availability
              </label>
            </div>
          ) : (
            ""
          )}

          {/* Image Preview Section */}
          {data.image && (
            <Box mb={3} textAlign="center">
              <Typography variant="subtitle1" gutterBottom>
                Image Preview:
              </Typography>
              <img
                src={data.image}
                alt="Uploaded Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          {/* File Upload Button */}
          <Box mb={3}>
            <Button
              component="label"
              variant="contained"
              style={{
                backgroundColor: redcolor,
                width: "100%",
                padding: "10px 0",
              }}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
          </Box>

          {/* Submit Button */}
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{
                backgroundColor: redcolor,
                padding: "12px 0",
                fontSize: "16px",
              }}
              onClick={handleAddclick}
            >
              Add/Update Item
            </Button>
          
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddItemDialog;
