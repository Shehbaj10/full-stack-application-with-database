import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Retrieve all products from the backend
async function getAllProducts() {
  const res = await axios.get(`${BASE_URL}/api/products`);
  return res.data;
}

// Retrieve a single product by name from the backend
async function getProductByName(itemName) {
  const res = await axios.get(`${BASE_URL}/api/products/${itemName}`);
  return res.data;
}

// Submit a new product to the backend
async function submitProduct(newProduct) {
  const res = await axios.post(`${BASE_URL}/api/products`, newProduct);
  return res.data;
}

export {
  getAllProducts,
  getProductByName,
  submitProduct
};
