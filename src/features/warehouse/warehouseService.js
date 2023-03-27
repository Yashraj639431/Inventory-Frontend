import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Warehouse
const getWarehouse = async () => {
  const response = await axios.get(`${base_url}warehouse/`);
  return response.data;
};

// Create a Warehouse
const createWarehouse = async (warehouse) => {
  const response = await axios.post(`${base_url}warehouse/`, warehouse, config);
  return response.data;
};

// Get a Warehouse
const getAWarehouse = async (id) => {
  const response = await axios.get(`${base_url}warehouse/${id}`, config);
  return response.data;
};

// Update a Warehouse
const updateWarehouse = async (warehouse) => {
  const response = await axios.put(
    `${base_url}warehouse/${warehouse.id}`,
    { title: warehouse.warehouseData.title, status: warehouse.warehouseData.status },
    config
  );
  return response.data;
};

// Delete a Warehouse
const deleteWarehouse = async (id) => {
  const response = await axios.delete(`${base_url}warehouse/${id}`, config);
  return response.data;
};

const warehouseService = {
  getWarehouse,
  createWarehouse,
  getAWarehouse,
  updateWarehouse,
  deleteWarehouse,
};

export default warehouseService;
