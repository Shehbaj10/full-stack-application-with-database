import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Retrieve all reviews from the server
async function getAllReviews() {
  const res = await axios.get(`${BASE_URL}/api/reviews`);
  return res.data;
}

// Retrieve reviews for a specific item by item name from the server
async function getReviewsByProduct(itemName) {
  const res = await axios.get(`${BASE_URL}/api/products/${itemName}/reviews`);
  return res.data;
}

// Retrieve reviews by a specific user from the server
async function getUserReviews(userEmail) {
  const res = await axios.get(`${BASE_URL}/api/users/${userEmail}/reviews`);
  return res.data;
}

// Submit a new review to the server
async function submitReview(newReview) {
  const res = await axios.post(`${BASE_URL}/api/reviews/add`, newReview);
  return res.data;
}

// Modify an existing review on the server
async function modifyReview(email, product, updatedReview) {
  const res = await axios.put(`${BASE_URL}/api/reviews/${email}/${product}`, updatedReview);
  return res.data;
}

// Remove a review from the server
async function removeReview(email, product) {
  const res = await axios.delete(`${BASE_URL}/api/reviews/delete/${email}/${product}`);
  return res.data;
}

export {
  getAllReviews,
  getReviewsByProduct,
  getUserReviews,
  submitReview,
  modifyReview,
  removeReview
};
