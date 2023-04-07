import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";

export const LogOutHand = createAsyncThunk("logout/LogOutHand", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, dispatch } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/logout`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
            
        })


        dispatch(unauthentication())
        window.location.reload()
        // const data = await response.json();
        // if (response.status === 200) {
        //     dispatch(unauthentication())
        //     return fulfillWithValue(data)
        // }else{
        //     return rejectWithValue(data.error)
        // }

    
    }catch(error){
        throw rejectWithValue(error.message)
    }
    })


    export const LogoutSlice = createSlice({
        name: "logout",
        initialState: { user: null, error: null, loading: false},
        reducers: {
            unauthentication: ()=>{
                if(typeof window !== "undefined"){
                    localStorage.removeItem("jwt");
                }
            },
            
    },
        extraReducers:{
            [LogOutHand.pending]: (state, action) => {
                state.loading = true
                
            },
            [LogOutHand.fulfilled]: (state, action) => {
                state.loading = false
                state.user = null
                console.log(action)
                
                
            },
            [LogOutHand.rejected]: (state, action) => {

                state.loading = false
                state.error = action.payload
                console.log(action)
            },
        }
    })

    export default LogoutSlice.reducer;
    export const {unauthentication} = LogoutSlice.actions