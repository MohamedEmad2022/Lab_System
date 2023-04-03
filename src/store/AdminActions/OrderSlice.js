import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";



export const GetOrders = createAsyncThunk("order/GetOrders", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/orders`, {
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

export const GetUnitTypes = createAsyncThunk("order/GetUnitTypes", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/unit-types`, {
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


export const AddOrder = createAsyncThunk("order/AddOrder", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {

        // for (var pair of obj.formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        const response = await axios({
            method: 'post',
            url: `${config.apiUrl}/orders-store`,
            data: obj.formData,
            headers: {
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${obj.token}`
            },
        });

        console.log(response.payload);
        if (!response.ok) {
            return rejectWithValue(response.error)
        } else {
            return fulfillWithValue(response)
        }


    } catch (error) {
        throw rejectWithValue(error.message)
    }
})





export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orders: null,
        selectedTooths: [],
        unitTypes: null,
        error: null,
        loading: false,
        fetchOrders: '',
        addOrder: '',
        updateOrder: '',
        deleteOrder: '',

    },

    reducers: {
        toggleSelect: (state, action) => {
            if (state.selectedTooths.indexOf(action.payload) === -1) {

                state.selectedTooths.push(action.payload)
            }
            else if (state.selectedTooths.indexOf(action.payload !== -1)) {
                state.selectedTooths.splice(state.selectedTooths.indexOf(action.payload), 1)
            }

        }
    },
    extraReducers: {
        //GetOrders actions
        [GetOrders.pending]: (state, action) => {
            state.loading = true
            state.fetchOrders = ''
        },
        [GetOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.orders = action.payload.data
            state.fetchOrders = 'fetch'




        },
        [GetOrders.rejected]: (state, action) => {

            state.loading = false
            state.fetchOrders = 'fetch failed'
            console.log(action)
        },

        //GetUnits actions

        [GetUnitTypes.pending]: (state, action) => {
            state.loading = true

        },
        [GetUnitTypes.fulfilled]: (state, action) => {
            state.loading = false
            state.unitTypes = action.payload.data





        },
        [GetUnitTypes.rejected]: (state, action) => {

            state.loading = false
            console.log(action)
        },

        //AddOrder actions
        [AddOrder.pending]: (state, action) => {
            state.loading = true
            state.addOrder = ''
            state.error = null
        },
        [AddOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.addOrder = 'add'
            state.error = null

        },
        [AddOrder.rejected]: (state, action) => {

            state.loading = false
            state.addOrder = 'add failed'
            state.error = "حدث خطأ"
            console.log(action)
        },
    }
})


export default OrderSlice.reducer;
export const { toggleSelect } = OrderSlice.actions
