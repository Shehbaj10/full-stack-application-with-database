const db = require("../database");

// Select all products from the database.
exports.allProducts = async (req, res) => {
  try {
    const products = await db.product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Select one product from the database.
exports.oneProduct = async (req, res) => {
  try {
    const product = await db.product.findOne({ where: { name: req.params.name } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a product in the database.
exports.createProduct = async (req, res) => {
  const { name, description, price, inSpecial } = req.body;
  try {
    const product = await db.product.create({ name, description, price, inSpecial });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

