import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authentication } from '../others/Authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, findUser } from "../data/repository";

function SignUpPage() {
  const { setIsAuthenticated, setUserName } = Authentication();
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();

  // Get the current date in ISO format
  function getCurrentDate() {
    const now = new Date();
    return now.toISOString();
  }

  // Handle input changes and update state
  function handleInputChange(e) {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  }

  // Handle form submission for sign up
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Perform validations
    const emailFormat = /^[^\s@]+@gmail\.com$/;
    if (!emailFormat.test(formInputs.email)) {
      setSignUpError('Email must be in the correct format (e.g., example@gmail.com)');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\]|:;'",.<>?/~]).{12,}$/;
    if (!passwordRegex.test(formInputs.password)) {
      setSignUpError('Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.');
      return;
    }

    if (formInputs.password !== formInputs.confirmPassword) {
      setSignUpError('Passwords do not match.');
      return;
    }

    // Check if the email is already registered
    const userExists = await findUser(formInputs.email);
    if (userExists) {
      setSignUpError('Email is already registered in database. Please use a different email.');
      return;
    }

    // Set dateJoined to current date
    const currentDate = getCurrentDate();
    const userData = { ...formInputs, dateJoined: currentDate };

    // Log the user in
    setSignUpError('');
    setIsAuthenticated(true);

    // Send data to repository
    const newUser = await createUser(formInputs);
    setUserName(newUser.email);

    // Clear form data after successful signup
    setFormInputs({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    alert("Sign Up Successful!!");
    navigate('/profile');
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
            <div className="card-body p-5">
              <form onSubmit={handleSignUpSubmit}>
                <h3 className="card-title text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>Sign Up</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formInputs.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    style={{ borderRadius: '5px', borderColor: '#007bff' }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formInputs.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    style={{ borderRadius: '5px', borderColor: '#007bff' }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formInputs.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    style={{ borderRadius: '5px', borderColor: '#007bff' }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formInputs.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    required
                    style={{ borderRadius: '5px', borderColor: '#007bff' }}
                  />
                </div>
                {signUpError && <div className="alert alert-danger mt-3">{signUpError}</div>}
                <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '5px', backgroundColor: '#007bff' }}>Sign Up</button>
                <p className="mt-3 text-center">
                  Already have an account? <Link to="/SignIn" style={{ color: '#007bff' }}>Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SignUpPage;
