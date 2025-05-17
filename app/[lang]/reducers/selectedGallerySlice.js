import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateSelectedGalleryFunction,
  EditSelectedGalleryFunction,
  FetchSelectedGalleryFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const selectedGalleryAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = selectedGalleryAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------selectedGallerySlice-----------------------------------------------

const selectedGallerySlice = createSlice({
  name: "selectedGallery",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers

  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchSelectedGallery
      .addCase(fetchSelectedGallery.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSelectedGallery.fulfilled, (state, action) => {
        state.status = "completed";
        selectedGalleryAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchSelectedGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchSelectedGallery

      //*-----------------------------------createSelectedGallery
      .addCase(createSelectedGallery.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createSelectedGallery.fulfilled, (state, action) => {
        selectedGalleryAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createSelectedGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createSelectedGallery

      //*-----------------------------------editSelectedGallery
      .addCase(editSelectedGallery.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editSelectedGallery.fulfilled, (state, action) => {
        selectedGalleryAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editSelectedGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //*-----------------------------------/editSelectedGallery
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/selectedGallerySlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------fetchSelectedGallery
export const fetchSelectedGallery = createAsyncThunk(
  "/selectedGallery/fetchSelectedGallery",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchSelectedGalleryFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchSelectedGallery

//*-----------------------------------createSelectedGallery
export const createSelectedGallery = createAsyncThunk(
  "/selectedGallery/createSelectedGallery",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateSelectedGalleryFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createSelectedGallery

//*-----------------------------------editSelectedGallery
export const editSelectedGallery = createAsyncThunk(
  "/selectedGallery/editSelectedGallery",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditSelectedGalleryFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editSelectedGallery

//*-----------------------------------------------/asyncThunk

//*-----------------------------------------------selectors
export const {
  selectById: selectSelectedGalleryById,
  selectIds: selectGalleriesIds,
  selectTotal: selectGalleriesCount,
} = selectedGalleryAdaptor.getSelectors((state) => state.selectedGallery);

//*-----------------------------------------------/selectors

const selectedGalleryReducer = selectedGallerySlice.reducer;
export default selectedGalleryReducer;
