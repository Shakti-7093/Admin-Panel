import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClientInterface } from "../Interface/ClientInterface";
import axios from "axios";

export const fetchClient = createAsyncThunk<ClientInterface[]>("client/fetchClient", async () => {
    const response = await axios.get<ClientInterface[]>("http://localhost:5000/clients");
    return response.data;
});

export const addClient = createAsyncThunk<ClientInterface, ClientInterface>("client/addClient", async (newClient) => {
    const response = await axios.post<ClientInterface>("http://localhost:5000/clients", newClient);
    return response.data;
});

export const updateClient = createAsyncThunk<ClientInterface, ClientInterface>("client/updateClient", async (client) => {
    const response = await axios.put<ClientInterface>(`http://localhost:5000/clients/${client.id}`, client);
    return response.data;
});

export const deleteClient = createAsyncThunk<number, number>('client/deleteClient', async (productId) => {
    await axios.delete(`http://localhost:5000/clients/${productId}`);
    return productId;
});