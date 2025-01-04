import React from "react";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography, Box, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { blueGrey } from "@mui/material/colors";
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

function Carouselimg() {
  const [imagePreview, setImagePreview] = React.useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the preview image state
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  const handleDelete = (index) => {
    const newImages = updateimg.filter((item, i) => i !== index);
    setUpdateimg(newImages);
  };
  const [updateimg, setUpdateimg] = React.useState([
    { no: "1", img: "img1.jpg" },
    { no: "2", img: "img2.jpg" },
    { no: "3", img: "img3.jpg" },
    { no: "4", img: "img4.jpg" },
    { no: "5", img: "img5.jpg" },
    { no: "6", img: "img6.jpg" },
    { no: "7", img: "img7.jpg" },
  ]);

  useEffect(() => {
    const getCarouselimage = async () => {
      const data = await getDocs(imgCollectionRef);
      setImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //   console.log(data);
      // console.log(data.docs.data);
    };
    getCarouselimage();
  }, []);

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
            backgroundColor: "#f57c00",
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
          {updateimg.map((val, index) => (
            <tbody>
              <tr>
                <th scope="row">{val.no}</th>
                <td>
                  {imagePreview && (
                    <Box textAlign="center" mb={4}>
                      <Typography variant="h6" sx={{ color: blueGrey[700] }}>
                        Image Preview:
                      </Typography>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "80%",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}

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
                    onClick={() => handleDelete(index)}
                    sx={{ marginLeft: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </Paper>
    </div>
  );
}

export default Carouselimg;
