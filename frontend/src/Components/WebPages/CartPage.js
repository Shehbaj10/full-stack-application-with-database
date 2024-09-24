import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCartItems, removeFromCart, clearCart } from '../data/cartRepo';

function ShoppingCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from database when component mounts
  useEffect(() => {
    fetchCartData();
  }, []);

  // Fetch cart items from the database and set state
  const fetchCartData = async () => {
    try {
      const data = await fetchCartItems();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  // Calculate total amount and round it to 2 decimal places
  const totalCartAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const roundedTotalCartAmount = totalCartAmount.toFixed(2);

  // State variables for checkout form
  const [inputCardNumber, setInputCardNumber] = useState('');
  const [inputExpiryDate, setInputExpiryDate] = useState('');
  const [inputCVV, setInputCVV] = useState('');
  const [inputShippingAddress, setInputShippingAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardNumberValidationError, setCardNumberValidationError] = useState('');

  // Handle checkout button click
  function handleCheckout() {
    // Perform credit card validation and other checks
    if (validateCardNumber(inputCardNumber) && validateExpiryDate(inputExpiryDate) && validateCVV(inputCVV) && inputShippingAddress.trim() !== '') {
      setIsModalVisible(true); // Open the modal if all validations pass
    } else {
      alert('Invalid credit card details!');
    }
  }

  // Validate credit card number
  function validateCardNumber(cardNumber) {
    if (!/^\d{16}$/.test(cardNumber)) {
      setCardNumberValidationError('Please enter a 16-digit card number');
      return false;
    }
    setCardNumberValidationError('');
    return true;
  }

  // Check expiry date format and validity
  function validateExpiryDate(expiryDate) {
    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear().toString().slice(-2); // Get last two digits of current year
    return month > 0 && month <= 12 && year >= currentYear;
  }

  // Validate CVV number
  function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
  }

  // Handle modal close action
  function handleModalClose() {
    clearCartData(); // Clear the cart when modal is closed
    navigate('/');
    setIsModalVisible(false);
  }

  // Remove product from cart in database and update state
  async function handleRemoveItemFromCart(itemName) {
    try {
      await removeFromCart(itemName);
      setCartItems(cartItems.filter(item => item.name !== itemName));
    } catch (error) {
      alert(error.message);
    }
  }

  // Clear cart in database and update state
  const clearCartData = async () => {
    navigate('/specials');
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart: ", error);
      alert("Failed to clear cart. Please try again.");
    }
    fetchCartData(); // Refresh cart items
  };

  // Aggregate items by their quantities
  const aggregatedItems = cartItems.reduce((accumulator, item) => {
    if (accumulator[item.name]) {
      accumulator[item.name].quantity += 1;
    } else {
      accumulator[item.name] = { ...item, quantity: 1 };
    }
    return accumulator;
  }, {});

  // Convert aggregated items object back to an array
  const aggregatedCartItems = Object.values(aggregatedItems);

  // Calculate total quantity of all items
  const totalItemQuantity = aggregatedCartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mt-5" style={{ marginBottom: 70 }}>
      <div className="card shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
        <div className="card-header bg-primary text-white" style={{ borderRadius: '10px 10px 0 0' }}>
          <h2 className="card-title mb-0">Shopping Cart</h2>
        </div>
        <div className="card-body">
          {cartItems.length > 0 ? (
            <div className="row">
              <div className="col-md-8">
                {aggregatedCartItems.map((item, index) => (
                  <div key={index} className="card mb-3 shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                    <div className="card-body p-4">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price: ${item.price}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <button className="btn btn-danger" onClick={() => handleRemoveItemFromCart(item.name)}>Remove</button>
                    </div>
                  </div>
                ))}
                <button className="btn btn-warning mt-3" onClick={clearCartData}>Clear Cart</button>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                  <div className="card-body p-4">
                    <h4 className="card-title">Summary</h4>
                    <p className="card-text">Total Quantity: {totalItemQuantity}</p>
                    <h5 className="card-title">Total Amount</h5>
                    <p className="card-text">Total: ${roundedTotalCartAmount}</p>
                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-control mb-2 ${cardNumberValidationError ? 'is-invalid' : ''}`}
                        placeholder="Credit Card Number"
                        value={inputCardNumber}
                        onChange={(e) => setInputCardNumber(e.target.value)}
                        style={{ borderRadius: '5px' }}
                      />
                      {cardNumberValidationError && <div className="invalid-feedback">{cardNumberValidationError}</div>}
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Expiry Date (MM/YY)"
                        value={inputExpiryDate}
                        onChange={(e) => setInputExpiryDate(e.target.value)}
                        style={{ borderRadius: '5px' }}
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="CVV"
                        value={inputCVV}
                        onChange={(e) => setInputCVV(e.target.value)}
                        style={{ borderRadius: '5px' }}
                      />
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        placeholder="Shipping Address"
                        value={inputShippingAddress}
                        onChange={(e) => setInputShippingAddress(e.target.value)}
                        style={{ borderRadius: '5px' }}
                      />
                    </div>
                    <button
                      className="btn btn-success btn-block"
                      onClick={handleCheckout}
                      data-toggle="modal"
                      data-target="#checkoutModal"
                      style={{ borderRadius: '5px' }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
  
      <div className={`modal ${isModalVisible ? 'show' : ''}`} id="checkoutModal" tabIndex="-1" role="dialog" aria-labelledby="checkoutModalLabel" aria-modal="true" style={{ display: isModalVisible ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="checkoutModalLabel">Order Confirmation</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Your order has been successfully placed!</p>
              <p>Summary:</p>
              <ul>
                {aggregatedCartItems.map((item, index) => (
                  <li key={index}>{item.name} - ${item.price} (Quantity: {item.quantity})</li>
                ))}
                <li><strong>Total Quantity: {totalItemQuantity}</strong></li>
                <li><strong>Total Amount Paid: ${roundedTotalCartAmount}</strong></li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default ShoppingCart;
