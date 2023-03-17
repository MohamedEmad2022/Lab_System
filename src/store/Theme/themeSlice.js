import { createSlice } from "@reduxjs/toolkit";



export const ThemeSlice = createSlice({
    name: 'theme',
    initialState: {theme: "light"},
    reducers: {
        themeMode: (state, action)=>{
            state.theme = action.payload
            localStorage.setItem('themeMode', action.payload)
        },
        getThemeMode: (state)=>{
            state.theme = localStorage.getItem('themeMode')
            
        },
    }
})

export default ThemeSlice.reducer;
export const {themeMode, getThemeMode} = ThemeSlice.actions