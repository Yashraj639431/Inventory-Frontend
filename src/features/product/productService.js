import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Product
const getProduct = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

// Get a Product
const getAProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

// Update a Product
const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      price: product.productData.price,
      qty: product.productData.qty,
      warehouse: product.productData.warehouse,
      status: product.productData.status,
    },
    config
  );
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const productService = {
  getProduct,
  getAProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
