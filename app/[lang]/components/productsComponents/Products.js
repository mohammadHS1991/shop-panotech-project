
import React from "react";
import ProductCard from "../ProductCard";
import SwiperCard from "../SwiperCard";
import Baner from "../headerFooterComponents/Baner";
import {
  FetchPaginatedProductsFunction,
  GetProductsCountFunction,
} from "../../functions";
import CustomAsyncPagination from "../CustomAsyncPagination";
import { productText } from "../../data/data";
import ProductsEmpty from "./ProductsEmpty";
import { notFound } from "next/navigation";

const Products = async ({ category, page, lang, keyword }) => {
  let productsCount = await GetProductsCountFunction(lang || 'fa' , keyword || null);
  let products = await FetchPaginatedProductsFunction(lang || 'fa' , keyword || null , page || 1);
  if (!products) notFound();

  return (
    <>
      <Baner title={productText.title[lang]} />
      
      {products.length>0 ?
      <>
        <SwiperCard
          data={products}
          bgColor={"bg-green-50"}
          txtColor={"text-green-800"}
          title={productText.slider[lang]}
          lang={lang}
        />

        <section
          className="
              shadow-xl rounded-xl border-1 border-gray-50
              mx-5 xs:mx-10 sm:mx-20 2xl:mx-40 my-10 p-5
              gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
            "
        >
          {products && products.map((product, index) => (
              <ProductCard key={index} product={product} lang={lang} />
            ))}
        </section>

        <footer>
          <CustomAsyncPagination
            counts={productsCount}
            type='products'
            keyword={keyword}
            category={category}
            lang={lang}
          />
        </footer>
      </>
      :
       <ProductsEmpty lang={lang}/>
      }
    </>
  );
};

export default Products;
