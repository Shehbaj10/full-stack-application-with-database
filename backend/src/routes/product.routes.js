module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();

    // Retrieve all products.
    router.get('/', controller.allProducts);

    // Retrieve a single product by name.
    router.get('/products/:name', controller.oneProduct);

    // Create a new product.
    router.post('/', controller.createProduct);

    // Mount the routes on the application.
    app.use("/api/products", router);
};
