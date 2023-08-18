import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { firestore } from '../firebase';
import EntryModal from './Modals/Modal';
import AppNavbar from './Navbar'; // Import the new Navbar component
import DeleteItemModal from './Modals/DeleteItemModal'; // Import the new component
import EditItemModal from './Modals/EditItemModal'; // Import the new component
import '../static/Dashboard.css';

export default function Dashboard() {
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passData, setPassData] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

// eslint-disable-next-line
const handleLogout = async () => {
  setError('');

  try {
    await logout();
    navigate('/login');
  } catch {
    setError('Failed logging out');
  }
};

  const handleTogglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const fetchPassData = async () => {
      try {
        if (!currentUser) return;
        const req = await firestore
          .collection('users')
          .doc(currentUser.uid)
          .collection('passwords')
          .orderBy('postedOn', 'desc')
          .get();

        const tempPassData = req.docs.map((pass) => ({ ...pass.data(), id: pass.id }));
        setPassData(tempPassData);
      } catch (error) {
        console.error('Error fetching pass data:', error);
      }
    };
  
    fetchPassData();
  }, [currentUser]);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = async (id) => {
    setShowDeleteModal(false);
    try {
      await firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('passwords')
        .doc(id)
        .delete();

      setPassData((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };
// Inside your useEffect for fetching pass data
useEffect(() => {
  const unsubscribe = firestore
    .collection('users')
    .doc(currentUser.uid)
    .collection('passwords')
    .orderBy('postedOn', 'desc')
    .onSnapshot((querySnapshot) => {
      const tempPassData = querySnapshot.docs.map((pass) => ({
        ...pass.data(),
        id: pass.id,
      }));
      setPassData(tempPassData);
    });

  return unsubscribe; // Clean up the listener when component unmounts
}, [currentUser]);

// In the handleAddEntry function
const handleAddEntry = async (newEntry) => {
  setShowModal(false);
  try {
    // Add new entry to Firestore
    await firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('passwords')
      .add(newEntry);
    
    // Data will be updated automatically by the listener
  } catch (error) {
    console.error('Error adding entry:', error);
  }
};


  const handleEditClick = (data) => {
    setItemToEdit(data);
    setShowEditModal(true);
  };

  const handleUpdateClick = async (id, updatedData) => {
    setShowEditModal(false);
    try {
      await firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('passwords')
        .doc(id)
        .update(updatedData);

      const req = await firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('passwords')
        .orderBy('postedOn', 'desc')
        .get();

      const tempPassData = req.docs.map((pass) => ({ ...pass.data(), id: pass.id }));
      setPassData(tempPassData);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  }

  return (
    <div>
  <AppNavbar currentUser={currentUser} logout={logout} error={error} /> {/* Render the Navbar component */}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Card style={{ width: '80%' }}>
          <Card.Body>
            <div className="d-flex justify-content-end mb-3">
              <Button variant="primary" onClick={handleShowModal}>
                <BsPlus className="mr-1" /> Add
              </Button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Website</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passData.map((data) => (
                  <tr key={data.id}>
                     <td>
        {data.website}
        <Button
          variant="link"
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(data.website);
          }}
        >
          <FaCopy />
        </Button>
      </td>
      <td>
        {data.username}
        <Button
          variant="link"
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(data.username);
          }}
        >
          <FaCopy />
        </Button>
      </td>
      <td>
        {data.password}
        <Button
          variant="link"
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(data.password);
          }}
        >
          <FaCopy />
        </Button>
      </td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => handleEditClick(data)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => {
                          setItemToDelete(data.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
      <EntryModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleTogglePassword={handleTogglePassword}
        showPassword={showPassword}
        handleAddEntry={handleAddEntry}
      />
      <DeleteItemModal
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={() => handleDelete(itemToDelete)}
      />
      {itemToEdit && (
        <EditItemModal
          showEditModal={showEditModal}
          handleCloseEditModal={() => {
            setShowEditModal(false);
            setItemToEdit(null);
          }}
          handleUpdateClick={handleUpdateClick}
          itemToEdit={itemToEdit}
        />
      )}
    </div>
  );
}
