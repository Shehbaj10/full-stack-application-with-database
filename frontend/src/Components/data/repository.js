import axios from "axios";

const API_HOST = "http://localhost:4000";

// Verify user credentials
async function verifyUser(userEmail, userPassword) {
  const response = await axios.get(`${API_HOST}/api/users/login`, { params: { email: userEmail, password: userPassword } });
  const user = response.data;
  return user;
}

// Find a user by ID
async function findUser(userId) {
  const response = await axios.get(`${API_HOST}/api/users/select/${userId}`);
  return response.data;
}

// Create a new user
async function createUser(newUser) {
  const response = await axios.post(`${API_HOST}/api/users`, newUser);
  return response.data;
}

// Update user information
async function updateUser(userEmail, updatedUser) {
  const response = await axios.put(`${API_HOST}/api/users/${userEmail}`, updatedUser);
  return response.data;
}

// Delete a user by email
async function deleteUser(userEmail) {
  const response = await axios.delete(`${API_HOST}/api/users/${userEmail}`);
  return response.data;
}

export {
  verifyUser,
  findUser,
  createUser,
  updateUser,
  deleteUser
};
