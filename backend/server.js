const express = require("express");
const cors = require("cors");
const db = require("./src/database/index.js");

// Synchronize the database in the background.
db.sync();

const app = express();

// Middleware to parse requests with content-type - application/json.
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS).
app.use(cors());

// Define a simple route that returns a Hello World message.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Include routes for user operations.
require("./src/routes/user.routes.js")(express, app);
// Include routes for product operations.
require("./src/routes/product.routes.js")(express, app);
// Include routes for cart operations.
require("./src/routes/cart.routes.js")(express, app);
// Include routes for review operations.
require("./src/routes/review.routes.js")(express, app);
// Include routes for reply operations.
require("./src/routes/reply.routes.js")(express, app);

// Set the port and start the server, listening for incoming requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
