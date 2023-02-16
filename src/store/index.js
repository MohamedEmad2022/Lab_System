import { configureStore } from "@reduxjs/toolkit";
import register from "./Auth/registerSlice"
import login from "./Auth//loginSlice"

export default configureStore({
    reducer:{
       register,
       login
    }
})