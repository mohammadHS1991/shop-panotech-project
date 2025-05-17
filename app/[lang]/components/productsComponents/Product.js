import React from "react";
import ProductSlider from "./ProductSlider";
import Comments from "./Comments";
import { GetProductBySlugFunction } from "../../functions";
import AddToCartBtn from "./AddToCartBtn";
import ProductTabs from "./ProductTabs";
import { productText } from "../../data/data";
import Keywords from "../blogsComponents/Keywords";
import { notFound } from "next/navigation";
import priceDiscountCalc from "../../utils/priceDiscountCalc";

const Product = async ({ params }) => {
  const lang = params.lang;

  const product = await GetProductBySlugFunction(lang, params.productSlug);
  if (!product) notFound();

  return (
    <section>
      <article className="md:flex justify-between my-10 md:mx-10 xl:mx-40">
        <div className="md:w-1/2 lg:w-1/3 m-2">
          <article className="shadow-xl rounded-2xl border-1 border-gray-100 bg-gray-50 p-2 mb-2">
            <div className="px-2 pb-2 flex-col items-stretch">
              <b>{product?.name[lang]}</b>
              {product.qty <= 0 && (
                <b className="text-red-500"> {productText.NonExistent[lang]}</b>
              )}
              <Keywords
                keywords={product?.keywords[lang]}
                lang={lang}
                url={"/products"}
              />
              {product?.price[lang].discount == 0 ? (
                <div className="flex justify-end">
                  <p className="text-default-500">
                    {Number(product?.price[lang].amount).toLocaleString()}{" "}
                    {product?.price[lang].unit}
                  </p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <p className="text-red-500 me-1">
                    {priceDiscountCalc(
                      product?.price[lang].amount,
                      product?.price[lang].discount,
                      lang
                    ).toLocaleString()}
                  </p>
                  <p className="text-default-500 line-through">
                    {Number(product?.price[lang].amount).toLocaleString()}{" "}
                    {product?.price[lang].unit}
                  </p>
                </div>
              )}
            </div>
            <AddToCartBtn lang={lang} product={product} />
          </article>

          <ProductSlider images={product.images} />
        </div>
        <ProductTabs product={product} lang={lang} />
      </article>

      <Comments
        comments={product?.comments}
        productId={product?._id}
        lang={lang}
      />
    </section>
  );
};

export default Product;
