import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoMealsIcon from "@mui/icons-material/NoMeals";

import { db } from "../../firebase-config";
import { redcolor } from "../../Design";

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
import Slide from "@mui/material/Slide";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Menua() {
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

  const [data, setData] = React.useState({});

  const AcateringCollectionRef = collection(db, "Cateringmenu");
  const [cateringdata, setCateringdata] = React.useState([]);
  const [updateid, setUpdateid] = React.useState();
  const [image, setImage] = React.useState([]);

  const validateFields = () => {
    return data.itemname && data.category && data.desc && data.image;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getcateringmenudata = async () => {
    const data = await getDocs(AcateringCollectionRef);
    setCateringdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    {
      getcateringmenudata();
    }
  }, []);

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

  const handleUpdateClick = async () => {
    if (!validateFields()) {
      alert("Please fill in all fields before updating.");
      return; // Prevent further execution if fields are not valid
    }

    // Find the document in your local state by its ID
    let obj = cateringdata.find((val1) => val1.id === updateid);

    // Update the fields of the object
    obj.category = data.category;
    obj.itemname = data.itemname;
    obj.desc = data.desc;
    obj.image = data.image;

    // Create a reference to the specific document to update in Firebase
    const docRef = doc(db, "Cateringmenu", updateid); // Use the updateid for the specific document

    // Update the document in Firebase
    await updateDoc(docRef, {
      category: obj.category,
      itemname: obj.itemname,
      desc: obj.desc,
      image: obj.image,
    });

    // Update the local state to reflect the changes
    setCateringdata(
      cateringdata.map((item) =>
        item.id === updateid ? { ...item, ...obj } : item
      )
    );

    // Clear the input fields
    //  setData({ exp: "", credeb: "", amt: "", desc: "" });
  };

  const deleteUser = async (id) => {
    const cateringDoc = doc(db, "Cateringmenu", id);
    await deleteDoc(cateringDoc);

    // After deleting the document, update the local state to remove the deleted item
    const updatecateringdata = cateringdata.filter((item) => item.id !== id);
    setCateringdata(updatecateringdata); // Re-render the table with the updated data
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  function AddItemDialog(props) {
    const { onClose, open } = props;
    const label = { inputProps: { "aria-label": "Switch demo" } };

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
                Update Catering Menu Item
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
                  <MenuItem value="Drink">Drinks</MenuItem>
                  <MenuItem value="Paneer ke Pakwan">Paneer ke Pakwan</MenuItem>
                  <MenuItem value="Sabz e Bahar">Sabz 'e' Bahar</MenuItem>
                  <MenuItem value="Yogurts">Yogurts</MenuItem>
                  <MenuItem value="Scent of Rice">Scent of Rice</MenuItem>
                  <MenuItem value="Dal Ranga Rang">Dal Ranga Rang</MenuItem>
                  <MenuItem value="Special Food">Special Food</MenuItem>
                  <MenuItem value="Breads Delight">Breads Delight</MenuItem>
                  <MenuItem value="Sweet Dessert">Sweet Desserts</MenuItem>
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
                  backgroundColor: "#f57c00",
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
                  backgroundColor: "#f57c00",
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

  return (
    <div style={{ margin: "2%" }}>
    
        <Typography variant="h4" align="center" gutterBottom>
          Update Catering Menu Item
        </Typography>
    

      <Button
        type="button"
        style={{
          backgroundColor: redcolor,
          border: "none",
          color: "white",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
      >
        Add Item
      </Button>

      <AddItemDialog open={open} onClose={handleClose} />

      <Box>
        <TableContainer component={Paper}>
          <InputLabel
            style={{ fontWeight: "bold" }}
            id="demo-simple-select-standard-label"
          >
            Choose Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={age}
            onChange={handleChange}
            label="Choose Category"
            sx={{
              width: "200px",
              height: "40px",
              marginBottom: "20px",
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
            <MenuItem value="appetizer">Appetizer</MenuItem>
            <MenuItem value="chef_special">Drink</MenuItem>
            <MenuItem value="sabz_e_bahar">Paneer ke Pakwan</MenuItem>
            <MenuItem value="dal">Sabz e Bahar</MenuItem>
            <MenuItem value="rice">Yogurts</MenuItem>
            <MenuItem value="bread">Scent of Rice</MenuItem>
            <MenuItem value="beverages">Dal Ranga Rang</MenuItem>
            <MenuItem value="dessert">Special Food</MenuItem>
            <MenuItem value="dal">Breads Delight</MenuItem>
            <MenuItem value="bread">Sweet Dessert</MenuItem>
            <MenuItem value="beverages">Healthy Salad</MenuItem>
            <MenuItem value="dessert">Tangy Pickles</MenuItem>
          </Select>

          <Table aria-label="customer order table" sx={{ minWidth: 650 }}>
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
                <TableCell>Number</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRecords
                data={cateringdata}
                handleClickOpen={handleClickOpen}
                deleteUser={deleteUser}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

function TableRecords({ data, handleClickOpen, deleteUser }) {
  if (data && data.length > 0) {
    return (
      <>
        {data.map((val, index) => {
          return (
            <TableRow>
              <TableCell component="th" scope="row">
                {/* {val.tokenid} */}
          

              </TableCell>
              <TableCell>
                <Avatar variant="rounded" src={val.image} />
              </TableCell>
              <TableCell>{val.category}</TableCell>
              <TableCell>{val.itemname}</TableCell>
              <TableCell>{val.desc}</TableCell>
              <TableCell>
                <IconButton
                  style={{ color: redcolor }}
                  onClick={handleClickOpen}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  style={{ color: redcolor }}
                  onClick={() => deleteUser(val.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  } else {
    return <div></div>;
  }
}

export default Menua;
