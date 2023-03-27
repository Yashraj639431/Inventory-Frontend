import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Category
const getCategory = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

// Create a Category
const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};

// Get a Category
const getACategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

// Update a Category
const updateCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title, status: category.categoryData.status },
    config
  );
  return response.data;
};

// Delete a Category
const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const categoryService = {
  getCategory,
  createCategory,
  getACategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
