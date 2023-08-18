import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function EditItemModal({
  showEditModal,
  handleCloseEditModal,
  handleUpdateClick,
  itemToEdit
}) {
  const [editedItem, setEditedItem] = useState(itemToEdit);

  const handleFieldChange = (fieldName, value) => {
    setEditedItem((prevItem) => ({
      ...prevItem,
      [fieldName]: value
    }));
  };

  const handleUpdate = () => {
    handleUpdateClick(itemToEdit.id, editedItem);
    handleCloseEditModal();
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              value={editedItem.website}
              onChange={(e) => handleFieldChange('website', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={editedItem.username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={editedItem.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
