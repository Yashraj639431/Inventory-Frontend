import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import elementService from "./elementService";

// Get all Element
export const getElements = createAsyncThunk(
  "element/get-elements",
  async (thunkAPI) => {
    try {
      return await elementService.getElement();  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Element
export const createElements = createAsyncThunk(
  "element/create-element",
  async (elementData, thunkAPI) => {
    try {
      return await elementService.createElement(elementData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Element
export const getAEements = createAsyncThunk(
  "element/get-aelement",
  async (id, thunkAPI) => {
    try {
      return await elementService.getAElement(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Element
export const updateElements = createAsyncThunk(
  "element/update-element",
  async (element, thunkAPI) => {
    try {
      return await elementService.updateElement(updateElements);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Element
export const deleteElements = createAsyncThunk(
  "element/delete-element",
  async (id, thunkAPI) => {
    try {
      return await elementService.deleteElement(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  elements: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const elementSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getElements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getElements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.elements = action.payload;
      })
      .addCase(getElements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createElements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createElements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdElement = action.payload;
      })
      .addCase(createElements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAEements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.elementName = action.payload.title;
        state.elementStatus = action.payload.status;
      })
      .addCase(getAEements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateElements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateElements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedElement = action.payload;
      })
      .addCase(updateElements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteElements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteElements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedElement = action.payload;
      })
      .addCase(deleteElements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default elementSlice.reducer;
