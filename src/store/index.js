import { configureStore } from "@reduxjs/toolkit";
import register from "./Auth/registerSlice"
import login from "./Auth//loginSlice"
import logout from "./Auth/logOutSlice"
import theme from "./Theme//themeSlice"
import tooth from "./AdminActions/toothTypeSlice"
import color from "./AdminActions/colorTypeSlice"
import doctor from "./AdminActions/doctorSlice"
import order from "./AdminActions/OrderSlice"
import settings from "./LabDataSlice"
import expensesType from "./Expenses/expensesTypeSlice"
import expenses from "./Expenses/expensesSlice"
import assetsReducer from "./AdminActions/assetSlice";


export default configureStore({
    reducer: {
        register,
        login,
        logout,
        theme,
        tooth,
        color,
        doctor,
        order,
        settings,
        expensesType,
        expenses,
        assets:assetsReducer
    }
})