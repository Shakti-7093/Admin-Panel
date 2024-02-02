import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slice/UserSlice';

const Store = configureStore({
    reducer: {
        user: UserReducer,
    },
});

export default Store;