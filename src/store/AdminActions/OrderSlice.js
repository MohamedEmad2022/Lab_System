import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";



export const GetOrders = createAsyncThunk("order/GetOrders", async ({token, page}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await axios({
            method: "get",
            url: `${config.apiUrl}/orders?page=${page}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        })

        
        if (response.status === 200) {
           return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response.error)
        }

    } catch (error) {
        throw rejectWithValue(error.message)
    }
})

export const GetSingleOrder = createAsyncThunk("order/GetSingleOrder", async ({token, id}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await axios({
            method: "get",
            url: `${config.apiUrl}/orders/${id}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            return fulfillWithValue(response.data)
         } else {
             return rejectWithValue(response.error)
         }
 
     } catch (error) {
         throw rejectWithValue(error.message)
     }
 })

export const GetUnitTypes = createAsyncThunk("order/GetUnitTypes", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await axios({
            method: "get",
            url: `${config.apiUrl}/unit-types`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            return fulfillWithValue(response.data)
         } else {
             return rejectWithValue(response.error)
         }
 
     } catch (error) {
         throw rejectWithValue(error.message)
     }
 })


export const AddOrder = createAsyncThunk("order/AddOrder", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {

        const response = await axios({
            method: 'post',
            url: `${config.apiUrl}/orders-store`,
            data: obj.formData,
            headers: {
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${obj.token}`
            },
        });

        
        if (response.status === 201) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
       
        throw rejectWithValue(error.response.data.message)
        
    }
})


export const UpdateOrder = createAsyncThunk("order/UpdateOrder", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {

        const response = await axios({
            method: 'post',
            url: `${config.apiUrl}/orders-update`,
            data: obj.formData,
            headers: {
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${obj.token}`
            },
        });

        
        if (response.status === 201) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
       
        throw rejectWithValue(error.response.data.message)
        
    }
})


export const DeleteOrder = createAsyncThunk("order/DeleteOrder", async ({id, token}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    

    try {

        const response = await axios({
            method: 'delete',
            url: `${config.apiUrl}/orders/${id}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

       
        
        if (response.status === 200) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
        
        throw rejectWithValue(error.response.data.message)
        
    }
})

export const MarkAsPaid = createAsyncThunk("order/MarkAsPaid", async ({invoiceId, token}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    

    try {

        const response = await axios({
            method: 'get',
            url: `${config.apiUrl}/order-mark-as-paid/${invoiceId}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

       
        
        if (response.status === 200) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
        
        throw rejectWithValue(error.response.data.message)
        
    }
})


export const MarkAsUnPaid = createAsyncThunk("order/MarkAsUnPaid", async ({invoiceId, token}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    

    try {

        const response = await axios({
            method: 'get',
            url: `${config.apiUrl}/order-mark-as-unpaid/${invoiceId}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        
        
        if (response.status === 200) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
       
        throw rejectWithValue(error.response.data.message)
        
    }
})

export const MarkAsDelivered = createAsyncThunk("order/MarkAsDelivered", async ({id, token}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    

    try {

        const response = await axios({
            method: 'get',
            url: `${config.apiUrl}/order-set-delivered/${id}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        
        
        if (response.status === 200) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
        
        throw rejectWithValue(error.response.data.message)
        
    }
})

export const SearchOrders = createAsyncThunk("order/SearchOrders", async ({values, token}, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI

    const name = values.name || ""
    const status = values.payment_status || ""
    const color_id = values.color_id || ""
    const doctor_id = values.doctor_id || ""
    const tooth_type_id = values.tooth_type_id || ""
    const date = values.date || ""
    const date_from = values.date_from || ""
    const date_to = values.date_to || ""
    const delivered = values.delivered || ""
    
    

    try {

        const response = await axios({
            method: 'get',
            url: `${config.apiUrl}/orders?patient_name=${name}&payment_status=${status}&color_id=${color_id}&doctor_id=${doctor_id}
            &tooth_type_id=${tooth_type_id}&date=${date}&date_from=${date_from}&date_to=${date_to}&delivered=${delivered}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        
        
        if (response.status === 200) {
            return fulfillWithValue(response.data)
        } else {
            return rejectWithValue(response)
        }


    } catch (error) {
        
        throw rejectWithValue(error.response.data.message)
        
    }
})



export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orders: null,
        singleOrder: null,
        selectedTooths: [],
        unitTypes: null,
        error: null,
        loading: false,
        fetchOrders: '',
        fetchSingleOrder: '',
        addOrder: '',
        updateOrder: '',
        deleteOrder: '',
        totalOrders: "",
        successed: ""

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
            state.selectedTooths = []
        },
        [GetOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.orders = action.payload.data
            state.totalOrders = action.payload.data.total
            state.selectedTooths = []
            state.fetchOrders = 'fetch'

           

        },
        [GetOrders.rejected]: (state, action) => {

            state.loading = false
            state.fetchOrders = 'fetch failed'
            
        },

        //SearchOrders actions
        [SearchOrders.pending]: (state, action) => {
            state.loading = true
            state.fetchOrders = ''
            state.selectedTooths = []
        },
        [SearchOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.orders = action.payload.data
            state.totalOrders = action.payload.data.total
            state.selectedTooths = []
            state.fetchOrders = 'fetch'

            


        },
        [SearchOrders.rejected]: (state, action) => {

            state.loading = false
            state.fetchOrders = 'fetch failed'
            
        },

        //GetSingleOrder actions
        [GetSingleOrder.pending]: (state, action) => {
            
            state.selectedTooths = []
            
        },
        [GetSingleOrder.fulfilled]: (state, action) => {
            
            state.singleOrder = action.payload.data
            state.selectedTooths = action.payload.data.units.map((unit)=>(
                unit.unit_type.id
            ))
            state.fetchSingleOrder = 'fetch_single_order'

            


        },
        [GetSingleOrder.rejected]: (state, action) => {

            state.loading = false
            state.selectedTooths = []
            
        },


        //GetUnits actions

        [GetUnitTypes.pending]: (state, action) => {
            state.loading = true
            state.selectedTooths = []
        },
        [GetUnitTypes.fulfilled]: (state, action) => {
            state.loading = false
            state.selectedTooths = []
            state.unitTypes = action.payload.data

        },
        [GetUnitTypes.rejected]: (state, action) => {

            state.loading = false
            
        },

        //AddOrder actions
        [AddOrder.pending]: (state, action) => {
            state.loading = true
            state.addOrder = ''
            state.successed = ""
            state.error = null
        },
        [AddOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.addOrder = 'add'
            state.successed = action.payload.message
            state.error = null

        },
        [AddOrder.rejected]: (state, action) => {

            state.loading = false
            state.addOrder = 'add failed'
            state.successed = ''
            state.error = action.payload
        },


         //UpdateOrder actions
         [UpdateOrder.pending]: (state, action) => {
            state.loading = true
            state.updateOrder = ''
            state.successed = ""
            state.error = null
        },
        [UpdateOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.updateOrder = 'update'
            state.successed = action.payload.message
            state.error = null

        },
        [UpdateOrder.rejected]: (state, action) => {

            state.loading = false
            state.updateOrder = 'update failed'
            state.successed = ""
            state.error = action.payload
            
        },

        //DeleteOrder actions
        [DeleteOrder.pending]: (state, action) => {
            state.loading = true
            state.deleteOrder = ''
            state.successed = ''
            state.error = null
        },
        [DeleteOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteOrder = 'delete'
            state.successed = action.payload.message
            state.error = null
            
        },
        [DeleteOrder.rejected]: (state, action) => {

            state.loading = false
            state.deleteOrder = 'delete failed'
            state.successed = ''
            state.error = action.payload
            
        },
        //MarkAsPaid actions
        [MarkAsPaid.pending]: (state, action) => {
            state.loading = true
            state.successed = ''
        },
        [MarkAsPaid.fulfilled]: (state, action) => {
            state.loading = false
            state.successed = action.payload.message
            
        },
        [MarkAsPaid.rejected]: (state, action) => {

            state.loading = false
            state.successed = ''
            
        },
         //MarkAsUnPaid actions
         [MarkAsUnPaid.pending]: (state, action) => {
            state.loading = true
            state.successed = ''
        },
        [MarkAsUnPaid.fulfilled]: (state, action) => {
            state.loading = false
            state.successed = action.payload.message
            
        },
        [MarkAsUnPaid.rejected]: (state, action) => {

            state.loading = false
            state.successed = ''
            
        },

        //MarkAsDelivered actions
        [MarkAsDelivered.pending]: (state, action) => {
            state.loading = true
            state.successed = ''
        },
        [MarkAsDelivered.fulfilled]: (state, action) => {
            state.loading = false
            state.successed = action.payload.data
            
        },
        [MarkAsDelivered.rejected]: (state, action) => {

            state.loading = false
            state.successed = ''
            
        },
    }
})


export default OrderSlice.reducer;
export const { toggleSelect } = OrderSlice.actions
