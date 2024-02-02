import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import initialState, { UserInterface } from '../Interface/UserInterface';

const fetchUser = createAsyncThunk<UserInterface[]>('user/fetchUser', async () => {
    const response = await axios.get<UserInterface[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message as string;
        });
    }
});

const UserReducer = userSlice.reducer;

export default UserReducer;