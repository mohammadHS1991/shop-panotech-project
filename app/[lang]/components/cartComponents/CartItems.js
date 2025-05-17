"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import CustomizedProductModal from "./CustomizedProductModal";
import { addedToLocalCart } from "../../reducers/localCartSlice";
import {
  editUserOpenCart,
  selectUserById,
} from "../../reducers/userSlice";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import CustomToast from "../CustomToast";
import { cartText, customTostText } from "../../data/data";
import FinishCartModal from "./FinishCartModal";
import CancelCartModal from "./CancelCartModal";
import priceDiscountCalc from "../../utils/priceDiscountCalc";

const CartItems = ({ cartItems }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const router = useRouter();
  const params = useParams();
  const lang = params.lang;

  const [addLoading, setAddLoading] = useState(false);

  //? ========= ** START totalPrice / totalDiscount / cartQty ** ========
  //?  **** totalPrice ****
  const totalPrice = cartItems.reduce(
    (value, cartItem) =>
      value + cartItem.qty * cartItem?.product?.price[lang]?.amount,
      0
  );
  //? **** totalDiscount ****
  const totalDiscount = cartItems.reduce(
    (value, cartItem) =>
      value + (Math.round((cartItem?.product?.price[lang]?.amount * (cartItem?.product?.price[lang]?.discount / 100)) / 1000) * 1000) * cartItem.qty,
      0
  );
  //? **** cartQty ****
  const cartQty = cartItems.reduce(
    (value, cartItem) => value + cartItem.qty,
    0
  );
  //? ========= ** / END totalPrice / totalDiscount / cartQty ** ========
  //? ======================== START useSelector ========================
  const user = useSelector((state) => selectUserById(state, userId));
  const userAddress = user?.address;
  const userPostalCode = user?.postalCode;
  //? ======================== / END useSelector ========================
  //? ======================== START useDispatch ========================
  const dispatch = useDispatch();
  //? ======================== / END useDispatch ========================
  //? ====================== START handleAddToCart ======================
  const handleAddToCart = async (productId, qty) => {
    if (session.status == "authenticated") {
      setAddLoading(true);
      try {
        const data = { userId, productId, qty };
        const res = await dispatch(editUserOpenCart(data)).unwrap();
        qty > 0
          ? CustomToast(
              "success",
              customTostText.products.addToCart.Success[lang]
            )
          : CustomToast(
              "success",
              customTostText.products.delFromCart.Success[lang]
            );
      } catch (err) {
        qty > 0
          ? CustomToast("success", customTostText.products.addToCart.Err[lang])
          : CustomToast(
              "success",
              customTostText.products.delFromCart.Err[lang]
            );
      } finally {
        setAddLoading(false);
      }
    } else {
      dispatch(addedToLocalCart({ productId, productQty: 50, qty }));
      qty > 0
        ? CustomToast(
            "success",
            customTostText.products.addToCart.Success[lang]
          )
        : CustomToast(
            "success",
            customTostText.products.delFromCart.Success[lang]
          );
    }
  };
  //? ====================== / END handleAddToCart ======================
  //? ===================== START handleCompleteInfo ====================
  const handleCompleteInfo = () => {
    CustomToast("success", customTostText.products.completeInfo[lang]);
    router.push(`/${lang}/admin/accountInformation`);
  };
  //? ==================== / END handleCompleteInfo =====================

  return (
    <section className="lg:flex mx-3 xs:mx-5 sm:mx-10 md:mx-20 2xl:mx-40 my-8">
      {/* ============================== ** start cartItems ** ============================== */}
      <article
        className="
        shadow-2xl rounded-xl
        w-full lg:w-2/3 p-5 mb-4 lg:mb-0 lg:me-4
        gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      >
        {cartItems &&
          cartItems.map((cartItem, index) => (
            <Card key={index} shadow="sm">
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={cartItem?.product?.name[lang]}
                  className="w-full object-cover h-[240px]"
                  src={`/${cartItem?.product?.images[0]?.name}`}
                />
              </CardBody>

              <CardFooter className="text-small flex-col items-stretch">
                <b>{cartItem?.product?.name[lang]}</b>
                {cartItem?.product?.price[lang]?.discount == 0 ? (
                  <div className="flex justify-end">
                    <p className="text-default-500">
                      {Number(
                        cartItem.product.price[lang].amount
                      ).toLocaleString()}
                      {/* {cartItem.product.price[lang].unit} */}
                      {lang == "fa" ? "ریال" : "$"}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <p className="text-red-500 me-1">
                      {/* {Number(
                        (
                          (1 - cartItem?.product?.price[lang]?.discount / 100) *
                          cartItem?.product?.price[lang]?.amount
                        ).toFixed(2)
                      ).toLocaleString()} */}
                      {priceDiscountCalc(
                        cartItem?.product?.price[lang]?.amount,
                        cartItem?.product?.price[lang]?.discount,
                        lang
                      ).toLocaleString()}
                    </p>
                    <p className="text-default-500 line-through">
                      {Number(
                        cartItem?.product?.price[lang]?.amount
                      ).toLocaleString()}
                      {/* {cartItem.product.price[lang].unit} */}
                      {lang == "fa" ? "ریال" : "$"}
                    </p>
                  </div>
                )}
              </CardFooter>

              {cartItem.qty >= 30 ? (
                <div className="flex items-center m-2">
                  <CustomizedProductModal cartItem={cartItem} />
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-gray-300 hover:text-red-500"
                    onClick={() => {
                      handleAddToCart(cartItem.product._id, -1);
                    }}
                  >
                    <MdCancel size={20} />
                  </Button>
                </div>
              ) : (
                <div className="flex border-2 m-2 border-green-500 rounded-lg hover:bg-green-50 h-[50px]">
                  <div className="flex justify-between items-center w-full peer">
                    <Button
                      isIconOnly
                      isLoading={addLoading}
                      variant="light"
                      className="hover:text-green-500"
                      onClick={() => {
                        handleAddToCart(cartItem.product._id, 1);
                      }}
                    >
                      <FaPlus />
                    </Button>
                    <p className="flex justify-center items-center font-bold text-lg">
                      {" "}
                      {cartItem.qty}{" "}
                    </p>
                    <Button
                      isIconOnly
                      isLoading={addLoading}
                      variant="light"
                      className="hover:text-red-500"
                      onClick={() => {
                        handleAddToCart(cartItem.product._id, -1);
                      }}
                    >
                      {cartItem.qty > 1 ? <FaMinus /> : <FaTrashAlt />}
                    </Button>
                  </div>

                  <div className="m-px hidden peer-hover:block hover:block">
                    <button
                      disabled={cartItem.qty > 20}
                      onClick={() => {
                        handleAddToCart(cartItem.product._id, 10);
                      }}
                      className="
                      flex justify-center items-center
                      border-2 border-green-500 rounded-lg p-px
                      hover:bg-green-500 hover:text-white hover:border-gray-300"
                    >
                      <p className="font-bold text-xs">10</p>
                      <FaPlus size={5} />
                    </button>
                    <button
                      disabled={cartItem.qty <= 10}
                      onClick={() => {
                        handleAddToCart(cartItem.product._id, -10);
                      }}
                      className="
                                        flex justify-center items-center
                                        border-2 border-green-500 rounded-lg p-px
                                        hover:bg-red-500 hover:text-white hover:border-gray-300"
                    >
                      <p className="font-bold text-xs">10</p>
                      <FaMinus size={5} />
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
      </article>
      {/* ============================== ** /end cartItems ** ============================== */}
      {/* ============================== ** start cartSideBar ** ============================== */}
      <aside className="shadow-2xl rounded-xl bg-white w-full lg:w-1/3 p-8">
        {/* ===== START totalCunt ===== */}
        <div className="flex justify-between my-2">
          <p> {cartText.totalCunt[lang]} </p>
          <p> {cartQty} </p>
        </div>
        {/* ===== / END totalCunt ===== */}
        {/* ===== START totalPrice ===== */}
        <div className="flex justify-between my-2">
          <p> {cartText.totalPrice[lang]} </p>
          <p>
            {" "}
            {Number(totalPrice.toFixed(2)).toLocaleString()}{" "}
            {lang == "fa" ? "ریال" : "$"}{" "}
          </p>
        </div>
        {/* ===== / END totalPrice ===== */}
        {/* ===== START discount ===== */}
        <div className="flex justify-between my-2 text-red-500">
          <p> {cartText.discount[lang]} </p>
          <p>
            {totalDiscount == 0
              ? 0
              : ` ${Number(totalDiscount.toFixed(2)).toLocaleString()} ${
                  lang == "fa" ? "ریال" : "$"
                } `}
          </p>
        </div>
        {/* ===== / END discount ===== */}
        <Divider />
        {/* ===== START totalPay ===== */}
        <div className="flex justify-between my-2">
          <p> {cartText.totalPay[lang]} </p>
          <p>
            {" "}
            {Number(
              (totalPrice - totalDiscount).toFixed(2)
            ).toLocaleString()}{" "}
            {lang == "fa" ? "ریال" : "$"}{" "}
          </p>
        </div>
        {/* ===== / END totalPay ===== */}
        {/* ===== START FinishTheCart BTN ===== */}
        {session.status == "authenticated" ? (
          userAddress && userPostalCode ? (
            <FinishCartModal
              totalPrice={totalPrice}
              totalDiscount={totalDiscount}
              userId={userId}
              lang={lang}
            />
          ) : (
            <Button
              className="bg-green-500 text-white text-base font-bold w-full mt-5"
              onClick={() => handleCompleteInfo()}
            >
              {cartText.finishBTN[lang]}
            </Button>
          )
        ) : (
          <Link href={`/${lang}/login`}>
            <button className="bg-green-500 text-white text-base font-bold w-full py-2 rounded-xl mt-5">
              {(lang == "fa" && "لطفا واردشوید") ||
                (lang == "en" && "Please log in") ||
                (lang == "ar" && "يرجى تسجيل الدخول")}
            </button>
          </Link>
        )}
        {/* ===== / END FinishTheCart BTN ===== */}
        {/* ===== START CancelTheCart BTN ===== */}
        <CancelCartModal session={session} lang={lang} />
        {/* ===== / END CancelTheCart BTN ===== */}
      </aside>
      {/* ============================== ** /end cartSideBar ** ============================== */}
    </section>
  );
};

export default CartItems;
