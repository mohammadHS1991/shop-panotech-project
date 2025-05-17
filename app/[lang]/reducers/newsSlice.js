import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateNewsFunction,
  DeleteNewsFunction,
  EditNewsFunction,
  FetchNewsFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const newsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = newsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------NewsSlice-----------------------------------------------

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers

  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchNews
      .addCase(fetchNews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "completed";
        newsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchNews

      //*-----------------------------------createNews
      .addCase(createNews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createNews.fulfilled, (state, action) => {
        newsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createNews

      //*-----------------------------------editNews
      .addCase(editNews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editNews.fulfilled, (state, action) => {
        newsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/editNews

      //*-----------------------------------deleteNews
      .addCase(deleteNews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        newsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteNews

      .addMatcher(fetchNews.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createNews.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/NewsSlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------fetchNews
export const fetchNews = createAsyncThunk(
  "/news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchNewsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchNews

//*-----------------------------------createNews
export const createNews = createAsyncThunk(
  "/news/createNews",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateNewsFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createNews

//*-----------------------------------editNews
export const editNews = createAsyncThunk(
  "/news/editNews",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditNewsFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editNews

//*-----------------------------------deleteNews
export const deleteNews = createAsyncThunk(
  "/news/deleteNews",
  async (newsId, { rejectWithValue }) => {
    try {
      const res = await DeleteNewsFunction(newsId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteEvent

//*-----------------------------------------------/asyncThunk

//*-----------------------------------------------selectors
export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds,
  selectTotal: selectNewsCount,
} = newsAdaptor.getSelectors((state) => state.news);

export const selectNewsByEnSlug = (state, enSlug) =>
  Object.values(state.news.entities).find((event) => event.enSlug === enSlug);

export const getEventStatus = (state) => state.news.status;

//*-----------------------------------------------/selectors

const newsReducer = newsSlice.reducer;
export default newsReducer;
