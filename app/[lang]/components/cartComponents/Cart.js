"use client";

import React from "react";
import { useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import CartItems from "./CartItems";
import SwiperCard from "../SwiperCard";
import { useSession } from "next-auth/react";
import { getReferencedLocalCart } from "../../reducers/localCartSlice";
import { selectUserById } from "../../reducers/userSlice";
import { selectAllProducts } from "../../reducers/productSlice";
import { cartText } from "../../data/data";

const Cart = ({ params }) => {
  const lang = params.lang;
  const session = useSession();
  const userId = session?.data?.user?.id;
  const sliderTitle = cartText.slider[lang];

  //? ======================== START useSelector ========================
  const userCartItems = useSelector((state) =>
    selectUserById(state, userId)
  )?.openCart;
  const localCartItems = useSelector(getReferencedLocalCart);
  const products = useSelector(selectAllProducts);
  //? ======================== / END useSelector ========================
  return (
    <>
      {
        session.status == "authenticated" ? 
        // ===== START LoginCart =====
        (
          userCartItems?.length > 0 ? (
            <>
              <CartItems cartItems={userCartItems} />
              <SwiperCard
                data={products}
                bgColor={"bg-green-50"}
                title={sliderTitle}
                lang={lang}
                txtColor={"text-green-800"}
              />
            </>
          ) : (
            <CartEmpty lang={lang} />
          )
        )
        // ===== / END LoginCart =====
        :
        // ===== START LogoutCart ====
        localCartItems?.length > 0 ? (
          <>
            <CartItems cartItems={localCartItems} />
            <SwiperCard
              data={products}
              bgColor={"bg-green-50"}
              title={sliderTitle}
              lang={lang}
              txtColor={"text-green-800"}
            />
          </>
        ) : (
          <CartEmpty lang={lang} />
        )
        // ===== / END LogoutCart ====
      }
    </>
  );
};

export default Cart;
