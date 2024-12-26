import { configureStore } from "@reduxjs/toolkit";
import { transactionApi } from "../features/transactionApi";


const store = configureStore({
    reducer: {
        [transactionApi.reducerPath]: transactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(transactionApi.middleware),
});

export default store;
