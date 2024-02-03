import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slice/UserSlice';
import ProductReducer from './Slice/ProductSlice';
import ClientReducer from './Slice/ClientSlice';

const Store = configureStore({
    reducer: {
        user: UserReducer,
        product: ProductReducer,
        client: ClientReducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;