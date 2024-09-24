module.exports = (express, app) => {
    const controller = require("../controllers/cart.controller.js");
    const router = express.Router();

    // Retrieve cart items.
    router.get('/', controller.getCartItems);

    // Add a product to the cart.
    router.post('/add', controller.addToCart);

    // Remove a product from the cart by name.
    router.delete('/remove/:name', controller.removeFromCart);

    // Clear the cart.
    router.post('/clear', controller.clearCart);

    // Mount the routes on the application.
    app.use("/api/cart", router);
};
