// routes/reply.routes.js
module.exports = (express, app) => {
    const controller = require("../controllers/reply.controller.js");
    const router = express.Router();
  
    // Retrieve all replies.
    router.get("/", controller.all);
  
    // Create a new reply.
    router.post("/", controller.create);
  
    // Mount the routes on the application.
    app.use("/api/reply", router);
};
