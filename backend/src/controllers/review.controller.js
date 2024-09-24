const db = require("../database"); 
const Review = db.review;
const User = db.user;
const Product = db.product;

// Retrieve all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new review
exports.addReview = async (req, res) => {
  try {
    const { description, rating, email, product_name } = req.body;
    // Create the review
    const newReview = await Review.create({ description, rating, email, product_name });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get reviews for a product
exports.getReviewsForProduct = async (req, res) => {
  try {
    const { product_name } = req.params;
    
    // Fetch reviews for the product
    const reviews = await Review.findAll({ where: { product_name } });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { email, product_name } = req.params;
    const { description, rating } = req.body;

    // Validate input
    if (!description || !rating) {
      return res.status(400).json({ error: "Description and rating are required" });
    }

    // Check if review exists
    const review = await Review.findOne({ where: { email, product_name } });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the review
    review.description = description;
    review.rating = rating;
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { email, product_name } = req.params;

    // Check if review exists
    const review = await Review.findOne({ where: { email, product_name } });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review
    await review.destroy();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all reviews for a user
exports.getReviewsForUser = async (req, res) => {
  try {
    const { email } = req.params;
    
    // Fetch reviews for the user
    const reviews = await Review.findAll({ where: { email } });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
