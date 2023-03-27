import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Item
const getItem = async () => {
  const response = await axios.get(`${base_url}item/`);
  return response.data;
};

// Create a Item
const createItem = async (item) => {
  const response = await axios.post(`${base_url}item/`, item, config);
  return response.data;
};

// Get a Item
const getAItem = async (id) => {
  const response = await axios.get(`${base_url}item/${id}`, config);
  return response.data;
};

// Update a Category
const updateItem = async (item) => {
  const response = await axios.put(
    `${base_url}item/${item.id}`,
    { title: item.itemData.title, status: item.itemData.status },
    config
  );
  return response.data;
};

// Delete a Item
const deleteItem = async (id) => {
  const response = await axios.delete(`${base_url}item/${id}`, config);
  return response.data;
};

const itemService = {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getAItem,
};

export default itemService;
