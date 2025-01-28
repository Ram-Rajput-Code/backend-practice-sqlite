import React, { useEffect, useState } from "react";
import {
  getHomeCards,
  deleteHomeCard,
  createHomeCard,
  getHomeCardById,
  updateHomeCard,
} from "../api";
import { Button, Modal, Form, Table } from "react-bootstrap";

const HomeCardsList = () => {
  const [cards, setCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const response = await getHomeCards();
    setCards(response.data);
  };

  const handleDelete = async (id) => {
    await deleteHomeCard(id);
    loadCards();
  };

  const handleAddCard = async (card) => {
    await createHomeCard(card);
    loadCards();
    setShowAddModal(false);
  };

  const handleEditCard = async (id, updatedCard) => {
    await updateHomeCard(id, updatedCard);
    loadCards();
    setShowEditModal(false);
    setEditingCard(null);
  };

  const openEditModal = async (id) => {
    const response = await getHomeCardById(id);
    setEditingCard(response.data);
    setShowEditModal(true);
  };

  return (
    <div>
      <h1>Home Cards</h1>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Card
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Icon</th>
            <th>Heading</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={card.id}>
              <td>{index + 1}</td>
              <td>{card.icon}</td>
              <td>{card.heading}</td>
              <td>{card.content}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => openEditModal(card.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(card.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddCard({
                icon: formData.get("icon"),
                heading: formData.get("heading"),
                content: formData.get("content"),
              });
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                name="icon"
                type="text"
                placeholder="Enter icon URL"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                name="heading"
                type="text"
                placeholder="Enter heading"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                name="content"
                type="text"
                placeholder="Enter content"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingCard && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleEditCard(editingCard.id, {
                  icon: formData.get("icon"),
                  heading: formData.get("heading"),
                  content: formData.get("content"),
                });
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Icon</Form.Label>
                <Form.Control
                  name="icon"
                  type="text"
                  defaultValue={editingCard.icon}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Heading</Form.Label>
                <Form.Control
                  name="heading"
                  type="text"
                  defaultValue={editingCard.heading}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  name="content"
                  type="text"
                  defaultValue={editingCard.content}
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

export default HomeCardsList;
