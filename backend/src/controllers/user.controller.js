const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  if(user === null || !(await argon2.verify(user.password_hash, req.query.password)))
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
  });

  res.json(user);
};

//update the user
exports.update = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hash = await argon2.hash(password, { type: argon2.argon2id });

    // Log request parameters
    console.log('Updating user with email:', req.params.email);
    console.log('New name:', name);
    console.log('New password hash:', hash);

    const [updated] = await db.user.update(
      { name, password_hash: hash },
      { where: { email: req.params.email } }
    );

    // Log the update result
    console.log('Update result:', updated);

    if (updated) {
      console.log("im at if statement");
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    
  } catch (error) {
    console.error('Error updating user:', error); 
    res.status(500).json({ message: "Error updating user", error });
  }
};

//Delete user 
exports.deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deleted = await db.user.destroy({ where: { email } });

    if (deleted) {
      res.status(200).json({ message: `User with email ${email} deleted successfully` });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};