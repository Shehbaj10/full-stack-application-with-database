const db = require("../database");

// Fetch cart items from the database.
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await db.cart.findAll();
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Add a product to the cart.
exports.addToCart = async (req, res) => {
  const { product } = req.body;
  try {
    const response = await db.cart.create({name: product.name, price: product.price, inSpecial: product.inSpecial})
    if (response === null)
        {
            return res.status(404).json({ error: "unable to add product to cart" });
        }
    
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove a product from the cart.
exports.removeFromCart = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ error: "Product Id is required" });
    }
    const result = await db.cart.destroy({
      where: { name }
    });

    if (result) {
      res.status(200).json({ message: "Product removed from cart" });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Clear the cart.
exports.clearCart = async () => {
  try {
    // Clear the cart table
    await db.cart.destroy({ truncate: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
