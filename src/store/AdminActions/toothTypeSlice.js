import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import config from "../../config";


export const GetToothType = createAsyncThunk("tooth/GetToothType", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/tooth-types`, {
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


export const AddToothType = createAsyncThunk("tooth/AddToothType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/tooth-types`, {
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


export const UpdateToothType = createAsyncThunk("tooth/UpdateToothType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/tooth-types/${obj.id}`, {
            method: "PUT",
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


export const DeleteToothType = createAsyncThunk("tooth/DeleteToothType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/tooth-types/${obj.id}`, {
            method: "DELETE",
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



export const ToothTypeSlice = createSlice({
    name: "tooth",
    initialState: {
        types: null,
        error: null,
        loading: false,
        fetchTypes: '',
        addType: '',
        updateType: '',
        deleteType: '',
        selectedType: null
    },
    reducers: {
        selectType: (state, action) => {
            state.selectedType = action.payload
        }
    },

    extraReducers: {
        //GetToothType actions
        [GetToothType.pending]: (state, action) => {
            state.loading = true
            state.fetchTypes = ''
        },
        [GetToothType.fulfilled]: (state, action) => {
            state.loading = false
            state.types = action.payload
            state.fetchTypes = 'fetch'
            
            
            

        },
        [GetToothType.rejected]: (state, action) => {

            state.loading = false
            state.fetchTypes = 'fetch failed'
            console.log(action)
        },

        //AddToothType actions
        [AddToothType.pending]: (state, action) => {
            state.loading = true
            state.addType = ''
            state.error = null
        },
        [AddToothType.fulfilled]: (state, action) => {
            state.type = action.payload
            state.loading = false
            state.addType = 'add'
            state.error = null

        },
        [AddToothType.rejected]: (state, action) => {

            state.loading = false
            state.addType = 'add failed'
            state.error = "حدث خطأ"
            console.log(action)
        },

        //UpdateToothType actions

        [UpdateToothType.pending]: (state, action) => {
            state.loading = true
            state.updateType = ''
            state.error = null
        },
        [UpdateToothType.fulfilled]: (state, action) => {
           
            state.updateType = 'update'
            state.loading = false
            state.error = null

        },
        [UpdateToothType.rejected]: (state, action) => {

            state.loading = false
            state.updateType = 'update failed'
            state.error = "حدث خطأ"
            console.log(action)
        },

        //DeleteToothType actions

        [DeleteToothType.pending]: (state, action) => {
            state.loading = true
            state.deleteType = ''
            state.error = null
        },
        [DeleteToothType.fulfilled]: (state, action) => {
           
            state.deleteType = 'delete'
            state.loading = false
            state.error = null

        },
        [DeleteToothType.rejected]: (state, action) => {

            state.loading = false
            state.error = "حدث خطأ"
            console.log(action)
        },
    }
})


export default ToothTypeSlice.reducer;
export const { selectType } = ToothTypeSlice.actions