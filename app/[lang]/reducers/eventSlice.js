import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateEventFunction,
  DeleteEventFunction,
  EditEventFunction,
  FetchEventsFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const eventsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = eventsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------EventsSlice-----------------------------------------------

const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers

  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchEvents
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "completed";
        eventsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchEvents

      //*-----------------------------------createEvent
      .addCase(createEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        eventsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createEvent

      //*-----------------------------------editEvent
      .addCase(editEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        eventsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/editEvent

      //*-----------------------------------deleteEvent

      .addCase(deleteEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        eventsAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteEvent

      .addMatcher(fetchEvents.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createEvent.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/EventsSlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------fetchEvents
export const fetchEvents = createAsyncThunk(
  "/events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchEventsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchEvents

//*-----------------------------------createEvent
export const createEvent = createAsyncThunk(
  "/events/createEvent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateEventFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createEvent

//*-----------------------------------editEvent
export const editEvent = createAsyncThunk(
  "/events/editEvent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditEventFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editEvent

//*-----------------------------------deleteEvent
export const deleteEvent = createAsyncThunk(
  "/events/deleteEvent",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await DeleteEventFunction(productId);
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
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventIds,
  selectTotal: selectEventsCount,
} = eventsAdaptor.getSelectors((state) => state.events);

export const selectEventByEnSlug = (state, enSlug) =>
  Object.values(state.events.entities).find((event) => event.enSlug === enSlug);

export const getEventStatus = (state) => state.events.status;

//*-----------------------------------------------/selectors

const eventsReducer = eventsSlice.reducer;
export default eventsReducer;
