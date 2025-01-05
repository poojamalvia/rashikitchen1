import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { db } from "../../firebase-config";

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
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
  const [cmenu, setCmenu] = React.useState([
    {
      tokenid: "1",
      category: "Appetizer",
      item: "samosa",
      desc: "It is delicious product made with milk and palm sugar decorated with cashews and almonds",
      image: `https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800`,
      price: "10",
    },
    {
      tokenid: "2",
      category: "50",
      item: "3.5",
      desc: "confirmed",
      price: "10",
    },
    {
      tokenid: "3",
      category: "50",
      item: "3.5",
      desc: "confirmed",
      price: "10",
    },
    {
      tokenid: "4",
      category: "50",
      item: "3.5",
      desc: "confirmed",
      price: "10",
    },
    {
      tokenid: "5",
      category: "50",
      item: "3.5",
      desc: "confirmed",
      price: "10",
    },
  ]);

  const [age, setAge] = React.useState("");

  const AdiningCollectionRef = collection(db, "Diningmenu");
  const [diningdata, setDiningdata] = React.useState([]);
  const [data, setData] = React.useState({});
  const [no, setNo] = React.useState(1);

  const validateFields = () => {
    return data.itemname && data.category && data.price && data.desc;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const getdiningmenudata = async () => {
    const data = await getDocs(AdiningCollectionRef);
    setDiningdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    console.log("sad");
    getdiningmenudata();
  }, []);

  // Add item in firebase Database   await addDoc(usersCollectionRef, { name: newName, age: newAge });
  const createDiningmenu = async (data) => {
    await addDoc(AdiningCollectionRef, {
      // no: data.no,
      category: data.category,
      itemname: data.itemname,
      price: data.price,
      desc: data.desc,
    });

    setDiningdata([
      ...diningdata,
      {
        // no: no, // This will be the new no
        category: data.category,
        itemname: data.itemname,
        price: data.price,
        desc: data.desc,
      },
    ]);
  };

  const handleAddClick = () => {
    if (!validateFields()) {
      alert("Please fill in all fields before adding.");
      return; // Prevent further execution if fields are not valid
    }

    //setNo(no + 1);
    createDiningmenu(data); // Add item to Firebase
    setData({ itemname: "", price: "", category: "", desc: "" }); // Clear form
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the preview image state
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  const [imagePreview, setImagePreview] = React.useState(null);

  function AddItemDialog(props) {
    const { onClose, open } = props;

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
            {window.location.pathname.includes("menua") ? (
              <Typography variant="h4" align="center" gutterBottom>
                Update Dining Menu Item
              </Typography>
            ) : (
              <Typography variant="h4" align="center" gutterBottom>
                Update Catering Menu Item
              </Typography>
            )}

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
                  <MenuItem value="appetizer">Appetizer</MenuItem>
                  <MenuItem value="Drink">Drink</MenuItem>
                  <MenuItem value="Paneer ke Pakwan">Paneer ke Pakwan</MenuItem>
                  <MenuItem value="Sabz e Bahar">Sabz e Bahar</MenuItem>
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

            {window.location.pathname.includes("menua") ? (
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

            {/* Image Preview Section */}
            {imagePreview && (
              <Box mb={3} textAlign="center">
                <Typography variant="subtitle1" gutterBottom>
                  Image Preview:
                </Typography>
                <img
                  src={imagePreview}
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
    <div>
      {window.location.pathname.includes("menua") ? (
        <Typography variant="h4" align="center" gutterBottom>
          Update Dining Menu Item
        </Typography>
      ) : (
        <Typography variant="h4" align="center" gutterBottom>
          Update Catering Menu Item
        </Typography>
      )}

      <Button
        type="button"
        style={{
          backgroundColor: "#f57c00",
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
          <Table aria-label="customer order table">
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>
                  <InputLabel id="demo-simple-select-standard-label">
                    Choose Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={age}
                    onChange={handleChange}
                    label="Choose Category"
                    sx={{ width: "200px", height: "40px" }}
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
                </TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>

                <TableCell>Price</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {diningdata &&
              diningdata.length > 0 &&
              diningdata.map((val, index) => (
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {val.tokenid}
                    </TableCell>
                    <TableCell>
                      <Avatar variant="rounded" src={val.image} />
                    </TableCell>
                    <TableCell>{val.category}</TableCell>
                    <TableCell>{val.itemname}</TableCell>
                    <TableCell>{val.desc}</TableCell>

                    <TableCell>${val.price}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={handleClickOpen}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => alert("Delete item")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Menua;
