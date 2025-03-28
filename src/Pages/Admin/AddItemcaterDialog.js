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
import CloseIcon from "@mui/icons-material/Close"; // Import Close Ico
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { redcolor } from "../../Design";

function AddItemcaterDialog(props) {
  const { open, handleClose ,data,setData,Isupdate,updateid} = props;

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const AcateringCollectionRef = collection(db, "Cateringmenu");
  const [cateringdata, setCateringdata] = React.useState([]);
  //const [data, setData] = React.useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    return data.itemname && data.category && data.desc && data.image;
  };
  const handleAddclick = () => {
    if (!validateFields()) {
      alert("Please fill in all catering fields before adding.");
      return; // Prevent further execution if fields are not valid
    }

    createCateringmenu(data); // Add item to Firebase
    setData({
      itemname: "",
      category: "",
      desc: "",
      image: "",
    }); // Clear form
  };

  // Add item in firebase Database   await addDoc(usersCollectionRef, { name: newName, age: newAge });
  const createCateringmenu = async (data) => {
    await addDoc(AcateringCollectionRef, {
      // no: data.no,
      category: data.category,
      itemname: data.itemname,
      desc: data.desc,
      image: data.image,
    });

    setCateringdata([
      ...cateringdata,
      {
        // no: no, // This will be the new no
        category: data.category,
        itemname: data.itemname,
        desc: data.desc,
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

  // const handleUpdateClick = async () => {
  //     if (!validateFields()) {
  //       alert("Please fill in all fields before updating.");
  //       return; // Prevent further execution if fields are not valid
  //     }
  
  //     // Find the document in your local state by its ID
  //     let obj = cateringdata.find((val1) => val1.id === updateid);
  
  //     // Update the fields of the object
  //     obj.category = data.category;
  //     obj.itemname = data.itemname;
  //     obj.desc = data.desc;
  //     obj.image = data.image;
  
  //     // Create a reference to the specific document to update in Firebase
  //     const docRef = doc(db, "Cateringmenu", updateid); // Use the updateid for the specific document
  
  //     // Update the document in Firebase
  //     await updateDoc(docRef, {
  //       category: obj.category,
  //       itemname: obj.itemname,
  //       desc: obj.desc,
  //       image: obj.image,
  //     });
  
  //     // Update the local state to reflect the changes
  //     setCateringdata(
  //       cateringdata.map((item) =>
  //         item.id === updateid ? { ...item, ...obj } : item
  //       )
  //     );
  
  //     // Clear the input fields
  //     //  setData({ exp: "", credeb: "", amt: "", desc: "" });
  //   };

    const handleUpdateClick = async () => {
        if (!validateFields()) {
          alert("Please fill in all fields before updating.");
          return; // Prevent further execution if fields are not valid
        }
    
        console.log("Update click", Isupdate);
    
        if (!updateid) {
          alert("No item selected for update.");
          return;
        }
    
        try {
          const docRef = doc(db, "Cateringmenu", updateid); // Use the updateid for the specific document
  
    
          // Update the document in Firestore
          await updateDoc(docRef, {
            category: data.category,
            itemname: data.itemname,
            desc: data.desc,
            image: data.image,
          });
    
          // Update the local state to reflect the changes
          setCateringdata((prevDiningData) =>
            prevDiningData.map((item) =>
              item.id === updateid ? { ...item, ...data } : item
            )
          );
    
          alert("Item updated successfully!");
          handleClose(); // Close the dialog after updating
        } catch (error) {
          console.error("Error updating item:", error);
          alert("Failed to update item. Please try again.");
        }
        // // Find the document in your local state by its ID
        // let obj = diningdata.find((val1) => val1.id === updateid);
    
        // // Update the fields of the object
        // obj.category = data.category;
        // obj.itemname = data.itemname;
        // obj.price = data.price;
        // obj.desc = data.desc;
    
        // // Create a reference to the specific document to update in Firebase
        // const docRef = doc(db, "Diningmenu", updateid); // Use the updateid for the specific document
    
        // // Update the document in Firebase
        // await updateDoc(docRef, {
        //   category: obj.category,
        //   itemname: obj.itemname,
        //   price: obj.price,
        //   desc: obj.desc,
        // });
    
        // // Update the local state to reflect the changes
        // setDiningdata(
        //   diningdata.map((item) =>
        //     item.id === updateid ? { ...item, ...obj } : item
        //   )
        // );
    
        // // Clear the input fields
        //  setData({ exp: "", credeb: "", amt: "", desc: "" });
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
      open={open}
      PaperProps={{
        style: {
          margin: 0,
          maxWidth: "100%",
          borderRadius: "12px", // Rounded corners
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)", // Soft shadow
        },
      }}
    >

<IconButton onClick={handleClose} sx={{ color: redcolor ,position:"absolute", top:"8px",right:"8px"}}>
          <CloseIcon />
        </IconButton>
      <Container maxWidth="sm" style={{ padding: "20px" }}>
        <Box
          sx={{
    
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Update Catering Menu Item
          </Typography>

          {/* Catering Category Selection */}
          <Box mb={3}>
            <FormControl required fullWidth>
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
                <MenuItem value="Drink">Drinks</MenuItem>
                <MenuItem value="Paneer ke Pakwan">Paneer ke Pakwan</MenuItem>
                <MenuItem value="Sabz e Bahar">Sabz 'e' Bahar</MenuItem>
                <MenuItem value="Yogurts">Yogurts</MenuItem>
                <MenuItem value="Scent of Rice">Scent of Rice</MenuItem>
                <MenuItem value="Dal Ranga Rang">Dal Ranga Rang</MenuItem>
                <MenuItem value="Special Food">Special Food</MenuItem>
                <MenuItem value="Breads Delight">Breads Delight</MenuItem>
                <MenuItem value="Sweet Dessert">Sweet Dessert</MenuItem>
                <MenuItem value="Healthy Salad">Healthy Salad</MenuItem>
                <MenuItem value="Tangy Pickles">Tangy Pickles</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Item Name Field */}
          <Box mb={3}>
            <TextField
            required
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
                backgroundColor:redcolor,
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
              onClick={()=>{data.id ? handleUpdateClick(data.id) : handleAddclick()}}
            >
              {data.id ? "Update Item" : "Add Item"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddItemcaterDialog;
