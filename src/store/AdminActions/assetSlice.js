import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AssetDataService from "../services/AssetService";
import { act } from "react-dom/test-utils";

const initialState = {
  assets: [],
  error: null,
  success: null,
  loading: false,
  retrieveAssets: '',
  createAsset: '',
  updateAsset: '',
  deleteAsset: '',
  selectedAsset: null,
}

export const createAsset = createAsyncThunk(
  "assets/create",
  async (data, thunkAPI) => {
    const asset = data.payload;
    const response = await AssetDataService.create(asset);
    return response.data;
  }
);

export const retrieveAssets = createAsyncThunk(
  "assets/retrieve",
  async ({ page }, thunkAPI) => {
    const response = await AssetDataService.getAll();
    let { data } = response.data;
    return data.data;
  }
);

export const updateAsset = createAsyncThunk(
  "assets/update",
  async ({ payload }, thunkAPI) => {
    const asset = payload;
    const { id } = asset;
    console.log('id....', id);
    const response = await AssetDataService.update(id, asset);
    return response.data;
  }
);

export const deleteAsset = createAsyncThunk(
  "assets/delete",
  async ({ id }) => {
    console.log('Delete Asset');
    console.log(id);
    const response = await AssetDataService.remove(id);
    let { data } = response.data;

    console.log('data', data);
    return response.data;
  }
);


const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    selectAsset: (state, action) => {
      state.selectedAsset = action.payload
    }
  },
  extraReducers: {
    [retrieveAssets.pending]: (state, action) => {
      state.loading = true
      state.retrieveAssets = ''
    },
    [retrieveAssets.fulfilled]: (state, action) => {
      state.loading = false
      state.assets = action.payload;
      state.retrieveAssets = 'fetch'
    },
    [retrieveAssets.rejected]: (state, action) => {
      state.loading = false
      state.retrieveAssets = 'fetch failed'
    },

    [createAsset.pending]: (state, action) => {
      state.loading = true;
   },
    [createAsset.fulfilled]: (state, action) => {
      state.assets = [...state.assets, action.payload.data];
      state.loading = false
    },
    [updateAsset.pending]: (state, action) => {
      state.loading = true;
    },
    [updateAsset.fulfilled]: (state, action) => {
      const index = state.assets.findIndex(asset => asset.id === action.payload.data.id);
      state.assets[index] = {
        ...state.assets[index],
        ...action.payload.data,
      };
      state.loading=false;
    },
    [deleteAsset.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAsset.fulfilled]: (state, action) => {
      let index = state.assets.findIndex(({ id }) => id === action.payload.data.id);
      state.assets.splice(index, 1);
      state.loading = false
    },
    [deleteAsset.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action;
    },
  },
});

const { reducer } = assetSlice;
export const { selectAsset } = assetSlice.actions
export default reducer;