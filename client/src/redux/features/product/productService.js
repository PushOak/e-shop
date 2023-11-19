import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const API_URL = `${SERVER_URL}/api/products`;

// Create new product
const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

const productService = {
    createProduct,
};

export default productService;