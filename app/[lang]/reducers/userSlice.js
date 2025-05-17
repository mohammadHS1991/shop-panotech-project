import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AddLocalCartToUserFunction,
  EditUserInfosFunction,
  EditUserOpenCartFunction,
  EditUserRoleFunction,
  EmptyOpenCartFunction,
  FetchUsersFunction,
  FinishOpenCartFunction,
} from "../functions";
import { deleteProduct, editProduct } from "./productSlice";

//*-----------------------------------------------EntityAdapter-----------------------------------------------
const userAdaptor = createEntityAdapter({
  selectId: (entity) => entity._id,
});
const initialState = userAdaptor.getInitialState({
  status: "idle",
  error: null,
});
//*-----------------------------------------------/EntityAdapter-----------------------------------------------

//*-----------------------------------------------usersSlice-----------------------------------------------

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  //*-----------------------------------------------reducers
  reducers: {},
  //*-----------------------------------------------/reducers
  //*-----------------------------------------------extraReducers
  extraReducers: (builder) => {
    builder
      //*----------------------------------------------fetchUsers
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "completed";
        userAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message;
        state.error = action.payload;
      })
      //*----------------------------------------------/fetchUsers

      //*-----------------------------------------------editUserInfos
      .addCase(editUserInfos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editUserInfos.fulfilled, (state, action) => {
        userAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editUserInfos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/editUserInfos

      //*-----------------------------------------------editUserRole
      .addCase(editUserRole.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editUserRole.fulfilled, (state, action) => {
        userAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/editUserRole

      //*-----------------------------------------------emptyOpenCart
      .addCase(emptyOpenCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(emptyOpenCart.fulfilled, (state, action) => {
        userAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(emptyOpenCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/emptyOpenCart

      //*-----------------------------------------------editUserOpenCart
      .addCase(editUserOpenCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editUserOpenCart.fulfilled, (state, action) => {
        userAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
      })
      .addCase(editUserOpenCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/editUserOpenCart

      //*-----------------------------------------------addLocalCartToUser
      .addCase(addLocalCartToUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addLocalCartToUser.fulfilled, (state, action) => {
        userAdaptor.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.status = "completed";
        // state.localCart = [];
      })
      .addCase(addLocalCartToUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/addLocalCartToUser

      //*-----------------------------------------------finishOpenCart
      .addCase(finishOpenCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(finishOpenCart.fulfilled, (state, action) => {
        userAdaptor.updateOne(state, {
          id: action.payload.user._id,
          changes: action.payload.user,
        });
        state.status = "completed";
      })
      .addCase(finishOpenCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //*-----------------------------------------------/finishOpenCart

      //*-----------------------------------------------change users cart if product is changed to disable
      .addCase(editProduct.fulfilled, (state, action) => {
        if (action.payload.users.length > 0) {
          userAdaptor.setAll(state, action.payload.users);
          state.status = "completed";
        }
      })

      //*-----------------------------------------------change users cart if product deleted
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload.users.length > 0) {
          userAdaptor.setAll(state, action.payload.users);
          state.status = "completed";
        }
      });
    // .addMatcher(fetchUsers.settled, (state, action) => {
    //   state.status = "idle";
    //   state.error = "";
    // });
  },
  //*-----------------------------------------------/extraReducers
});

//*-----------------------------------------------/usersSlice-----------------------------------------------

//*-----------------------------------------------asyncThunk

//*-----------------------------------------------fetchUsers
export const fetchUsers = createAsyncThunk(
  "/users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await FetchUsersFunction();
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/fetchUsers

//*-----------------------------------------------editUserInfos
export const editUserInfos = createAsyncThunk(
  "/users/editUserInfos",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditUserInfosFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/editUserInfos

//*-----------------------------------------------editUserRole
export const editUserRole = createAsyncThunk(
  "/users/editUserRole",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditUserRoleFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/editUserRole

//*-----------------------------------------------emptyOpenCart
export const emptyOpenCart = createAsyncThunk(
  "/users/emptyOpenCart",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EmptyOpenCartFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/emptyOpenCart

//*-----------------------------------------------editUserOpenCart
export const editUserOpenCart = createAsyncThunk(
  "/users/editUserOpenCart",
  async (data, { rejectWithValue }) => {
    try {
      const res = await EditUserOpenCartFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/editUserOpenCart

//*-----------------------------------------------addLocalCartToUser
export const addLocalCartToUser = createAsyncThunk(
  "/users/addLocalCartToUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AddLocalCartToUserFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/addLocalCartToUser

//*-----------------------------------------------finishOpenCart
export const finishOpenCart = createAsyncThunk(
  "/users/finishOpenCart",
  async (data, { rejectWithValue }) => {
    try {
      const res = await FinishOpenCartFunction(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//*-----------------------------------------------/finishOpenCart

//*-----------------------------------------------/asyncThunk

//*-----------------------------------------------selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectTotal: selectUsersCount,
} = userAdaptor.getSelectors((state) => state.users);

export const getUserStatus = (state) => state.status;
//*-----------------------------------------------/selectors

const usersReducer = usersSlice.reducer;
export default usersReducer;
