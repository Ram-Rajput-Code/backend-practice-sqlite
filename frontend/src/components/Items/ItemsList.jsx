import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../../api";
import { Link } from "react-router-dom";

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems(); // Refresh list after deletion
  };

  return (
    <div>
      <h1>Items List</h1>
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}{" "}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <ul>
  {items.map((item) => (
    <li key={item.id}>
      {item.name} - {item.description}{" "}
      <Link to={`/items/edit/${item.id}`}>Edit</Link>
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default ItemsList;
