import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllReviews, removeReview } from '../data/reviewRepo';
import { Authentication } from '../others/Authentication';
import { getAllReplies, submitReply } from '../data/replyRepo';
import { useNavigate } from "react-router-dom";

function ReviewsPage() {
  const [reviewList, setReviewList] = useState([]);
  const { userName } = Authentication();
  const [replyText, setReplyText] = useState('');
  const [replyList, setReplyList] = useState([]);
  const navigate = useNavigate();

  // Fetch reviews and replies when component mounts
  useEffect(() => {
    loadReviews();
    loadReplies();
  }, []);

  // Fetch all reviews from the database and set state
  const loadReviews = async () => {
    try {
      const reviewsData = await getAllReviews();
      setReviewList(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Fetch all replies from the database and set state
  const loadReplies = async () => {
    try {
      const repliesData = await getAllReplies();
      setReplyList(repliesData);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  // Filter user reviews
  const userReviews = reviewList.filter(review => review.email === userName);
  // Filter other users' reviews
  const otherReviews = reviewList.filter(review => review.email !== userName);

  // Handle review deletion
  const handleDeleteReview = async (productName) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      try {
        await removeReview(userName, productName);
        alert("Review Deleted Successfully!");
        loadReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (reviewDescription) => {
    try {
      const newReply = {
        text: replyText,
        description: reviewDescription,
        email: userName,
      };
      await submitReply(newReply);
      setReplyText('');
      alert("Reply posted!!");
      navigate('/reviews'); // Refresh the reviews page
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  // Calculate max length for text input based on average word length
  const getMaxLengthInWords = (maxWords) => {
    const averageWordLength = 5; // Assuming an average word length of 5 characters
    return maxWords * averageWordLength;
  };

  return (
    <div className="container mt-5" style={{ marginBottom: 70 }}>
      <h2 className="mb-4">Your Reviews</h2>
      {userReviews.length > 0 ? (
        <div>
          {userReviews.map((review, index) => (
            <div key={index} className="card mb-4 shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
              <div className="card-body p-4">
                <h5 className="card-title">Review {index + 1}</h5>
                <p className="card-text" style={{ color: "brown" }}><strong>Product Name:</strong> {review.product_name}</p>
                <p className="card-text"><strong>Rating:</strong> {review.rating}</p>
                <p className="card-text"><strong>Review:</strong> {review.description}</p>
                <h5 className="mt-4">Replies:</h5>
                {replyList
                  .filter(reply => reply.description === review.description)
                  .map((reply, replyIndex) => (
                    <div key={replyIndex} className="card mb-3 shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                      <div className="card-body p-3">
                        <p className="card-text">{reply.text}</p>
                        <p className="card-text">
                          <small className="text-muted">User: {reply.email}</small>
                        </p>
                      </div>
                    </div>
                  ))}
                <button className="btn btn-danger mt-3" onClick={() => handleDeleteReview(review.product_name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews found for your account.</p>
      )}
  
      <h2 className="mt-5 mb-4">Other Reviews</h2>
      {otherReviews.map((review, index) => (
        <div key={index} className="card mb-4 shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
          <div className="card-body p-4">
            <h5 className="card-title">Review {index + 1}</h5>
            <p className="card-text" style={{ color: "brown" }}><strong>Product Name:</strong> {review.product_name}</p>
            <p className="card-text"><strong>Rating:</strong> {review.rating}</p>
            <p className="card-text"><strong>Review:</strong> {review.description}</p>
            <p className="card-text"><strong>Reviewed User:</strong> {review.email}</p>
            <h5 className="mt-4">Replies:</h5>
            {replyList
              .filter(reply => reply.description === review.description)
              .map((reply, replyIndex) => (
                <div key={replyIndex} className="card mb-3 shadow-sm" style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                  <div className="card-body p-3">
                    <p className="card-text">{reply.text}</p>
                    <p className="card-text">
                      <small className="text-muted">User: {reply.email}</small>
                    </p>
                  </div>
                </div>
              ))}
            <input
              type="text"
              className="form-control"
              id={`reply-${index}`}
              placeholder="Type your reply (max 100 characters)"
              maxLength={getMaxLengthInWords(100)}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{ borderRadius: '5px', borderColor: '#007bff' }}
            />
            <button className="btn btn-primary mt-2" onClick={() => handleReplySubmit(review.description)} style={{ borderRadius: '5px', backgroundColor: '#007bff' }}>Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default ReviewsPage;
