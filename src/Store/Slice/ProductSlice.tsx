import { createSlice } from "@reduxjs/toolkit";
import initialState from "../Interface/ProductInterface";
import { fetchProduct, addProduct, updateProduct, deleteProduct } from "../functions/Product";

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
            builder.addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product.id === action.payload.id);
                state.products[index] = action.payload;
            });
            builder.addCase(updateProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            });
    },
});

const ProductReducer = productSlice.reducer;

export default ProductReducer;