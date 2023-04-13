
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";


export const GetExpenses = createAsyncThunk("expenses/GetExpenses", async ({page, token}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expenses?page=${page}`, {
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


export const AddExpenses = createAsyncThunk("expenses/AddExpenses", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expenses`, {
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


export const UpdateExpenses = createAsyncThunk("expensesType/UpdateExpenses", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expenses/${obj.id}`, {
            method: "PUT",
            body: JSON.stringify(obj.values),
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${obj.token}`
            }

        })


        console.log(response)

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


export const DeleteExpenses = createAsyncThunk("expensesType/DeleteExpenses", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/expenses/${obj.id}`, {
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




export const ExpensesSlice = createSlice({
    name: "expenses",
    initialState: {
        expenses: null,
        error: null,
        loading: false,
        fetchExpenses: '',
        totalExpenses: "",
        addExpense: '',
        updateExpense: '',
        deleteExpense: '',
        selectedExpense: null
    },

    reducers: {
        selectExpense: (state, action) => {
            state.selectedExpense = action.payload
        }
    },

    extraReducers: {
        //GetExpenses actions
        [GetExpenses.pending]: (state, action) => {
            state.loading = true
            state.fetchExpenses = ''
        },
        [GetExpenses.fulfilled]: (state, action) => {
            state.loading = false
            state.expenses = action.payload.data
            state.totalExpenses = action.payload.data.total
            state.fetchExpenses = 'fetch'
            
            
            

        },
        [GetExpenses.rejected]: (state, action) => {

            state.loading = false
            state.fetchExpenses = 'fetch failed'
            console.log(action)
        },

        //AddExpenses actions
        [AddExpenses.pending]: (state, action) => {
            state.loading = true
            state.addExpense = ''
            state.error = null
        },
        [AddExpenses.fulfilled]: (state, action) => {
            state.loading = false
            state.addExpense = 'add'
            state.error = null

        },
        [AddExpenses.rejected]: (state, action) => {

            state.loading = false
            state.addExpense = 'add failed'
            state.error = "حدث خطأ"
            console.log(action)
        },

        //UpdateExpenses actions

        [UpdateExpenses.pending]: (state, action) => {
            state.loading = true
            state.updateExpense = ''
            state.error = null
        },
        [UpdateExpenses.fulfilled]: (state, action) => {
           
            state.updateExpense = 'update'
            state.loading = false
            state.error = null

        },
        [UpdateExpenses.rejected]: (state, action) => {

            state.loading = false
            state.updateExpense = 'update failed'
            state.error = "حدث خطأ"
            console.log(action)
        },

        //DeleteExpenses actions

        [DeleteExpenses.pending]: (state, action) => {
            state.loading = true
            state.deleteExpense = ''
            state.error = null
        },
        [DeleteExpenses.fulfilled]: (state, action) => {
           
            state.deleteExpense = 'delete'
            state.loading = false
            state.error = null

        },
        [DeleteExpenses.rejected]: (state, action) => {

            state.loading = false
            state.error = "حدث خطأ"
            console.log(action)
        },
    }
})


export default ExpensesSlice.reducer;
export const { selectExpense } = ExpensesSlice.actions