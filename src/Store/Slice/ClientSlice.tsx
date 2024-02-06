import { createSlice } from "@reduxjs/toolkit";
import initialState from "../Interface/ClientInterface";
import { fetchClient, addClient, updateClient, deleteClient } from "../functions/Client";

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