import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { selectAllProducts } from "./productSlice";

const localCartSlice = createSlice({
  name: "localCart",
  initialState:
    typeof window !== "undefined" && localStorage.getItem("localCart")
      ? JSON.parse(localStorage.getItem("localCart"))
      : [],

  reducers: {
    addedToLocalCart: (state, action) => {
      const { productId, productQty, qty } = action.payload;

      const productIndex = state.findIndex(
        (cartItem) => cartItem.product === productId
      );

      //------------------------------------------------------------
      if (productIndex !== -1) {
        if (
          (+qty === 1 || +qty === 10) &&
          state[productIndex].qty + +qty <= 30 &&
          state[productIndex].qty + +qty <= productQty
        ) {
          state[productIndex].qty += +qty;
        }

        if (+qty === -1) {
          if (state[productIndex].qty === 1) {
            state.splice(productIndex, 1);
          } else if (state[productIndex].qty > 1) {
            state[productIndex].qty += +qty;
          }
        }

        if (+qty === -10) {
          if (state[productIndex].qty > 10) {
            state[productIndex].qty += +qty;
          } else if (state[productIndex].qty === 10) {
            state.splice(productIndex, 1);
          }
        }
      }

      if (productIndex === -1 && +qty > 0) {
        state.push({ product: productId, qty: +qty });
      }

      localStorage.setItem("localCart", JSON.stringify(state));
    },

    emptyTheCart: (state, action) => {
      // state = action.payload;
      state.map((item,index)=>state.splice(index, 1))
      state.map((item,index)=>state.splice(index, 1))
      localStorage.setItem("localCart", JSON.stringify(action.payload));
    },
  },
});

export const { addedToLocalCart, emptyTheCart } = localCartSlice.actions;

export const getLocalCart = (state) => state.localCart;

const selectAllProducts = (state) => state.products;

export const getReferencedLocalCart = createSelector(
  [selectAllProducts, getLocalCart],
  (products, localCart) => {
    const cartItems = [];
    localCart.map((cartItem) => {
      const product = products.entities[cartItem.product];
      cartItems.push({ product: product, qty: cartItem.qty });
    });
    return cartItems;
  }
);

const localCartReducer = localCartSlice.reducer;
export default localCartReducer;
