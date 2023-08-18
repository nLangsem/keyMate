import React, {useRef, useState} from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../static/SignUp.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState ('')
    const [loading, setLoading] = useState (false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
      e.preventDefault()
  
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
  
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate("/")
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
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
        <Card.Title>Sign Up</Card.Title>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className="label-with-icon mt-3"><FaEnvelope /> Email</Form.Label>
            <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="label-with-icon mt-3">
              <FaLock /> Password
            </Form.Label>
            <div className="password-input-group">
              <Form.Control ref={passwordRef}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
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
              <Form.Control ref={passwordConfirmRef}
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm password"
              />
              <span
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <div className="already-account-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </Card.Body>
    </Card>
  </Container>
  )
}
