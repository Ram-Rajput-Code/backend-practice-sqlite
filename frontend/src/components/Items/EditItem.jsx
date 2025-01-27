import React, { useState, useEffect } from "react";
import { getItemById, updateItem } from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const response = await getItemById(id);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (err) {
      console.error("Error fetching item:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(id, { name, description });
      alert("Item updated successfully!");
      navigate("/items");
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
