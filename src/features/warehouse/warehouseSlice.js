import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import warehouseService from "./warehouseService";

// Get all Warehouse
export const getWarehouses = createAsyncThunk(
  "warehouse/get-warehouses",
  async (thunkAPI) => {
    try {
      return await warehouseService.getWarehouse();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Warehouse
export const createWarehouses = createAsyncThunk(
  "warehouse/create-warehouse",
  async (warehouseData, thunkAPI) => {
    try {
      return await warehouseService.createWarehouse(warehouseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Warehouse
export const getAWarehouses = createAsyncThunk(
  "warehouse/get-awarehouse",
  async (id, thunkAPI) => {
    try {
      return await warehouseService.getAWarehouse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Warehouse
export const updateWarehouses = createAsyncThunk(
  "warehouse/update-warehouse",
  async (warehouseData, thunkAPI) => {
    try {
      return await warehouseService.updateWarehouse(warehouseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Warehouse
export const deleteWarehouses = createAsyncThunk(
  "warehouse/delete-warehouse",
  async (id, thunkAPI) => {
    try {
      return await warehouseService.deleteWarehouse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  warehouses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const WarehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.warehouses = action.payload;
      })
      .addCase(getWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdWarehouse = action.payload;
      })
      .addCase(createWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wareName = action.payload.title;
        state.wareStatus = action.payload.status;
      })
      .addCase(getAWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedWarehouse = action.payload;
      })
      .addCase(updateWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedWarehouse = action.payload;
      })
      .addCase(deleteWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default WarehouseSlice.reducer;
