import React from 'react';
import { Navbar, Nav, Button, Alert, Dropdown } from 'react-bootstrap';
// eslint-disable-next-line
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function AppNavbar({ currentUser, logout, error }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand style={{ marginLeft: '20px' }}>KeyMate</Navbar.Brand>
      <Nav className="ml-auto align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="profileDropdown">
            Welcome, {currentUser.email}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/update-profile">
              Update Profile
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="outline-light" onClick={logout} style={{ marginLeft: '10px', marginRight: '10px' }}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
}
