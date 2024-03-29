import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";



export const GetColorsTypes = createAsyncThunk("color/GetColorsTypes", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/colors`, {
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

export const AddColorType = createAsyncThunk("color/AddColorType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/colors`, {
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


export const UpdateColorType = createAsyncThunk("color/UpdateColorType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/colors/${obj.id}`, {
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


export const DeleteColorType = createAsyncThunk("color/DeleteColorType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/colors/${obj.id}`, {
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


export const ColorTypeSlice = createSlice({
    name: "color",
    initialState: {
        colors: null,
        error: null,
        loading: false,
        fetchColors: '',
        addColor: '',
        updateColor: '',
        deleteColor: '',
        selectedColor: null
    },
    reducers: {
        selectColor: (state, action) => {
            state.selectedColor = action.payload
        }
    },

    extraReducers: {

        //GetColorType actions
        [GetColorsTypes.pending]: (state, action) => {
            state.loading = true
            state.fetchColors = ''
        },
        [GetColorsTypes.fulfilled]: (state, action) => {
            state.loading = false
            state.colors = action.payload.data
            state.fetchColors = 'fetch'
            
            
            

        },
        [GetColorsTypes.rejected]: (state, action) => {

            state.loading = false
            state.fetchColors = 'fetch failed'
        },

        //AddColorType actions

        [AddColorType.pending]: (state, action) => {
            state.loading = true
            state.addColor = ''
        },
        [AddColorType.fulfilled]: (state, action) => {
            state.loading = false
            state.addColor = 'add'
            
            
            

        },
        [AddColorType.rejected]: (state, action) => {

            state.loading = false
            state.addColor = 'add failed'
        },

        //UpdateColorType actions

        [UpdateColorType.pending]: (state, action) => {
            state.loading = true
            state.updateColor = ''
        },
        [UpdateColorType.fulfilled]: (state, action) => {
            state.loading = false
            state.updateColor = 'update'
  
        },
        [UpdateColorType.rejected]: (state, action) => {

            state.loading = false
            state.updateColor = 'update failed'
        },

         //DeleteColorType actions

         [DeleteColorType.pending]: (state, action) => {
            state.loading = true
            state.deleteColor = ''
        },
        [DeleteColorType.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteColor = 'delete'
  
        },
        [DeleteColorType.rejected]: (state, action) => {

            state.loading = false
            state.deleteColor = 'delete failed'
        },
    }
})



export default ColorTypeSlice.reducer;
export const { selectColor } = ColorTypeSlice.actions