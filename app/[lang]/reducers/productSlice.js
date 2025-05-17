import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AddProductCommentFunction,
  CreateProductFunction,
  DeleteProductCommentFunction,
  DeleteProductFunction,
  EditProductCommentFunction,
  EditProductFunction,
  FetchProductsFunction,
} from "../functions";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const productsAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});
const initialState = productsAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------ProductsSlice-----------------------------------------------

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers

  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*-----------------------------------fetchProducts
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "completed";
        productsAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })

      //*-----------------------------------/fetchProducts

      //*-----------------------------------createProduct
      .addCase(createProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        productsAdaptor.addOne(state, action.payload);
        state.status = "completed";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // state.error = action.payload;
      })
      //*-----------------------------------/createProduct

      //*-----------------------------------editProduct
      .addCase(editProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        productsAdaptor.updateOne(state, {
          id: action.payload.returnObject._id,
          changes: action.payload.returnObject,
        });
        state.status = "completed";
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/editProduct

      //*-----------------------------------deleteProduct

      .addCase(deleteProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productsAdaptor.removeOne(state, action.payload._id);
        state.status = "completed";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/deleteProduct

      //*-----------------------------------addProductComment
      .addCase(addProductComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addProductComment.fulfilled, (state, action) => {
        productsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(addProductComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/addProductComment

      //*-----------------------------------editProductComment
      .addCase(editProductComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editProductComment.fulfilled, (state, action) => {
        productsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editProductComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------/editProductComment

      //*-----------------------------------deleteProductComment
      .addCase(deleteProductComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProductComment.fulfilled, (state, action) => {
        productsAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(deleteProductComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //*-----------------------------------/deleteProductComment

    // .addMatcher(fetchProducts.settled, (state, action) => {
    //   state.status = "idle";
    //   state.error = "";
    // })
    // .addMatcher(createProduct.settled, (state, action) => {
    //   state.status = "idle";
    //   state.error = "";
    // });
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/ProductsSlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------fetchProducts
export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchProductsFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//*-----------------------------------/fetchProducts

//*-----------------------------------createProduct
export const createProduct = createAsyncThunk(
  "/products/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateProductFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/createProduct

//*-----------------------------------editProduct
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditProductFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*----------------------------------/editProduct

//*-----------------------------------deleteProduct
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await DeleteProductFunction(productId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteProduct

//*-----------------------------------addProductComment
export const addProductComment = createAsyncThunk(
  "/products/addProductComment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AddProductCommentFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/addProductComment

//*-----------------------------------editProductComment
export const editProductComment = createAsyncThunk(
  "/products/editProductComment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditProductCommentFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/editProductComment

//*-----------------------------------editProductComment
export const deleteProductComment = createAsyncThunk(
  "/products/deleteProductComment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await DeleteProductCommentFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------/deleteProductComment

//*-----------------------------------------------/asyncThunk

//*-----------------------------------------------selectors
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectTotal: selectProductsCount,
} = productsAdaptor.getSelectors((state) => state.products);

export const selectProductByEnSlug = (state, enSlug) =>
  Object.values(state.products.entities).find(
    (product) => product.enSlug === enSlug
  );

export const getProductStatus = (state) => state.products.status;

//*-----------------------------------------------/selectors

const productsReducer = productsSlice.reducer;
export default productsReducer;
