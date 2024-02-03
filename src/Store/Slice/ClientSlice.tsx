import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState, { ClientInterface } from "../Interface/ClientInterface";

export const fetchClient = createAsyncThunk<ClientInterface[]>("client/fetchClient", async () => {
    const response = await axios.get<ClientInterface[]>("http://localhost:3000/clients");
    return response.data;
});

export const addClient = createAsyncThunk<ClientInterface, ClientInterface>("client/addClient", async (newClient) => {
    const response = await axios.post<ClientInterface>("http://localhost:3000/clients", newClient);
    return response.data;
});

export const updateClient = createAsyncThunk<ClientInterface, ClientInterface>("client/updateClient", async (client) => {
    const response = await axios.put<ClientInterface>(`http://localhost:3000/clients/${client.id}`, client);
    return response.data;
});

export const deleteClient = createAsyncThunk<number, number>('client/deleteClient', async (productId) => {
    await axios.delete(`http://localhost:3000/clients/${productId}`);
    return productId;
});

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchClient.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchClient.fulfilled, (state, action) => {
            state.clients = action.payload;
        });
        builder.addCase(fetchClient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message as string;
        });
        builder.addCase(addClient.fulfilled, (state, action) => {
            state.clients.push(action.payload);
        });
        builder.addCase(addClient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message as string;
        });
        builder.addCase(updateClient.fulfilled, (state, action) => {
            const index = state.clients.findIndex((client) => client.id === action.payload.id);
            state.clients[index] = action.payload;
        });
        builder.addCase(updateClient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message as string;
        });
        builder.addCase(deleteClient.fulfilled, (state, action) => {
            state.clients = state.clients.filter((client) => client.id !== action.payload);
        });
    },
});

const ClientReducer = clientSlice.reducer;

export default ClientReducer;