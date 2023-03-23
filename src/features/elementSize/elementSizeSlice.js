import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import sizeService from "./elementSizeService";

// Get all Size
export const getAllSize = createAsyncThunk(
  "size/get-size",
  async (thunkAPI) => {
    try {
      return await sizeService.getSize();  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Size
export const createSizes = createAsyncThunk(
  "size/create-sizes",
  async (sizeData, thunkAPI) => {
    try {
      return await sizeService.createSize(sizeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Size
export const getASize = createAsyncThunk(
  "size/get-asize",
  async (id, thunkAPI) => {
    try {
      return await sizeService.getASize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Size
export const updateSize = createAsyncThunk(
  "color/update-colors",
  async (size, thunkAPI) => {
    try {
      return await sizeService.updateSize(size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Size
export const deleteSizes = createAsyncThunk(
  "color/delete-colors",
  async (id, thunkAPI) => {
    try {
      return await sizeService.deleteSize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  size: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.size = action.payload;
      })
      .addCase(getAllSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createSizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdSize = action.payload;
      })
      .addCase(createSizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getASize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getASize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizeName = action.payload.title;
      })
      .addCase(getASize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedSize = action.payload;
      })
      .addCase(updateSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteSizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedSize = action.payload;
      })
      .addCase(deleteSizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default sizeSlice.reducer;
