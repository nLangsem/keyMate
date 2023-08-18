import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { firestore } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth instead


export default function EntryModal({
  showModal,
  handleCloseModal,
  handleTogglePassword,
  showPassword,
}) {
  const [website, setWebsite] = useState(""); // Set initial value as an empty string
  const [username, setUsername] = useState(""); // Set initial value as an empty string
  const [password, setPassword] = useState(""); // Set initial value as an empty string

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!currentUser) return;

      await firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection("passwords")
        .add({
          website,
          username,
          password,
          postedOn: new Date(),
        });

      handleCloseModal();
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  }

  // Reset input fields when modal is shown
  const handleModalShow = () => {
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} onShow={handleModalShow}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="password-input">
              <div className="password-field">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span className="password-toggle" onClick={handleTogglePassword}>
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
