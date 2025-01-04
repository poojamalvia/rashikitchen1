import React from 'react'
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
      const [cmenu, setCmenu] = React.useState([
          {
            tokenid: "1",
            category: "Appetizer",
            item: "samosa",
            desc:"It is delicious product made with milk and palm sugar decorated with cashews and almonds",
            image:`https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800`,
            price:"10"
          },
          {
            tokenid: "2",
            category: "50",
            item: "3.5",
            desc: "confirmed",
            price:"10"
          },
          {
            tokenid: "3",
            category: "50",
            item: "3.5",
            desc: "confirmed",
            price:"10"
          },
          {
            tokenid: "4",
            category: "50",
            item: "3.5",
            desc: "confirmed",
            price:"10"
          },
          {
            tokenid: "5",
            category: "50",
            item: "3.5",
            desc: "confirmed",
            price:"10"
          },
        ]);
      
       const [age, setAge] = React.useState("");
      
        const handleChange = (event) => {
          setAge(event.target.value);
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

      function AddItemDialog(props)
      {
        const { onClose, open } = props;
        
        return(
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
    }}>

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

          <form>
            {/* Catering Category Selection */}
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Catering Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  label="Catering Category"
                  defaultValue=""
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Choose a category</em>
                  </MenuItem>
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
              </FormControl>
            </Box>

            {/* Item Name Field */}
            <Box mb={3}>
              <TextField
                required
                fullWidth
                id="item-name"
                label="Item Name"
                type="text"
                variant="outlined"
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </Box>

            {/* Description Field */}
            <Box mb={3}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                multiline
                rows={4}
                style={{ backgroundColor: "#f5f5f5" }}
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
          </form>
        </Box>
       </Container>
    </Dialog>
  )

      }
  return (
    <div>
         <Typography variant="h4" align="center" gutterBottom>
            Update Catering Menu Item
          </Typography>
            <Button 
            type="button"
                  style={{
                    backgroundColor:"#f57c00",
                    border: "none",
                    color: "white",
                    marginBottom: "20px" ,
                    borderRadius: "5px"}}

                    onClick={handleClickOpen} startIcon={<EditIcon />} >
                Add Item
            </Button>

        <AddItemDialog
         open={open}
         onClose={handleClose}/>


           

      <Box>
      <TableContainer component={Paper}>
        <Table aria-label="customer order table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>
              <InputLabel id="demo-simple-select-standard-label">Choose Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Choose Category"
          sx={{ width: '200px', height: '40px' }}
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
        </Select></TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Description</TableCell>
              
              <TableCell>Price</TableCell>
              <TableCell>Update/Delete Item</TableCell>
            </TableRow>
          </TableHead>
          {cmenu.map((val,index) => (
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">{val.tokenid}</TableCell>
                <TableCell><Avatar variant="rounded" src={val.image}/></TableCell>
                <TableCell>{val.category}</TableCell>
                <TableCell>{val.item}</TableCell>
                <TableCell>{val.desc}</TableCell>
                
                <TableCell>${val.price}</TableCell>
                <TableCell>
                  <Button 
                  type="button"
                  style={{
                    backgroundColor:"#f57c00",
                    border: "none",
                    color: "white",
                    borderRadius: "5px"}}
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}>Update</Button>
                   <IconButton color="error" onClick={() => alert('Delete item')}><DeleteIcon /></IconButton>
                   
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>

     
    </Box>

    </div>
  )
}

export default Cateringa

// import React from 'react'
// import Rating from "@mui/material/Rating";
// import Avatar from "@mui/material/Avatar";
// import { TextField, TableCell, TableBody, TableRow, TableHead, Table, Paper, TableContainer, Button, Box, Container, Select, MenuItem, InputLabel, FormControl, Typography, Dialog, IconButton } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { styled } from "@mui/material/styles";

// function Cateringa() {
//     const VisuallyHiddenInput = styled("input")({
//         clip: "rect(0 0 0 0)",
//         clipPath: "inset(50%)",
//         height: 1,
//         overflow: "hidden",
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         whiteSpace: "nowrap",
//         width: 1,
//     });

//     const [cmenu, setCmenu] = React.useState([
//         {
//             tokenid: "1",
//             category: "Appetizer",
//             item: "Samosa",
//             desc: "A crispy snack filled with spiced potatoes and peas.",
//             image: "https://via.placeholder.com/150",
//             price: "10"
//         },
//         {
//             tokenid: "2",
//             category: "Dessert",
//             item: "Gulab Jamun",
//             desc: "Sweet dough balls soaked in syrup.",
//             price: "5"
//         },
//     ]);

//     const [age, setAge] = React.useState("");
//     const [open, setOpen] = React.useState(false);
//     const [imagePreview, setImagePreview] = React.useState(null);

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setImagePreview(imageUrl);
//         }
//     };

//     function AddItemDialog(props) {
//         const { onClose, open } = props;

//         return (
//             <Dialog onClose={handleClose} open={open} PaperProps={{ style: { borderRadius: "12px", boxShadow: "0px 8px 16px rgba(0,0,0,0.1)" } }}>
//                 <Container maxWidth="sm" style={{ padding: "40px 20px" }}>
//                     <Box sx={{ border: "2px solid #f57c00", borderRadius: "8px", padding: "30px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
//                         <Typography variant="h4" align="center" gutterBottom>
//                             Update Catering Menu Item
//                         </Typography>

//                         <form>
//                             {/* Catering Category Selection */}
//                             <Box mb={3}>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="category-label">Catering Category</InputLabel>
//                                     <Select labelId="category-label" id="category" label="Catering Category" fullWidth>
//                                         <MenuItem value="">
//                                             <em>Choose a category</em>
//                                         </MenuItem>
//                                         <MenuItem value="appetizer">Appetizer</MenuItem>
//                                         <MenuItem value="dessert">Dessert</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Box>

//                             {/* Item Name Field */}
//                             <Box mb={3}>
//                                 <TextField required fullWidth id="item-name" label="Item Name" variant="outlined" />
//                             </Box>

//                             {/* Description Field */}
//                             <Box mb={3}>
//                                 <TextField required fullWidth id="description" label="Description" variant="outlined" multiline rows={4} />
//                             </Box>

//                             {/* Image Preview */}
//                             {imagePreview && (
//                                 <Box mb={3} textAlign="center">
//                                     <Typography variant="subtitle1" gutterBottom>
//                                         Image Preview:
//                                     </Typography>
//                                     <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "8px" }} />
//                                 </Box>
//                             )}

//                             {/* File Upload Button */}
//                             <Box mb={3}>
//                                 <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
//                                     Upload Image
//                                     <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//                                 </Button>
//                             </Box>

//                             {/* Submit Button */}
//                             <Box>
//                                 <Button variant="contained" color="primary" fullWidth type="submit" style={{ backgroundColor: "#f57c00", padding: "12px 0" }}>
//                                     Add/Update Item
//                                 </Button>
//                             </Box>
//                         </form>
//                     </Box>
//                 </Container>
//             </Dialog>
//         );
//     }

//     return (
//         <div>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Update Catering Menu Item
//             </Typography>
//             <Button variant="contained" color="secondary" onClick={handleClickOpen} startIcon={<EditIcon />} style={{ marginBottom: "20px" }}>
//                 Add Item
//             </Button>

//             <AddItemDialog open={open} onClose={handleClose} />

//             <Box>
//                 <TableContainer component={Paper}>
//                     <Table aria-label="catering menu table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Number</TableCell>
//                                 <TableCell>Image</TableCell>
//                                 <TableCell>Category</TableCell>
//                                 <TableCell>Item Name</TableCell>
//                                 <TableCell>Description</TableCell>
//                                 <TableCell>Price</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {cmenu.map((item) => (
//                                 <TableRow key={item.tokenid}>
//                                     <TableCell>{item.tokenid}</TableCell>
//                                     <TableCell>
//                                         <Avatar variant="rounded" src={item.image} />
//                                     </TableCell>
//                                     <TableCell>{item.category}</TableCell>
//                                     <TableCell>{item.item}</TableCell>
//                                     <TableCell>{item.desc}</TableCell>
//                                     <TableCell>${item.price}</TableCell>
//                                     <TableCell>
//                                         <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleClickOpen}>Update</Button>&nbsp;
//                                         <IconButton color="error" onClick={() => alert('Delete item')}><DeleteIcon /></IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default Cateringa;