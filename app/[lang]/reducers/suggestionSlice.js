import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  FetchSuggestionsFunction,
  CreateSuggestionFunction,
  DeleteSuggestionFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const suggestionsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = suggestionsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------suggestionsSlice-----------------------------------------------
const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers
  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchSuggestions
      .addCase(fetchSuggestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "completed";
        suggestionsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //*-----------------------------------/fetchSuggestions

      //*-----------------------------------createSuggestion
      .addCase(createSuggestion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createSuggestion.fulfilled, (state, action) => {
        suggestionsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createSuggestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createSuggestion

      //*-----------------------------------deleteSuggestion

      .addCase(deleteSuggestion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteSuggestion.fulfilled, (state, action) => {
        suggestionsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteSuggestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteSuggestion

      .addMatcher(fetchSuggestions.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(deleteSuggestion.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createSuggestion.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
  //*-----------------------------------------------/suggestionsSlice-----------------------------------------------
});

//*-----------------------------------------------asyncThunk
//*-----------------------------------fetchSuggestions
export const fetchSuggestions = createAsyncThunk(
  "/suggestions/fetchSuggestions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchSuggestionsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchSuggestions

//*-----------------------------------createSuggestion
export const createSuggestion = createAsyncThunk(
  "/suggestions/createSuggestion",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateSuggestionFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createSuggestion

//*-----------------------------------deleteSuggestion
export const deleteSuggestion = createAsyncThunk(
  "/suggestions/deleteSuggestion",
  async (suggestionId, { rejectWithValue }) => {
    try {
      const res = await DeleteSuggestionFunction(suggestionId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteSuggestion

//*-----------------------------------------------/asyncThunk
//*-----------------------------------------------selectors
export const {
  selectAll: selectAllSuggestions,
  selectById: selectSuggestionById,
  selectIds: selectSuggestionsIds,
  selectTotal: selectSuggestionsCount,
} = suggestionsAdaptor.getSelectors((state) => state.suggestions);

//*-----------------------------------------------/selectors

const suggestionsReducer = suggestionsSlice.reducer;

export default suggestionsReducer;
