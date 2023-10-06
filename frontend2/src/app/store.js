import { configureStore } from "@reduxjs/toolkit";

import singlesReducer from "../features/singles/singlesSlice";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
    reducer: {
        singles: singlesReducer,
        counter: counterReducer,
    },
});
