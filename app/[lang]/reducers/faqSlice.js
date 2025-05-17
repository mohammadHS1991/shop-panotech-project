import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateFaqFunction,
  DeleteFaqFunction,
  EditFaqFunction,
  FetchFaqFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const faqsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = faqsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------FaqsSlice-----------------------------------------------

const faqsSlice = createSlice({
  name: "faqs",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers

  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchFaqs
      .addCase(fetchFaqs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.status = "completed";
        faqsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchFaqs

      //*-----------------------------------createFaq
      .addCase(createFaq.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        faqsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createFaq

      //*-----------------------------------editFaq
      .addCase(editFaq.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editFaq.fulfilled, (state, action) => {
        faqsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editFaq.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/editFaq

      //*-----------------------------------deleteFaq

      .addCase(deleteFaq.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        faqsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //*-----------------------------------/deleteFaq
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/FaqsSlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------fetchFaqs
export const fetchFaqs = createAsyncThunk(
  "/faqs/fetchFaqs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchFaqFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchFaqs

//*-----------------------------------createFaq
export const createFaq = createAsyncThunk(
  "/faqs/createFaq",
  async (values, { rejectWithValue }) => {
    try {
      const res = await CreateFaqFunction(values);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createFaq

//*-----------------------------------editFaq
export const editFaq = createAsyncThunk(
  "/faqs/editFaq",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditFaqFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editFaq

//*-----------------------------------deleteFaq
export const deleteFaq = createAsyncThunk(
  "/faqs/deleteFaq",
  async (faqId, { rejectWithValue }) => {
    try {
      const res = await DeleteFaqFunction(faqId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteFaq

//*-----------------------------------------------/asyncThunk

//*-----------------------------------------------selectors
export const {
  selectAll: selectAllFaqs,
  selectById: selectFaqById,
  selectIds: selectFaqIds,
  selectTotal: selectFaqsCount,
} = faqsAdaptor.getSelectors((state) => state.faqs);

//*-----------------------------------------------/selectors

const faqsReducer = faqsSlice.reducer;
export default faqsReducer;
