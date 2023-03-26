import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import valueService from "./elementValueService";

// Get all Value
export const getValues = createAsyncThunk(
  "value/get-values",
  async (id,thunkAPI) => {
    try {
      return await valueService.getValue(id);  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Value
export const createValues = createAsyncThunk(
  "value/create-value",
  async (valueData, thunkAPI) => {
    try {
      return await valueService.createValue(valueData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Value
export const getAValues = createAsyncThunk(
  "value/get-aValue",
  async (id, thunkAPI) => {
    try {
      return await valueService.getAValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Value
export const updateValues = createAsyncThunk(
  "updateValues/update-value",
  async (value, thunkAPI) => {
    try {
      return await valueService.updateValue(value);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Value
export const deleteValues = createAsyncThunk(
  "value/delete-value",
  async (id, thunkAPI) => {
    try {
      return await valueService.deleteValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_All");
const initialState = {
  values: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const elementColorSlice = createSlice({
  name: "values",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.values = action.payload;
      })
      .addCase(getValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.title;
      })
      .addCase(getAValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedValue = action.payload;
      })
      .addCase(deleteValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default elementColorSlice.reducer;
