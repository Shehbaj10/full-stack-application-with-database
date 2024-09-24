const db = require("../database");

// Select all replies from the database.
exports.all = async (req, res) => {
  try {
    const reply = await db.reply.findAll();
    res.json(reply);
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a reply in the database.
exports.create = async (req, res) => {
  try {
    const { text, description, email} = req.body;
    const reply = await db.reply.create({text, description, email});
    res.json(reply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
