module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Retrieve all users.
  router.get("/", controller.all);

  // Retrieve a single user by ID.
  router.get("/select/:id", controller.one);

  // Authenticate a user by username and password.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update user's name and/or password using email as identifier.
  router.put("/:email", controller.update);

  // Delete a user by email.
  router.delete("/:email", controller.deleteUser);

  // Mount the routes on the application.
  app.use("/api/users", router);
};
