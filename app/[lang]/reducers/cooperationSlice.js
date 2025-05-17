import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  FetchCooperationsFunction,
  CreateCooperationFunction,
  DeleteCooperationFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const cooperationsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = cooperationsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------cooperationsSlice-----------------------------------------------
const cooperationsSlice = createSlice({
  name: "cooperations",
  initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers
  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchCooperations
      .addCase(fetchCooperations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCooperations.fulfilled, (state, action) => {
        state.status = "completed";
        cooperationsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchCooperations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //*-----------------------------------/fetchCooperations

      //*-----------------------------------createCooperation
      .addCase(createCooperation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createCooperation.fulfilled, (state, action) => {
        cooperationsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createCooperation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createCooperation

      //*-----------------------------------deleteCooperation

      .addCase(deleteCooperation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCooperation.fulfilled, (state, action) => {
        cooperationsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteCooperation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteCooperation

      .addMatcher(fetchCooperations.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(deleteCooperation.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createCooperation.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
  //*-----------------------------------------------/cooperationsSlice-----------------------------------------------
});

//*-----------------------------------------------asyncThunk
//*-----------------------------------fetchCooperations
export const fetchCooperations = createAsyncThunk(
  "/cooperations/fetchCooperations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchCooperationsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchCooperations

//*-----------------------------------createCooperation
export const createCooperation = createAsyncThunk(
  "/cooperations/createCooperation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateCooperationFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createCooperation

//*-----------------------------------deleteCooperation
export const deleteCooperation = createAsyncThunk(
  "/cooperations/deleteCooperation",
  async (cooperationId, { rejectWithValue }) => {
    try {
      const res = await DeleteCooperationFunction(cooperationId);
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
  selectAll: selectAllCooperations,
  selectById: selectCooperationById,
  selectIds: selectCooperationsIds,
  selectTotal: selectCooperationsCount,
} = cooperationsAdaptor.getSelectors((state) => state.cooperations);

//*-----------------------------------------------/selectors

const cooperationsReducer = cooperationsSlice.reducer;

export default cooperationsReducer;
