import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductInterface } from "../Interface/ProductInterface";
import axios from "axios";

export const fetchProduct = createAsyncThunk<ProductInterface[]>("product/fetchProduct", async () => {
    const response = await axios.get<ProductInterface[]>("http://localhost:3000/products");
    return response.data;
});

export const addProduct = createAsyncThunk<ProductInterface, ProductInterface>("product/addProduct", async (newProduct) => {
    const response = await axios.post<ProductInterface>("http://localhost:3000/products", newProduct);
    return response.data;
});

export const updateProduct = createAsyncThunk<ProductInterface, ProductInterface>("product/updateProduct", async (updatedProduct) => {
    const response = await axios.put<ProductInterface>(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct);
    return response.data;
});

export const deleteProduct = createAsyncThunk<number, number>('product/deleteProduct', async (productId) => {
  await axios.delete(`http://localhost:3000/products/${productId}`);
  return productId;
});