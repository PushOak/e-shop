import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const API_URL = `${SERVER_URL}/api/products/`;

// Create new product
const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// Get a Product
const getProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// Get all products
const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Update a Product
const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

// Delete a product
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

const productService = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};

export default productService;