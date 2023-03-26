import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Value
const getValue = async (id) => {
  const response = await axios.get(`${base_url}value/${id}`);
  return response.data;
};

// Create a Value
const createValue = async (value) => {
  const response = await axios.post(`${base_url}value`, value, config);
  return response.data;
};

// Get a Value
const getAValue = async (id) => {
  const response = await axios.get(`${base_url}value/${id}`, config);
  return response.data;
};

// Update a Value
const updateValue = async (value) => {
  const response = await axios.put(
    `${base_url}value${value.id}`,
    { title: value.valueData.title },
    config
  );
  return response.data;
};

// Delete a Value
const deleteValue = async (id) => {
  const response = await axios.delete(`${base_url}value/${id}`, config);
  return response.data;
};

const valueService = {
  getValue,
  createValue,
  getAValue,
  updateValue,
  deleteValue,
};

export default valueService;
