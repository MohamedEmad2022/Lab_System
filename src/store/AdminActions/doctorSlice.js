import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";



export const GetDoctors = createAsyncThunk("doctor/GetDoctors", async (token, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/doctors`, {
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

export const AddDoctor = createAsyncThunk("doctor/AddDoctor", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/doctors`, {
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


export const UpdateDoctor = createAsyncThunk("doctor/UpdateDoctor", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/doctors/${obj.id}`, {
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


export const DeleteDoctor = createAsyncThunk("doctor/DeleteDoctor", async (obj, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const response = await fetch(`${config.apiUrl}/doctors/${obj.id}`, {
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


export const DoctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctors: null,
        error: null,
        loading: false,
        fetchDoctors: '',
        addDoctor: '',
        updateDoctor: '',
        deleteDoctor: '',
        selectedDoctor: null
    },
    reducers: {
        selectDoctor: (state, action) => {
            state.selectedDoctor = action.payload
        }
    },

    extraReducers: {

        //GetDoctors actions
        [GetDoctors.pending]: (state, action) => {
            state.loading = true
            state.fetchDoctors = ''
        },
        [GetDoctors.fulfilled]: (state, action) => {
            state.loading = false
            state.doctors = action.payload.data.data
            state.fetchDoctors = 'fetch'
    

        },
        [GetDoctors.rejected]: (state, action) => {

            state.loading = false
            state.fetchDoctors = 'fetch failed'
        },

        //AddDoctor actions

        [AddDoctor.pending]: (state, action) => {
            state.loading = true
            state.addDoctor = ''
        },
        [AddDoctor.fulfilled]: (state, action) => {
            state.loading = false
            state.addDoctor = 'add'

        },
        [AddDoctor.rejected]: (state, action) => {

            state.loading = false
            state.addDoctor = 'add failed'
        },

        //UpdateDoctor actions

        [UpdateDoctor.pending]: (state, action) => {
            state.loading = true
            state.updateDoctor = ''
        },
        [UpdateDoctor.fulfilled]: (state, action) => {
            state.loading = false
            state.updateDoctor = 'update'
  
        },
        [UpdateDoctor.rejected]: (state, action) => {

            state.loading = false
            state.updateDoctor = 'update failed'
        },

         //DeleteDoctor actions

         [DeleteDoctor.pending]: (state, action) => {
            state.loading = true
            state.deleteDoctor = ''
        },
        [DeleteDoctor.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteDoctor = 'delete'
  
        },
        [DeleteDoctor.rejected]: (state, action) => {

            state.loading = false
            state.deleteDoctor = 'delete failed'
        },
    }
})



export default DoctorSlice.reducer;
export const { selectDoctor } = DoctorSlice.actions