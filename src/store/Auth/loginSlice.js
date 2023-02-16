import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";



export const LoginHand = createAsyncThunk("login/LoginHand", async (userData, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`http://localhost:8000/api/login`,{
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
            
        })
        
        const data = await response.json();
        // if (!response.ok) {
        //     return rejectWithValue(data.error)
        // }else{
            
        //     return fulfillWithValue(data)
        // }
        
            console.log(data)

    }catch(error){
        throw rejectWithValue(error.message)
    }
    })


    export const LoginSlice = createSlice({
        name: "login",
        initialState: { user: null, error: null, loading: false},
        
        extraReducers:{
            [LoginHand.pending]: (state, action) => {
                state.loading = true
                
            },
            [LoginHand.fulfilled]: (state, action) => {
                state.loading = false
                state.user = action.payload
                console.log(action)
                
            },
            [LoginHand.rejected]: (state, action) => {

                state.loading = false
                state.error = action.payload
                console.log(action)
            },
        }
    })

    export default LoginSlice.reducer;
