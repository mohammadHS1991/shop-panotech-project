"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { selectUserById } from "../../reducers/userSlice";
import DateShow from "../DateShow";
import { ordersText } from "../../data/data";

const Orders = ({ params }) => {
  const lang = params.lang;
  const session = useSession();
  const userId = session?.data?.user?.id;

  //? =============================  START useSelector  =============================
  const finishedCarts = useSelector((state) =>
    selectUserById(state, userId)
  )?.finishedCarts;
  //? =============================  / END useSelector  =============================
  return (
    <>
      <section className="hidden xs:block ms-7 me-2 xs:mx-10 bg-green-200/20 rounded-2xl">
        <table className="shadow-2xl rounded-2xl text-center w-full">
          <thead className="text-white bg-green-500">
            <tr>
              <th className={lang == "en" ? "rounded-tl-xl" : "rounded-tr-xl"}>
                {" "}
                {ordersText.Order[lang]}{" "}
              </th>
              <th> {ordersText.Date[lang]} </th>
              <th> {ordersText.Status[lang]} </th>
              <th> {ordersText.Total[lang]} </th>
              <th className={lang == "en" ? "rounded-tr-xl" : "rounded-tl-xl"}>
                {" "}
                {ordersText.Transactions[lang]}{" "}
              </th>
            </tr>
          </thead>

          <tbody className="rounded-xl">
            {finishedCarts?.length > 0 ? (
              finishedCarts &&
              finishedCarts.map((finishedCart, index) => (
                <tr key={index}>
                  <td className="rounded-br-xl"> {finishedCart.orderCode} </td>
                  <td>
                    {" "}
                    <DateShow date={finishedCart?.date} lang={lang} />{" "}
                  </td>
                  <td>
                    {(finishedCart?.status == "waiting" &&
                      ordersText.OrderStatusText[lang].waiting) ||
                      (finishedCart?.status == "inProgress" &&
                        ordersText.OrderStatusText[lang].inProgress) ||
                      (finishedCart?.status == "completed" &&
                        ordersText.OrderStatusText[lang].completed) ||
                      (finishedCart?.status == "canceled" &&
                        ordersText.OrderStatusText[lang].canceled)}
                  </td>
                  <td>
                    {" "}
                    {Number(finishedCart.totalCartPrice).toLocaleString()}{" "}
                    {finishedCart.currency}{" "}
                  </td>
                  <td className="rounded-bl-xl">
                    <Link
                      className="rounded-b-xl flex justify-center"
                      href={`/${lang}/profile/orders/${finishedCart.orderCode}`}
                    >
                      <FaEye className=" text-xl text-green-500 hover:text-green-300" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colspan="5"
                  className="text-red-500 font-semibold py-5 rounded-b-xl"
                >
                  {" "}
                  {ordersText.noInformation[lang]}{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="ms-7 me-2 xs:hidden">
        {finishedCarts?.length > 0 ? (
          finishedCarts &&
          finishedCarts.map((finishedCart, index) => (
            <article
              key={index}
              className="bg-green-50/50 p-5 mb-2
                            shadow-2xl rounded-2xl border-1 border-green-100"
            >
              <header className="flex justify-between items-center mb-4 pb-4 border-b-2 border-green-900">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  {ordersText.OrderNo[lang]} {finishedCart.orderCode}{" "}
                </h3>
                <div className="flex items-center gap-1">
                  <Link
                    className="rounded-b-xl flex justify-center"
                    href={`/${lang}/admin/orders/${finishedCart.orderCode}`}
                  >
                    <FaEye className=" text-xl text-green-500 hover:text-green-300" />
                  </Link>
                </div>
              </header>

              <article className="mb-4 pb-4 border-b-1 mx-2 border-green-700">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  {ordersText.OrderDate[lang]}{" "}
                </h3>
                <p className="indent-5 text-justify text-green-700 drop-shadow-lg text-sm">
                  <DateShow date={finishedCart?.date} lang={lang} />
                </p>
              </article>
              <article className="mb-4 pb-4 border-b-1 mx-2 border-green-700">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  {ordersText.OrderStatus[lang]}{" "}
                </h3>
                <p className="indent-5 text-justify text-green-700 drop-shadow-lg text-sm">
                  تحویل داده شد
                </p>
              </article>
              <article className="mb-4 pb-4 border-b-1 mx-2 border-green-700">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  {ordersText.TotalPrice[lang]}{" "}
                </h3>
                <p className="indent-5 text-justify text-green-700 drop-shadow-lg text-sm">
                  {finishedCart.totalCartPrice} {finishedCart.currency}
                </p>
              </article>
            </article>
          ))
        ) : (
          <tr>
            <td
              colspan="5"
              className="text-red-500 font-semibold py-5 rounded-b-xl"
            >
              {" "}
              {ordersText.noInformation[lang]}{" "}
            </td>
          </tr>
        )}
      </section>
    </>
  );
};

export default Orders;
