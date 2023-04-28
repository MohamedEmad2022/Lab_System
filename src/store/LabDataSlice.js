import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config";


export const GetLabData = createAsyncThunk("settings/GetLabData", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/settings`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        })

        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data.error)
        } else {
            return fulfillWithValue(data)
        }

    } catch (error) {
        throw rejectWithValue(error.message)
    }
})

export const UpdateLabData = createAsyncThunk("settings/UpdateLabData", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/settings`, {
            method: "POST",
            body: JSON.stringify(obj.values),
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${obj.token}`
            }

        })

        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data.error)
        } else {
            return fulfillWithValue(data)
        }


    } catch (error) {
        throw rejectWithValue(error.message)
    }
})


export const LabDataSlice = createSlice({
    name: "settings",
    initialState: {
        settings: null,
        fetchData: null,
        error: null,
        loading: false,
        updateSettings: '',
    },

    extraReducers: {

        //GetLabData actions
        [GetLabData.pending]: (state, action) => {
            state.loading = true
            state.fetchData = null
        },
        [GetLabData.fulfilled]: (state, action) => {
            state.loading = false
            state.settings = action.payload.data
            state.fetchData = "fetch"
            
    

        },
        [GetLabData.rejected]: (state, action) => {

            state.loading = false
            state.fetchData = null
            
        },

        //UpdateDoctor actions

        [UpdateLabData.pending]: (state, action) => {
            state.loading = true
            state.updateSettings = ''
        },
        [UpdateLabData.fulfilled]: (state, action) => {
            state.loading = false
            state.updateSettings = 'update'
            
  
        },
        [UpdateLabData.rejected]: (state, action) => {

            state.loading = false
            state.updateSettings = 'update failed'
            
        },
    }
})


export default LabDataSlice.reducer;
