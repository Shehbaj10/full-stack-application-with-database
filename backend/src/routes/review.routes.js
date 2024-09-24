module.exports = (express, app) => {
    const controller = require("../controllers/review.controller.js");
    const router = express.Router();
  
    // Retrieve all reviews.
    router.get('/', controller.getAllReviews);
  
    // Add a new review.
    router.post('/add', controller.addReview);
  
    // Retrieve reviews for a specific product.
    router.get('/product/:product_name', controller.getReviewsForProduct);
  
    // Update a review based on user's email and product name.
    router.put('/update/:email/:product_name', controller.updateReview);
  
    // Delete a review based on user's email and product name.
    router.delete('/delete/:email/:product_name', controller.deleteReview);
  
    // Retrieve reviews for a specific user by email.
    router.get('/user/:email', controller.getReviewsForUser);
  
    // Mount the routes on the application.
    app.use("/api/reviews", router);
};
