import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../reducers/userSlice";
import productsReducer from "../reducers/productSlice";
import customProductsReducer from "../reducers/customProductSlice";
import eventsReducer from "../reducers/eventSlice";
import newsReducer from "../reducers/newsSlice";
import galleryReducer from "../reducers/gallerySlice";
import selectedGalleryReducer from "../reducers/selectedGallerySlice";
import questionsReducer from "../reducers/questionSlice";
import suggestionsReducer from "../reducers/suggestionSlice";
import cooperationsReducer from "../reducers/cooperationSlice";
import localCartReducer from "../reducers/localCartSlice";
import ordersReducer from "../reducers/orderSlice";
import faqsReducer from "../reducers/faqSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer,
        customProducts: customProductsReducer,
        events: eventsReducer,
        news: newsReducer,
        gallery: galleryReducer,
        selectedGallery: selectedGalleryReducer,
        questions: questionsReducer,
        suggestions: suggestionsReducer,
        cooperations: cooperationsReducer,
        localCart: localCartReducer,
        orders: ordersReducer,
        faqs: faqsReducer,
      }
})