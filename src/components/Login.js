import React, {useRef, useState} from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../static/SignUp.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState ('')
    const [loading, setLoading] = useState (false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          navigate('/')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    //Show hide password
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };


  return (
  
    <Container className="signup-container">
    <Card className="signup-card">
      <Card.Body>
        <Card.Title>Log in</Card.Title>
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
          <Button disabled={loading} className="w-100 mt-4" variant="primary" type="submit">
            Login
          </Button>
        </Form>
            <div className='w-100 text-center mt-3'>
                <Link to="/forgot-password">Forgot password?</Link>
            </div>
        <div className="already-account-link">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card.Body>
    </Card>
  </Container>
  )
}
