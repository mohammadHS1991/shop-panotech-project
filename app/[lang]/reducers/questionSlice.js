import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateQuestionFunction,
  FetchQuestionsFunction,
  DeleteQuestionFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const questionsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = questionsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------questionsSlice-----------------------------------------------
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers
  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchQuestions
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "completed";
        questionsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //*-----------------------------------/fetchQuestions

      //*-----------------------------------createQuestion
      .addCase(createQuestion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        questionsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createQuestion
      //*-----------------------------------deleteQuestion

      .addCase(deleteQuestion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        questionsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteQuestion

      .addMatcher(fetchQuestions.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(deleteQuestion.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createQuestion.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
  //*-----------------------------------------------/questionsSlice-----------------------------------------------
});

//*-----------------------------------------------asyncThunk
//*-----------------------------------fetchQuestions
export const fetchQuestions = createAsyncThunk(
  "/questions/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchQuestionsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchQuestions

//*-----------------------------------createQuestion
export const createQuestion = createAsyncThunk(
  "/questions/createQuestion",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateQuestionFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createQuestion

//*-----------------------------------deleteQuestion
export const deleteQuestion = createAsyncThunk(
  "/questions/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const res = await DeleteQuestionFunction(questionId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteQuestion

//*-----------------------------------------------/asyncThunk
//*-----------------------------------------------selectors
export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionsIds,
  selectTotal: selectQuestionsCount,
} = questionsAdaptor.getSelectors((state) => state.questions);

//*-----------------------------------------------/selectors

const questionsReducer = questionsSlice.reducer;

export default questionsReducer;
