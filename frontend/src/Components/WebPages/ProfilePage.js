import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../others/Authentication';
import { findUser, updateUser, deleteUser } from '../data/repository';

function UserProfile(){
  const { setIsAuthenticated, userName } = Authentication();
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formInputData, setFormInputData] = useState({
    name: '',
    password: '',
  });
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const navigate = useNavigate();
  
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await findUser(userName);
      setUserDetails(user);
      setFormInputData({
        name: user.name,
        password: user.password,
      });
    };
    fetchUserData();
  }, [userName]);

  // Handle user sign out
  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/signin');
  };

  // Enable edit mode
  const enableEditMode = () => {
    setIsEditing(true);
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (isConfirmed) {
      await deleteUser(userDetails.email);
      setIsAuthenticated(false);
      navigate('/signin');
    }
  };

  // Handle input change in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate password according to criteria
  const validatePassword = (password) => {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\]|:;'",.<>?/~]).{12,}$/;
    return passwordFormat.test(password);
  };

  // Handle profile update submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validatePassword(formInputData.password)) {
      setPasswordValidationError('Password must meet criteria.');
      return;
    }
    try {
      await updateUser(userDetails.email, {
        name: formInputData.name,
        password: formInputData.password,
      });
      alert("Profile Updated!!");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    localStorage.setItem('userData', JSON.stringify({ ...userDetails, ...formInputData }));
    setIsEditing(false);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <style>
        {`
          .custom-card {
            border-radius: 10px;
          }
          .custom-card-header {
            background-color: #007bff !important;
            color: #fff !important;
            border-radius: 10px 10px 0 0;
          }
          .custom-card-body {
            padding: 20px;
          }
          .profile-details p {
            margin-bottom: 10px;
          }
          .btn-custom {
            border-radius: 5px;
          }
          .btn-margin {
            margin-left: 10px;
          }
        `}
      </style>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow custom-card">
            <div className="card-header custom-card-header">
              <h2 className="card-title mb-0">Profile Information</h2>
            </div>
            <div className="card-body custom-card-body">
              {userDetails && (
                <>
                  {!isEditing ? (
                    <div className="profile-details">
                      <p><strong>Name:</strong> {userDetails.name}</p>
                      <p><strong>Email:</strong> {userDetails.email}</p>
                      <p><strong>Date of Joining:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
                      <button className="btn btn-primary btn-custom" onClick={enableEditMode}>Edit Profile</button>
                      <button className="btn btn-danger btn-custom btn-margin" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile}>
                      <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formInputData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Enter New Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formInputData.password}
                          onChange={handleInputChange}
                          required
                        />
                        {passwordValidationError && <small className="text-danger">{passwordValidationError}</small>}
                      </div>
                      <button type="submit" className="btn btn-primary btn-custom">Save Changes</button>
                    </form>
                  )}
                </>
              )}
              <button className="btn btn-warning btn-custom mt-3" onClick={handleSignOut}>Sign Out</button>
              {updateSuccessMessage && <p className="text-success mt-3">{updateSuccessMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default UserProfile;
