import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState, { ProductInterface } from "../Interface/ProductInterface";

export const fetchProduct = createAsyncThunk<ProductInterface[]>("product/fetchProduct", async () => {
    const response = await axios.get<ProductInterface[]>("http://localhost:3000/products");
    return response.data;
});

export const addProduct = createAsyncThunk<ProductInterface, ProductInterface>("product/addProduct", async (newProduct) => {
    const response = await axios.post<ProductInterface>("http://localhost:3000/products", newProduct);
    return response.data;
});

export const deleteProduct = createAsyncThunk<number, number>('product/deleteProduct', async (productId) => {
  await axios.delete(`http://localhost:3000/products/${productId}`);
  return productId;
});

const productSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = 'success';
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.status = 'success';
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                // Remove the deleted product from the state
                state.products = state.products.filter((product) => product.id !== action.payload);
                state.status = 'success';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });
    },
});

const ProductReducer = productSlice.reducer;

export default ProductReducer;