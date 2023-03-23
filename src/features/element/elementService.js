import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Element
const getElement = async () => {
  const response = await axios.get(`${base_url}element/`);
  return response.data;
};

// Create a Element
const createElement = async (element) => {
  const response = await axios.post(`${base_url}element/`, element, config);
  return response.data;
};

// Get a Element
const getAElement = async (id) => {
  const response = await axios.get(`${base_url}element/${id}`, config);
  return response.data;
};

// Update a Element
const updateElement = async (element) => {
  const response = await axios.put(
    `${base_url}element/${element.id}`,
    { title: element.elementData.title },
    config
  );
  return response.data;
};

// Delete a Element
const deleteElement = async (id) => {
  const response = await axios.delete(`${base_url}element/${id}`, config);
  return response.data;
};

const elementService = {
  getElement,
  createElement,
  getAElement,
  updateElement,
  deleteElement,
};

export default elementService;
