import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteItemModal({ showDeleteModal, handleCloseDeleteModal, handleDelete }) {
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDeleteModal}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
