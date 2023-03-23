import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Size
const getSize = async () => {
  const response = await axios.get(`${base_url}element/size/`);
  return response.data;
};

// Create a Size
const createSize = async (color) => {
  const response = await axios.post(`${base_url}element/size/`, color, config);
  return response.data;
};

// Get a Size
const getASize = async (id) => {
  const response = await axios.get(`${base_url}element/size/${id}`, config);
  return response.data;
};

// Update a Size
const updateSize = async (size) => {
  const response = await axios.put(
    `${base_url}element/size/${size.id}`,
    { title: size.sizeData.title },
    config
  );
  return response.data;
};

// Delete a Size
const deleteSize = async (id) => {
  const response = await axios.delete(`${base_url}element/size/${id}`, config);
  return response.data;
};

const sizeService = {
  getSize,
  createSize,
  getASize,
  updateSize,
  deleteSize,
};

export default sizeService;
