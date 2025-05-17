import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { EditOrderStatusFunction, FetchOrdersFunction } from "../functions";
import { finishOpenCart } from "./userSlice";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const ordersAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = ordersAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------ordersSlice-----------------------------------------------
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers
  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchOrders
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "completed";
        ordersAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/fetchOrders

      //*-----------------------------------------------editOrderStatus
      .addCase(editOrderStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editOrderStatus.fulfilled, (state, action) => {
        ordersAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/editOrderStatus
      .addCase(finishOpenCart.fulfilled, (state, action) => {
        ordersAdaptor.addOne(state, action.payload.order);
      });
  },
  //*-----------------------------------------------/extraReducers
  //*-----------------------------------------------/ordersSlice-----------------------------------------------
});

//*-----------------------------------------------asyncThunk
//*-----------------------------------fetchOrders
export const fetchOrders = createAsyncThunk(
  "/orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchOrdersFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchOrders

//*-----------------------------------editOrderStatus
export const editOrderStatus = createAsyncThunk(
  "/orders/editOrderStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditOrderStatusFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editOrderStatus

//*-----------------------------------------------/asyncThunk
//*-----------------------------------------------selectors
export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrdersIds,
  selectTotal: selectOrdersCount,
} = ordersAdaptor.getSelectors((state) => state.orders);

//*-----------------------------------------------/selectors

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
