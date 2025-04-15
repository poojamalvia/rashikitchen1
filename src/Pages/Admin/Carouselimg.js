import React from "react";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography, Box, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { blueGrey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { redcolor } from "../../Design";

function Carouselimg() {
  const imgCollectionRef = collection(db, "carouselimage");
  const [image, setImage] = React.useState([]);
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
  useEffect(() => {
    const getCarouselImages = async () => {
      try {
        const data = await getDocs(imgCollectionRef);
        setImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    getCarouselImages();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        const imageData = reader.result; // This is the base64 data of the image

        // Add to Firestore
        try {
          await addDoc(imgCollectionRef, {
            image: imageData, // Store the image data in Firestore
          });

          // Update the local state with the new image for preview
          setImage((prevImages) => [...prevImages, imageData]);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  
  // const handleDelete = (index) => {
  //    const newImages = image.filter((item, i) => i !== index);
  //    setImage(newImages);
  // };
  const handleDelete = async (id) => {
    try {
      // Remove image from Firestore
      await deleteDoc(doc(db, "carouselimage", id));
  
      // Remove from state
      setImage((prevImages) => prevImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleEdit = (id) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async function () {
          const imageData = reader.result;
  
          try {
            // Update Firestore with new image
            const imageRef = doc(db, "carouselimage", id);
            await updateDoc(imageRef, { image: imageData });
  
            // Update state
            setImage((prevImages) =>
              prevImages.map((img) =>
                img.id === id ? { ...img, image: imageData } : img
              )
            );
          } catch (error) {
            console.error("Error updating image: ", error);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    input.click();
  };

  //const addcarouselimage = async (data) => {
  // await addDoc(imgCollectionRef, reader.result);

  //     setDiningdata([
  //       ...diningdata,
  //       {
  //         // no: no, // This will be the new no
  //         category: data.category,
  //         itemname: data.itemname,
  //         price: data.price,
  //         desc: data.desc,
  //       },
  //     ]);
  // };

  

  return (
    <div style={{ padding: "30px", backgroundColor: "#f0f0f0" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: blueGrey[800], fontWeight: "bold" }}
      >
        Update Carousel Images
      </Typography>
      <Box textAlign="center" mb={4}>
        <Button
          component="label"
          variant="contained"
          style={{
            backgroundColor: redcolor,
            width: "20%",
            padding: "10px 20px",
            textTransform: "capitalize",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
          startIcon={<CloudUploadIcon />}
        >
          Upload New Image
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
      </Box>

      {/* Image Preview Section */}
      <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px" }}>
        <table className="table" style={{ width: "100%", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#f57c00", color: "#fff" }}>
              <th scope="col">Number</th>
              <th scope="col">Images</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {image.map((val, index) => (
              <tr>
                <td scope="row">{val.no}</td>
                <td>
                  <Box textAlign="center" mb={4}>
                    <img
                      src={val.image}
                      alt="Preview"
                      style={{
                        maxWidth: "80%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* <img
                    src={val.img}
                    alt={`Carousel ${val.no}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      objectFit: "cover",
                    }}
                  /> */}
                </td>
                <td>
                  {" "}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(val.id)}
                    sx={{ marginLeft: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(val.id)} sx={{ marginRight: 1 }}>
                  <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </div>
  );
}

export default Carouselimg;
