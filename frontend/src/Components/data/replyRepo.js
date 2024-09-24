import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Retrieve all replies from the backend
async function getAllReplies() {
  const res = await axios.get(`${BASE_URL}/api/replies`);
  return res.data;
}

// Submit a new reply to the backend
async function submitReply(newReply) {
  const res = await axios.post(`${BASE_URL}/api/replies`, newReply);
  return res.data;
}

export {
  getAllReplies,
  submitReply
};
