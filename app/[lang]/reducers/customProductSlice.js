import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateCustomProductFunction,
  DeleteCustomProductFunction,
  EditCustomProductStatusFunction,
  FetchCustomProductsFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const customProductsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = customProductsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------CustomProductsSlice-----------------------------------------------
const customProductsSlice = createSlice({
  name: "customProducts",
  initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers
  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchCustomProducts
      .addCase(fetchCustomProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomProducts.fulfilled, (state, action) => {
        state.status = "completed";
        customProductsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchCustomProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchCustomProducts

      //*-----------------------------------createCustomProduct
      .addCase(createCustomProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createCustomProduct.fulfilled, (state, action) => {
        customProductsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createCustomProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })
      //*-----------------------------------/createCustomProduct

      //*-----------------------------------------------editCustomProductStatus
      .addCase(editCustomProductStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editCustomProductStatus.fulfilled, (state, action) => {
        customProductsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editCustomProductStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/editCustomProductStatus

      //*-----------------------------------deleteCustomProduct

      .addCase(deleteCustomProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCustomProduct.fulfilled, (state, action) => {
        customProductsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteCustomProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteCustomProduct

      .addMatcher(fetchCustomProducts.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createCustomProduct.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
  //*-----------------------------------------------/CustomProductsSlice-----------------------------------------------
});

//*-----------------------------------------------asyncThunk
//*-----------------------------------fetchCustomProducts
export const fetchCustomProducts = createAsyncThunk(
  "/customProducts/fetchCustomProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchCustomProductsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchCustomProducts

//*-----------------------------------createCustomProduct
export const createCustomProduct = createAsyncThunk(
  "/customProducts/createCustomProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateCustomProductFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createCustomProduct

//*-----------------------------------editCustomProductStatus
export const editCustomProductStatus = createAsyncThunk(
  "/customProducts/editCustomProductStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditCustomProductStatusFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createCustomProduct

//*-----------------------------------deleteCooperation
export const deleteCustomProduct = createAsyncThunk(
  "/customProducts/deleteCustomProduct",
  async (customProductId, { rejectWithValue }) => {
    try {
      const res = await DeleteCustomProductFunction(customProductId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteCooperation

//*-----------------------------------------------/asyncThunk
//*-----------------------------------------------selectors
export const {
  selectAll: selectAllCustomProducts,
  selectById: selectCustomProductById,
  selectIds: selectCustomProductsIds,
  selectTotal: selectCustomProductsCount,
} = customProductsAdaptor.getSelectors((state) => state.customProducts);

export const getCustomProductStatus = (state) => state.customProducts.status;
//*-----------------------------------------------/selectors

const customProductsReducer = customProductsSlice.reducer;

export default customProductsReducer;
