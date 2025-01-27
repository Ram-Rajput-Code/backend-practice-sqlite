import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:3001/", // Adjust to your backend server URL
});

// Items API
export const getItems = () => api.get("/items");
export const getItemById = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post("/items", data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);

// Users API
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
