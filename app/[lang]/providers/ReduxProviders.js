//? app/reduxProviders.js
"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
//? ================== START initial fetch ==================
import { fetchProducts } from "../reducers/productSlice";
import { fetchUsers } from "../reducers/userSlice";
import { fetchEvents } from "../reducers/eventSlice";
import { fetchNews } from "../reducers/newsSlice";
import { fetchFaqs } from "../reducers/faqSlice";
import { fetchGalleries } from "../reducers/gallerySlice";
import { fetchSelectedGallery } from "../reducers/selectedGallerySlice";
import { fetchQuestions } from "../reducers/questionSlice";
import { fetchCooperations } from "../reducers/cooperationSlice";
import { fetchSuggestions } from "../reducers/suggestionSlice";
import { fetchOrders } from "../reducers/orderSlice";
import { fetchCustomProducts } from "../reducers/customProductSlice";
//? ================== / END initial fetch ==================

const ReduxProviders = ({ children }) => {
  //? ================== START initial fetch ==================
  useEffect(() => {
    store.dispatch(fetchProducts());
    store.dispatch(fetchEvents());
    store.dispatch(fetchUsers());
    store.dispatch(fetchNews());
    store.dispatch(fetchFaqs());
    store.dispatch(fetchGalleries());
    store.dispatch(fetchSelectedGallery());
    store.dispatch(fetchQuestions());
    store.dispatch(fetchCooperations());
    store.dispatch(fetchSuggestions());
    store.dispatch(fetchOrders());
    store.dispatch(fetchCustomProducts());
  }, []);
  //? ================== / END initial fetch ==================
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviders;
