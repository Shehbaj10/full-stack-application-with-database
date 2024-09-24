import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './Components/fragments/Footer';
import Header from './Components/fragments/Header';
import HomePage from './Components/WebPages/HomePage';
import ProfilePage from './Components/WebPages/ProfilePage';
import SignInPage from './Components/WebPages/SignInPage';
import SignUpPage from './Components/WebPages/SignUpPage';
import SpecialsPage from './Components/WebPages/SpecialsPage';
import CartPage from './Components/WebPages/CartPage';
import ReviewsPage from './Components/WebPages/ReviewsPage';
import { AuthContextProvider } from './Components/others/Authentication';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes> 
          <Route exact path="/" element={<HomePage />} /> 
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/specials" element={<SpecialsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
