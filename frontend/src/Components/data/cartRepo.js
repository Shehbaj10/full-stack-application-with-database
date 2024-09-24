import axios from "axios";

// Constants
const API_HOST = "http://localhost:4000";

// Fetch cart items from the backend
async function fetchCartItems() {
  try {
    const response = await axios.get(`${API_HOST}/api/cart/`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cart items: " + error.response.data.error);
  }
}

// Add a product to the cart in the backend
async function addToCart(product) {
  try {
    const response = await axios.post(`${API_HOST}/api/cart/add`, { product });
    return response.data;
  } catch (error) {
    throw new Error("Error adding product to cart: " + error.response.data.error);
  }
}

// Remove a product from the cart in the backend
async function removeFromCart(productId) {
  try {
    const response = await axios.delete(`${API_HOST}/api/cart/remove/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error removing product from cart: " + error.response.data.error);
  }
}

// Clear the cart in the backend
async function clearCart() {
  try {
    await axios.post(`${API_HOST}/api/cart/clear`);
  } catch (error) {
    throw new Error("Error clearing cart: " + error.response.data.error);
  }
}

// Export functions
export { fetchCartItems, addToCart, removeFromCart, clearCart };
