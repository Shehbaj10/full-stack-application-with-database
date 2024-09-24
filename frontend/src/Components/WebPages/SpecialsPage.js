import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { getAllProducts } from '../data/productRepo';
import { addToCart } from '../data/cartRepo';
import { submitReview } from '../data/reviewRepo';
import { Authentication } from '../others/Authentication';

function SpecialsPage() {
  const [specials, setSpecials] = useState([]);
  const [standardProducts, setStandardProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [currentProductName, setCurrentProductName] = useState(null);
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviewRating, setReviewRating] = useState(1);
  const { userName } = Authentication();

  // Fetch specials and standard products data when component mounts
  useEffect(() => {
    loadProductData();
  }, []);

  // Fetch all products data and separate specials and standard products
  const loadProductData = async () => {
    try {
      const allProducts = await getAllProducts();
      const specialProducts = allProducts.filter(product => product.inSpecial === 'Yes');
      const standardProductList = allProducts.filter(product => product.inSpecial === 'No');
      setSpecials(specialProducts);
      setStandardProducts(standardProductList);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Add products to cart in the database
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
  };

  // Handle opening the review modal
  const handleOpenReviewModal = (productName) => {
    setCurrentProductName(productName);
    setIsModalVisible(true);
  };

  // Handle closing the review modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentProductName(null);
  };

  // Create a new review for the selected product
  const handleCreateReview = async () => {
    const newReview = {
      description: reviewDescription,
      rating: parseInt(reviewRating),
      email: userName,
      product_name: currentProductName
    };

    try {
      await submitReview(newReview);
      setReviewDescription('');
      setReviewRating(1);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Calculate max length for text input based on average word length
  const getMaxLengthInWords = (maxWords) => {
    const averageWordLength = 5; // Assuming an average word length of 5 characters
    return maxWords * averageWordLength;
  };

  return (
    <div className="container mt-5" style={{ marginBottom: 70 }}>
      <div className="specials-container">
        <h2 className="mb-4">Specials of the Week</h2>
        {specials.length > 0 ? (
          <div className="row">
            {specials.map((special, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Card style={{ 
                  backgroundColor: '#FFE0B2', 
                  border: '1px solid #ddd', 
                  borderRadius: '15px', 
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', 
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  padding: '20px'
                }}>
                  <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{special.name}</Card.Title>
                    <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>{special.description}</Card.Text>
                    <Card.Text className="mb-2" style={{ color: "red", fontWeight: 'bold' }}>Price: ${special.price}</Card.Text>
                    <Button variant="primary" onClick={() => handleAddToCart(special)}>Add to Cart</Button>
                    <Button variant="primary" style={{ marginLeft: 5, backgroundColor: 'orange', border: 'none' }} onClick={() => handleOpenReviewModal(special.name)}>
                      Leave a Review
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-specials">No specials available this week.</p>
        )}

        <div className="mt-5">
          <h2 className="mb-4">Standard Products</h2>
          {standardProducts.length > 0 ? (
            <div className="row">
              {standardProducts.map((product, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card style={{ 
                    backgroundColor: '#C8E6C9', 
                    border: '1px solid #ddd', 
                    borderRadius: '15px', 
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', 
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                    padding: '20px'
                  }}>
                    <Card.Body>
                      <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{product.name}</Card.Title>
                      <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>{product.description}</Card.Text>
                      <Card.Text className="mb-2" style={{ color: "green", fontWeight: 'bold' }}>Price: ${product.price}</Card.Text>
                      <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                      <Button variant="primary" style={{ marginLeft: 5, backgroundColor: 'orange', border: 'none' }} onClick={() => handleOpenReviewModal(product.name)}>
                        Leave a Review
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-products">No standard products available.</p>
          )}
        </div>
      </div>
      <Modal show={isModalVisible} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p className="text-center text-primary font-weight-bold">
              Review Form for Product: <span className="text-danger">{currentProductName}</span>
            </p>
            <Form.Group controlId="reviewText">
              <Form.Label>Review (Maximum 100 words)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={getMaxLengthInWords(100)}
                required
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="stars">
              <Form.Label>Stars</Form.Label>
              <Form.Control
                as="select"
                required
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );



}

export default SpecialsPage;
