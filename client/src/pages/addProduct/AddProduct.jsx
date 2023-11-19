import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductForm from "../../components/productForm/ProductForm";
import { selectIsLoading } from "../../redux/features/product/productSlice";


const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
};

export default function AddProduct() {
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const isLoading = useSelector(selectIsLoading);

    const {
        name,
        category,
        price,
        quantity
    } = product;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku;
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    };

    return (
        <>
            <div>
                <h3 className="--mt">Add New Product</h3>
                <ProductForm />
            </div>
        </>
    );
};
