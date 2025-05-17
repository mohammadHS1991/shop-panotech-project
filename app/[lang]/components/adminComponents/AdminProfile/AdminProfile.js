"use client";

import React from "react";
import { Button, Image } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { useSelector } from "react-redux";
import { selectAllProducts } from "@/app/[lang]/reducers/productSlice";

const AdminProfile = ({ params }) => {
  const lang = params.lang;

  //? ========================  START useSelector  ========================
  const products = useSelector(selectAllProducts);
  //? ========================  / END useSelector  ========================

  return (
    <section
      className="
          shadow-2xl rounded-2xl border-1 bg-white border-gray-50
          ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 mb-10 p-5
        "
    >

      <header className="flex justify-between font-bold text-lg text-white bg-green-500 rounded-xl">
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          ردیف{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          عکس{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          عنوان{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          قیمت{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          تخفیف %{" "}
        </p>
        <p className="flex justify-center items-center lg:w-1/6">
          <AddProductModal />
        </p>
      </header>

      {products.length > 0 ? (
        products?.map((product, index) => (
          <div key={index}>
            <div className="xs:hidden flex justify-center items-center mt-2">
              <Image
                alt={product.name[lang]}
                src={`/${product.images[0].name}`}
                shadow="sm"
                className="w-full"
              />
            </div>
            <article
              key={index}
              className="flex justify-between py-8 border-b-2 border-green-800"
            >
              <p className="hidden lg:flex justify-center items-center w-1/6">
                {index + 1}
              </p>

              <div className="hidden xs:flex justify-center items-center w-2/6 lg:w-1/6">
                <Image
                  alt={product.name[lang]}
                  src={`/${product.images[0].name}`}
                  shadow="sm"
                  className="w-28 h-28"
                />
              </div>

              <p className="hidden lg:flex justify-center items-center w-1/6">
                {product?.name[lang]}
              </p>
              <p className="hidden lg:flex justify-center items-center w-1/6">
                {product?.price[lang].amount} {product?.price[lang].unit}
              </p>
              <p className="hidden lg:flex justify-center items-center w-1/6">
                {product?.price[lang].discount}
              </p>

              <article
                className="
              flex lg:hidden flex-col lg:flex-row justify-between items-stretch
              ms-2 w-4/6 xs:w-3/6"
              >
                <section className="border-b-2 mb-2 sm:flex justify-between items-center">
                  <p className="flex justify-start sm:justify-center items-center">
                    {" "}
                    عنوان :{" "}
                  </p>
                  <p className="flex justify-end sm:justify-center items-center">
                    {product?.name[lang]}
                  </p>
                </section>
                <section className="border-b-2 mb-2 sm:flex justify-between items-center">
                  <p className="flex justify-start sm:justify-center items-center">
                    {" "}
                    قیمت :{" "}
                  </p>
                  <p className="flex justify-end sm:justify-center items-center">
                    {product?.price[lang].amount}{" "}
                    {product?.price[lang].unit}
                  </p>
                </section>
                <section className="border-b-2 mb-2 sm:flex justify-between items-center">
                  <p className="flex justify-start sm:justify-center items-center">
                    {" "}
                    تخفیف % :{" "}
                  </p>
                  <p className="flex justify-end sm:justify-center items-center">
                    {product?.price[lang].discount}
                  </p>
                </section>
              </article>

              <div className="flex flex-col lg:flex-row justify-center items-center w-1/6">
                <EditProductModal product={product} />
                <DeleteProductModal productId={product._id} />
                <Button
                  variant="light"
                  isIconOnly
                  className="text-xl text-gray-400 hover:text-blue-500"
                >
                  <FaEye />
                </Button>
              </div>
            </article>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p
            className="
                bg-gray-100 text-red-500
                shadow-xl rounded-2xl border-1 border-gray-100
                my-10 mx-auto py-8 px-4 w-3/4 md:w-2/4 xl:w-1/4"
          >
            اطلاعاتی برای نمایش موجود نیست
          </p>
        </div>
      )}

    </section>
  );
};

export default AdminProfile;