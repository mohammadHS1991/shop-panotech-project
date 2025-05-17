"use client";

import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { editUserOpenCart } from "../reducers/userSlice";
import { useSession } from "next-auth/react";
import { addedToLocalCart } from "../reducers/localCartSlice";
import CustomToast from "./CustomToast";
import { customTostText, productText } from "../data/data";
import priceDiscountCalc from "../utils/priceDiscountCalc";

const ProductCard = ({ product, lang }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const [addLoading, setAddLoading] = useState(false);

//? ======================== START useDispatch ========================
  const dispatch = useDispatch();
//? ======================== / END useDispatch ========================
//? ====================== START handleAddToCart ======================
  const handleAddToCart = async (productId, qty) => {
    if (session.status == "authenticated") {
      setAddLoading(true);
      try {
        const data = { productId, userId, qty };
        const res = await dispatch(editUserOpenCart(data)).unwrap();
        CustomToast("success", customTostText.products.addToCart.Success[lang]);
      } catch (err) {
        CustomToast("error", customTostText.products.addToCart.Err[lang]);
      } finally {
        setAddLoading(false);
      }
    } else {
      dispatch(addedToLocalCart({ productId, productQty: 50, qty }));
      CustomToast("success", customTostText.products.addToCart.Success[lang]);
    }
  };
//? ====================== / END handleAddToCart ======================

  return (
    <Card shadow="sm">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name[lang]}
          className="relative w-full object-cover h-[240px]"
          src={`/${product.images[0].name}`}
        />
        {product.qty <= 0 && (
          <p className="p-2 rounded-full absolute z-10 start-2 top-2 text-red-700 text-sm bg-red-500/50">
            {productText.NonExistent[lang]}
          </p>
        )}
      </CardBody>

      <CardFooter className="text-small flex-col items-stretch">
        <Link href={`/${lang}/products/${product.slug[lang]}`}>
          <b className="capitalize">{product?.name[lang]}</b>
        </Link>

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
              {/* {Number(
                (
                  (1 - product?.price[lang]?.discount / 100) *
                  product?.price[lang]?.amount
                ).toFixed(2)
              ).toLocaleString()} */}
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
      </CardFooter>

      <Button
        endContent={<FaShoppingCart />}
        className="bg-green-500 text-white text-base font-bold"
        onClick={() => {
          handleAddToCart(product._id, 1);
        }}
        isLoading={addLoading}
        isDisabled={product.qty <= 0}
      >
        {productText.addBTN[lang]}
      </Button>
    </Card>
  );
};

export default ProductCard;
