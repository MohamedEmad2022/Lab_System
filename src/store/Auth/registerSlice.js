import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";



export const RegisterHand = createAsyncThunk("register/RegisterHand", async (userData, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/register`,{
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            
        })
        
        const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message)
            }else{
                return fulfillWithValue(data)
            }
            console.log(data)
            
    }

    catch (error) {
            return rejectWithValue(error.message)
        }
    })



    export const RegisterSlice = createSlice({
        name: "register",
        initialState: { user: null, error: null, loading: false},
        
        extraReducers:{
            [RegisterHand.pending]: (state, action) => {
                state.loading = true
                
            },
            [RegisterHand.fulfilled]: (state, action) => {
                state.loading = false
                console.log(action)
                
            },
            [RegisterHand.rejected]: (state, action) => {

                state.loading = false
                state.error = action.payload
                console.log(action)
            },
        }
    })

    export default RegisterSlice.reducer;
