import { configureStore } from "@reduxjs/toolkit";
import register from "./Auth/registerSlice"
import login from "./Auth//loginSlice"
import theme from "./Theme//themeSlice"
import tooth from "./AdminActions/toothTypeSlice"
import color from "./AdminActions/colorTypeSlice"
import doctor from "./AdminActions/doctorSlice"

export default configureStore({
    reducer: {
        register,
        login,
        theme,
        tooth,
        color,
        doctor
    }
})