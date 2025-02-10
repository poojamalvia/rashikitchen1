import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoMealsIcon from "@mui/icons-material/NoMeals";

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
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AddItemDialog from "./AddItemDialog";
import { redcolor } from "../../Design";

function Menua() {
  const AdiningCollectionRef = collection(db, "Diningmenu");
  const [open, setOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false); // For delete confirmation dialog
  const [diningdata, setDiningdata] = React.useState([]);
  const [updateid, setUpdateid] = React.useState();
  const [Isupdate, setIsUpdate] = React.useState(false);
  const [data, setData] = React.useState({ availibity: "true" });
  const [selectedCategory, setSelectedCategory] = React.useState(""); // New state for category selection

  const validateFields = () => {
    return (
      data.itemname && data.category && data.price && data.desc && data.image
    );
  };

  const getdiningmenudata = async () => {
    const data = await getDocs(AdiningCollectionRef);
    setDiningdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    {
      getdiningmenudata();
    }
  }, [open]);

  const handleDeleteClick = (id) => {
    setUpdateid(id);
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const handleDeleteConfirm = async () => {
    const expDoc = doc(db, "Diningmenu", updateid);
    await deleteDoc(expDoc);

    const updatediningdata = diningdata.filter((item) => item.id !== updateid);
    setDiningdata(updatediningdata);
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
    setIsUpdate(false); // Reset to false when closing dialog
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // This will update the selected category state
    console.log(selectedCategory);
  };

  return (
    <div style={{ margin: "2%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Dining Menu Item
      </Typography>

      <div>
        <Box display="flex" alignItems="center" marginBottom="20px">
          <Button
            type="button"
            style={{
              backgroundColor: redcolor,
              border: "none",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={handleClickOpen}
            startIcon={<EditIcon />}
          >
            Add Item
          </Button>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              style={{ fontWeight: "bold", color: redcolor }}
              id="category-select-label"
            >
              Filter Category
            </InputLabel>

            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Choose Category"
              sx={{
                width: "200px",
                height: "40px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
                "&.MuiFormLabel-root": {
                  color: "red !important",
                },
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              <MenuItem value="Appetizer">Appetizer</MenuItem>
              <MenuItem value="Chef_special">Chef Special</MenuItem>
              <MenuItem value="Sabjz_e_bahar">Sabjz-E-Bahar</MenuItem>
              <MenuItem value="Dal">Dal</MenuItem>
              <MenuItem value="Rice">Rice</MenuItem>
              <MenuItem value="Bread">Bread</MenuItem>
              <MenuItem value="Beverages">Beverages</MenuItem>
              <MenuItem value="Dessert">Dessert</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <AddItemDialog
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
          setIsUpdate={setIsUpdate}
          updateid={updateid}
        />
      </div>

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
              <TableCell>Price</TableCell>

              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRecords
              data={
                selectedCategory
                  ? diningdata.filter(
                      (item) => item.category === selectedCategory
                    )
                  : diningdata
              } // Filter data based on selected category
              setData={setData}
              setUpdateid={setUpdateid}
              updateid={updateid}
              Isupdate={Isupdate}
              setIsUpdate={setIsUpdate}
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
          <Button onClick={handleDeleteCancel} style={{ color: redcolor }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} style={{ color: redcolor }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function TableRecords({
  data,
  setData,
  setUpdateid,
  setIsUpdate,
  handleClickOpen,
  handleDeleteClick,
}) {
  if (data && data.length > 0) {
    return (
      <>
        {data.map((val, index) => {
          return (
            <TableRow key={val.id}>
              {/* <TableCell component="th" scope="row"> */}
              {/* {val.tokenid} */}

              {/* </TableCell> */}
              <TableCell>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Avatar variant="rounded" src={val.image} />

                  {val.availibity == "false" ? (
                    <IconButton style={{ color: redcolor }}>
                      {" "}
                      <NoMealsIcon />{" "}
                    </IconButton>
                  ) : (
                    ""
                  )}
                </div>
              </TableCell>
              <TableCell>{val.category}</TableCell>
              <TableCell>{val.itemname}</TableCell>
              <TableCell>{val.desc}</TableCell>
              <TableCell>${val.price}</TableCell>

              <TableCell>
                <IconButton
                  style={{ color: redcolor }}
                  //   setUpdateid(val.id); // Set update id before opening
                  onClick={() => {
                    setData(val);
                    setUpdateid(val.id);
                    setIsUpdate(true);
                    handleClickOpen();
                  }}
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
    return <div> No Items Found</div>;
  }
}

export default Menua;
