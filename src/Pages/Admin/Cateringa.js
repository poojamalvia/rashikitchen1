import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import AddItemcaterDialog from "./AddItemcaterDialog";

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
  DialogContent,
  DialogTitle,
  DialogActions,
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

function Cateringa() {
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
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false); // For delete confirmation dialog
  const AcateringCollectionRef = collection(db, "Cateringmenu");
  const [cateringdata, setCateringdata] = React.useState([]);
  const [updateid, setUpdateid] = React.useState();
  const [image, setImage] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(""); // New state for category selection
  const [open, setOpen] = React.useState(false);

  const validateFields = () => {
    return data.itemname && data.category && data.desc && data.image;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // This will update the selected category state
    console.log(selectedCategory);
  };
  const getcateringmenudata = async () => {
    const data = await getDocs(AcateringCollectionRef);
    setCateringdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    {
      getcateringmenudata();
    }
  }, [open]);

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

  

   const handleDeleteClick = (id) => {
      setUpdateid(id);
      setDeleteDialogOpen(true); // Open the delete confirmation dialog
    };
  
    const handleDeleteConfirm = async () => {
      const cateringDoc = doc(db, "Cateringmenu", updateid);
    await deleteDoc(cateringDoc);

  
      // After deleting the document, update the local state to remove the deleted item
    const updatecateringdata = cateringdata.filter((item) => item.id !== updateid);
    setCateringdata(updatecateringdata); // Re-render the table with the updated data
      setDeleteDialogOpen(false); // Close the dialog after confirming deletion
    };
  
    const handleDeleteCancel = () => {
      setDeleteDialogOpen(false); // Close the dialog if cancel is clicked
    };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ margin: "2%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Catering Menu Item
      </Typography>

      <Box display="flex" alignItems="center">
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

        <AddItemcaterDialog open={open} onClose={handleClose} />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel
            style={{ fontWeight: "bold", color: redcolor }}
            id="demo-simple-select-standard-label"
          >
            Filter Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedCategory}
            onChange={handleCategoryChange}
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
            <MenuItem value="">
              <em>All categories</em>
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

      <TableContainer component={Paper}>
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
              data={
                selectedCategory
                  ? cateringdata.filter(
                      (item) => item.category === selectedCategory
                    )
                  : cateringdata
              }
              handleClickOpen={handleClickOpen}
              handleDeleteClick={handleDeleteClick}
            />
          </TableBody>
        </Table>
      </TableContainer>
       {/* Delete Confirmation Dialog */}
       <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function TableRecords({ data, handleClickOpen, handleDeleteClick }) {
  if (data && data.length > 0) {
    return (
      <>
        {data.map((val, index) => {
          return (
            <TableRow>
              {/* <TableCell component="th" scope="row"> */}
                {/* {val.tokenid} */}
              {/* </TableCell> */}
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
                  onClick={() => handleDeleteClick(val.id)}
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

export default Cateringa;
