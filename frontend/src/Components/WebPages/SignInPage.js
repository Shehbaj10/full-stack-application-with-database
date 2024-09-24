import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authentication } from '../others/Authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import { verifyUser } from "../data/repository";
import { clearCart } from '../data/cartRepo';

function SignInPage() {
  const { setIsAuthenticated, setUserName } = Authentication();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const navigate = useNavigate();

  // Handle form submission for sign in
  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    // Verify user credentials with the database
    const user = await verifyUser(inputEmail, inputPassword);

    if (user !== null) {
      setIsAuthenticated(true);
      setUserName(user.email);
      alert("Sign In Success!!");
      navigate('/');

      // Clear the cart upon successful sign in
      try {
        await clearCart();
      } catch (error) {
        console.error("Error clearing cart: ", error);
        alert("Failed to clear cart. Please try again.");
      }
    } else {
      setSignInError('Invalid username or password');
    }
  }

  return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>Sign In</h2>
            <form onSubmit={handleSignInSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  required
                  style={{ borderRadius: '5px', borderColor: '#007bff' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                  style={{ borderRadius: '5px', borderColor: '#007bff' }}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '5px', backgroundColor: '#007bff' }}>Sign In</button>
              {signInError && <div className="alert alert-danger mt-3">{signInError}</div>}
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/SignUp" style={{ color: '#007bff' }}>Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default SignInPage;
