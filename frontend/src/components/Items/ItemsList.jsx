// import React, { useEffect, useState } from "react";
// import { getItems, deleteItem } from "../../api";
// import { Link } from "react-router-dom";

// const ItemsList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     loadItems();
//   }, []);

//   const loadItems = async () => {
//     const response = await getItems();
//     setItems(response.data);
//   };

//   const handleDelete = async (id) => {
//     await deleteItem(id);
//     loadItems(); // Refresh list after deletion
//   };

//   return (
//     <div>
//       <h1>Items List</h1>
//       {/* <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.description}{" "}
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </li>
//         ))}
//       </ul> */}
//       <ul>
//   {items.map((item) => (
//     <li key={item.id}>
//       {item.name} - {item.description}{" "}
//       <Link to={`/items/edit/${item.id}`}>Edit</Link>
//       <button onClick={() => handleDelete(item.id)}>Delete</button>
//     </li>
//   ))}
// </ul>
//     </div>
//   );
// };

// export default ItemsList;

//new code

import React, { useEffect, useState } from "react";
import {
  getItems,
  deleteItem,
  createItem,
  getItemById,
  updateItem,
} from "../../api";
import { Button, Modal, Form, Table } from "react-bootstrap";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  const handleAddItem = async (item) => {
    await createItem(item);
    loadItems();
    setShowAddModal(false);
  };

  const handleEditItem = async (id, updatedItem) => {
    await updateItem(id, updatedItem);
    loadItems();
    setShowEditModal(false);
    setEditingItem(null);
  };

  const openEditModal = async (id) => {
    const response = await getItemById(id);
    setEditingItem(response.data);
    setShowEditModal(true);
  };

  return (
    <div>
      <h1>Items List</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Item
      </Button>

      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}{" "}
            <Button variant="warning" onClick={() => openEditModal(item.id)}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => handleDelete(item.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => openEditModal(item.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddItem({
                name: formData.get("name"),
                description: formData.get("description"),
              });
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItem && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleEditItem(editingItem.id, {
                  name: formData.get("name"),
                  description: formData.get("description"),
                });
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  defaultValue={editingItem.name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  defaultValue={editingItem.description}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ItemsList;
