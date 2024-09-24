import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Authentication } from '../others/Authentication'; // Custom hook for authentication context
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { isAuthenticated, setIsAuthenticated, userEmail } = Authentication();
  const navigate = useNavigate();

  // Handle user sign out and redirect to sign in page
  function handleSignOut() {
    setIsAuthenticated(false);
    navigate("/signin");
  }

  return (
    <header>
      <style>
        {`
          .custom-bg {
            background-color: #343a40 !important;
          }
          .custom-brand {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.5rem;
          }
          .custom-link {
            font-family: 'Roboto', sans-serif;
            font-size: 1.1rem;
            color: #f8f9fa !important;
            transition: color 0.3s ease;
          }
          .custom-link:hover {
            color: #17a2b8 !important;
          }
          .navbar-toggler {
            border: none;
          }
          .navbar-toggler-icon {
            color: #f8f9fa;
          }
        `}
      </style>
      <div className="container-fluid custom-bg py-3">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand custom-brand" to="/">S O I L   H A V E N</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/">Home</Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link custom-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link custom-link" to="/specials">Products</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link custom-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link custom-link" to="/reviews">Reviews</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link custom-link" onClick={handleSignOut}>Sign Out</button>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link custom-link">Welcome, {userEmail}!</span>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link custom-link" to="/signin">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
  
}

export default Header;
