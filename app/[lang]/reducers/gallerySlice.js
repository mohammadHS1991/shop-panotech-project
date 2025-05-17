import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  CreateSingleGalleryFunction,
  DeleteSingleGalleryFunction,
  EditSingleGalleryFunction,
  FetchGalleriesFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const galleryAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = galleryAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------GallerySlice-----------------------------------------------

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers

  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchGalleries
      .addCase(fetchGalleries.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGalleries.fulfilled, (state, action) => {
        state.status = "completed";
        galleryAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchGalleries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchGalleries

      //*-----------------------------------createGallery
      .addCase(createGallery.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        galleryAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/createGallery

      //*-----------------------------------editGallery
      .addCase(editGallery.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editGallery.fulfilled, (state, action) => {
        galleryAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/editGallery

      //*-----------------------------------deleteGallery
      .addCase(deleteGallery.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        galleryAdaptor.removeOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteGallery

      .addMatcher(fetchGalleries.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      })
      .addMatcher(createGallery.settled, (state, action) => {
        state.status = "idle";
        state.error = "";
      });
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/GallerySlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------fetchGalleries
export const fetchGalleries = createAsyncThunk(
  "/gallery/fetchGalleries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchGalleriesFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchGalleries

//*-----------------------------------createGallery
export const createGallery = createAsyncThunk(
  "/gallery/createGallery",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateSingleGalleryFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createGallery

//*-----------------------------------editGallery
export const editGallery = createAsyncThunk(
  "/gallery/editGallery",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditSingleGalleryFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editGallery

//*-----------------------------------deleteGallery
export const deleteGallery = createAsyncThunk(
  "/gallery/deleteGallery",
  async (galleryId, { rejectWithValue }) => {
    try {
      const res = await DeleteSingleGalleryFunction(galleryId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteGallery

//*-----------------------------------------------/asyncThunk

//*-----------------------------------------------selectors
export const {
  selectAll: selectAllGalleries,
  selectById: selectGalleryById,
  selectIds: selectGalleriesIds,
  selectTotal: selectGalleriesCount,
} = galleryAdaptor.getSelectors((state) => state.gallery);

export const selectGalleryByEnSlug = (state, enSlug) =>
  Object.values(state.gallery.entities).find(
    (gallery) => gallery.slug.en === enSlug
  );

export const getGalleryStatus = (state) => state.gallery.status;

//*-----------------------------------------------/selectors

const galleryReducer = gallerySlice.reducer;
export default galleryReducer;
