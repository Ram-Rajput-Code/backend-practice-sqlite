import React, { useEffect, useState } from "react";
import { getSliderImages, uploadImage, deleteSliderImage } from "../../../api";

const HomePageSlider = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const response = await getSliderImages();
    setImages(response.data);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    await uploadImage(formData);
    setSelectedFile(null);
    loadImages();
  };

  const handleDelete = async (id) => {
    await deleteSliderImage(id);
    loadImages();
  };

  return (
    <div>
      <h2>Homepage Slider</h2>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      <div className="slider">
        {images.map((img) => (
          <div key={img.id} className="slide">
            <img
              src={`http://localhost:3001${img.image}`}
              alt="Slider"
              width="200"
            />
            <button onClick={() => handleDelete(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSlider;
