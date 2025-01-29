// import React, { useEffect, useState } from "react";
// import { getSliderImages, uploadImage, deleteSliderImage, updateSliderImage } from "../../../api";

// const HomePageSliderAdmin = () => {
//   const [images, setImages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [editImageId, setEditImageId] = useState(null); // Track which image is being edited

//   useEffect(() => {
//     loadImages();
//   }, []);

//   const loadImages = async () => {
//     const response = await getSliderImages();
//     setImages(response.data);
//   };

//   const handleFileChange = (event, imageId = null) => {
//     setSelectedFile(event.target.files[0]);
//     setEditImageId(imageId); // Store the image ID for editing
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     if (editImageId) {
//       // If editing, update the image
//       await updateSliderImage(editImageId, formData);
//     } else {
//       // Otherwise, upload a new image
//       await uploadImage(formData);
//     }

//     setSelectedFile(null);
//     setEditImageId(null);
//     loadImages();
//   };

//   const handleDelete = async (id) => {
//     await deleteSliderImage(id);
//     loadImages();
//   };

//   return (
//     <div>
//       <h2>Homepage Slider</h2>

//       <input type="file" onChange={(e) => handleFileChange(e)} />
//       <button onClick={handleUpload} disabled={!selectedFile}>
//         {editImageId ? "Update Image" : "Upload Image"}
//       </button>

//       <div className="slider">
//         {images.map((img) => (
//           <div key={img.id} className="slide">
//             <img
//               src={`http://localhost:3001${img.image}`}
//               alt="Slider"
//               width="200"
//             />
//             <input
//               type="file"
//               onChange={(e) => handleFileChange(e, img.id)}
//             />
//             <button onClick={handleUpload} disabled={!selectedFile || editImageId !== img.id}>
//               Update
//             </button>
//             <button onClick={() => handleDelete(img.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePageSliderAdmin;  


//new code


import React, { useEffect, useState } from "react";
import {
  getSliderImages,
  uploadImage,
  deleteSliderImage,
  updateSliderImage,
} from "../../../api";
import ImageSlider from "./ImageSlider"; // Import ImageSlider component

const HomePageSliderAdmin = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editImageId, setEditImageId] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const response = await getSliderImages();
    setImages(response.data);
  };

  const handleFileChange = (event, imageId = null) => {
    setSelectedFile(event.target.files[0]);
    setEditImageId(imageId);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    if (editImageId) {
      await updateSliderImage(editImageId, formData);
    } else {
      await uploadImage(formData);
    }

    setSelectedFile(null);
    setEditImageId(null);
    loadImages();
  };

  const handleDelete = async (id) => {
    await deleteSliderImage(id);
    loadImages();
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Homepage Slider</h2>

      <div className="mb-3">
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="form-control"
        />
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="btn btn-primary mt-2"
        >
          {editImageId ? "Update Image" : "Upload Image"}
        </button>
      </div>

      {/* Image Slider Component */}
     

      <div className="slider mt-4">
        {images.map((img) => (
          <div key={img.id} className="slide text-center">
            <img
              src={`http://localhost:3001${img.image}`}
              alt="Slider"
              width="200"
              className="img-thumbnail"
            />
            <input
              type="file"
              onChange={(e) => handleFileChange(e, img.id)}
              className="form-control mt-2"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || editImageId !== img.id}
              className="btn btn-warning mx-2"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(img.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSliderAdmin;
