import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";




export const LoginHand = createAsyncThunk("login/LoginHand", async (userData, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, dispatch } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/login`,{
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
            
        })
        
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data.error)
        }else{
            dispatch(authentication(data.data))
            window.location.reload()
            return fulfillWithValue(data)
        }
        
            

    }catch(error){
        throw rejectWithValue(error.message)
    }
    })


    export const LoginSlice = createSlice({
        name: "login",
        initialState: { user: null, error: null, loading: false},
        reducers: {
            authentication: (state, action)=>{
                if(typeof window !== "undefined"){
                    localStorage.setItem("jwt", JSON.stringify(action.payload))
                }
            },
            
    },
        extraReducers:{
            [LoginHand.pending]: (state, action) => {
                state.loading = true
                
            },
            [LoginHand.fulfilled]: (state, action) => {
                state.loading = false
                state.user = action.payload
                
                
            },
            [LoginHand.rejected]: (state, action) => {

                state.loading = false
                state.error = action.payload
                
            },
        }
    })

    export default LoginSlice.reducer;
    export const {authentication} = LoginSlice.actions