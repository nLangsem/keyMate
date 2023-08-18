import React, { useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "../static/SignUp.css";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetpassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetpassword(emailRef.current.value);
      setMessage("Check inbox for further information");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Container className="signup-container">
      <Card className="signup-card">
        <Card.Body>
          <Card.Title>Password Reset</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className="label-with-icon mt-3">
                <FaEnvelope /> Email
              </Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter email"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-4"
              variant="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
          <div className="already-account-link">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
