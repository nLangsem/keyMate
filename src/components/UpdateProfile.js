import React, { useRef, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "../static/SignUp.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
  
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      try {
        promises.push(updateEmail(emailRef.current.value));
      } catch (error) {
        setError("Failed to update email: " + error.message); // Updated error message
        setLoading(false);
        return;
      }
    }
  
    if (passwordRef.current.value) {
      try {
        promises.push(updatePassword(passwordRef.current.value));
      } catch (error) {
        setError("Failed to update password: " + error.message); // Updated error message
        setLoading(false);
        return;
      }
    }
  
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("Failed to update account: " + error.message); // Updated error message
      })
      .finally(() => {
        setLoading(false);
      });
  }
  
  

  //Show hide password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Container className="signup-container">
      <Card className="signup-card">
        <Card.Body>
          <Card.Title>Update Profile</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className="label-with-icon mt-3">
                <FaEnvelope /> Email
              </Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="label-with-icon mt-3">
                <FaLock /> Password
              </Form.Label>
              <div className="password-input-group">
                <Form.Control
                  ref={passwordRef}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Leave blank to keep same password"
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label className="label-with-icon mt-3">
                <FaLock /> Confirm Password
              </Form.Label>
              <div className="password-input-group">
                <Form.Control
                  ref={passwordConfirmRef}
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Leave blank to keep same password"
                />
                <span
                  className="password-toggle-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-4"
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          </Form>
          <div className="already-account-link">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
