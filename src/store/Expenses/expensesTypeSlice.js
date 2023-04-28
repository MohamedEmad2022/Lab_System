import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";


export const GetExpensesTypes = createAsyncThunk("expensesType/GetExpensesTypes", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expense-types`, {
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


export const AddExpensesType = createAsyncThunk("expensesType/AddExpensesType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expense-types`, {
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


export const UpdateExpensesType = createAsyncThunk("expensesType/UpdateExpensesType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expense-types/${obj.id}`, {
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


export const DeleteExpensesType = createAsyncThunk("expensesType/DeleteExpensesType", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expense-types/${obj.id}`, {
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




export const ExpensesTypeSlice = createSlice({
    name: "expensesType",
    initialState: {
        expensesType: null,
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
        //GetExpensesTypes actions
        [GetExpensesTypes.pending]: (state, action) => {
            state.loading = true
            state.fetchTypes = ''
        },
        [GetExpensesTypes.fulfilled]: (state, action) => {
            state.loading = false
            state.expensesType = action.payload.data
            state.fetchTypes = 'fetch'
            
            
            

        },
        [GetExpensesTypes.rejected]: (state, action) => {

            state.loading = false
            state.fetchTypes = 'fetch failed'
            
        },

        //AddExpensesType actions
        [AddExpensesType.pending]: (state, action) => {
            state.loading = true
            state.addType = ''
            state.error = null
        },
        [AddExpensesType.fulfilled]: (state, action) => {
            state.loading = false
            state.addType = 'add'
            state.error = null

        },
        [AddExpensesType.rejected]: (state, action) => {

            state.loading = false
            state.addType = 'add failed'
            state.error = "حدث خطأ"
            
        },

        //UpdateExpensesType actions

        [UpdateExpensesType.pending]: (state, action) => {
            state.loading = true
            state.updateType = ''
            state.error = null
        },
        [UpdateExpensesType.fulfilled]: (state, action) => {
           
            state.updateType = 'update'
            state.loading = false
            state.error = null

        },
        [UpdateExpensesType.rejected]: (state, action) => {

            state.loading = false
            state.updateType = 'update failed'
            state.error = "حدث خطأ"
            
        },

        //DeleteExpensesType actions

        [DeleteExpensesType.pending]: (state, action) => {
            state.loading = true
            state.deleteType = ''
            state.error = null
        },
        [DeleteExpensesType.fulfilled]: (state, action) => {
           
            state.deleteType = 'delete'
            state.loading = false
            state.error = null

        },
        [DeleteExpensesType.rejected]: (state, action) => {

            state.loading = false
            state.error = "حدث خطأ"
            
        },
    }
})


export default ExpensesTypeSlice.reducer;
export const { selectType } = ExpensesTypeSlice.actions