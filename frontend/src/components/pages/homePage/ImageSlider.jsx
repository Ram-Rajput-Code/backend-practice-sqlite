// import React from "react";
// import { Carousel } from "react-bootstrap";
// import { Card } from "@mui/material";

// const ImageSlider = ({ images }) => {
//   return (
//     <Card sx={{ maxWidth: 800, margin: "auto", padding: 2, boxShadow: 3 }}>
//       <h3 className="text-center">Image Slider</h3>
//       {images?.length > 0 ? (
//   <Carousel>
//     {images.map((img, index) => (
//       <Carousel.Item key={index}>
//         <img
//           className="d-block w-100"
//           src={`http://localhost:3001${img.image}`}
//           alt={`Slide ${index + 1}`}
//           style={{ maxHeight: "400px", objectFit: "cover" }}
//         />
//       </Carousel.Item>
//     ))}
//   </Carousel>
// ) : (
//   <p className="text-center">No images available</p>
// )}

//     </Card>
//   );
// };

// export default ImageSlider;


//new code 
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Card, Typography, CircularProgress } from "@mui/material";
import { getSliderImages } from "../../../api"; // Adjust path based on your project structure

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await getSliderImages();
      setImages(response?.data || []); // Ensure images is always an array
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]); // Prevents undefined error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", padding: 2, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Image Slider
      </Typography>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <CircularProgress />
        </div>
      ) : images.length > 0 ? (
        <Carousel>
          {images.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`http://localhost:3001${img.image}`}
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: "400px", objectFit: "cover", borderRadius: "10px" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Typography align="center" color="textSecondary">
          No images available
        </Typography>
      )}
    </Card>
  );
};

export default ImageSlider;
