"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import EditStatusModal from "./EditStatusModal";
import { selectAllOrders } from "@/app/[lang]/reducers/orderSlice";
import UserInfoModal from "./UserInfoModal";
import DateShow from "../../DateShow";

const ManagOrders = ({ lang }) => {
  //? =============================  START useSelector  =============================
  const endCartItems = useSelector(selectAllOrders);
  //? =============================  / END useSelector  =============================
  return (
    <>
      <section className="hidden xs:block ms-7 me-2 xs:mx-10 bg-green-200/20 rounded-2xl">
        <table className="shadow-2xl rounded-2xl text-center w-full">
          <thead className="text-white bg-green-500">
            <tr>
              <th className={lang == "en" ? "rounded-tl-xl" : "rounded-tr-xl"}>
                {" "}
                سفارش{" "}
              </th>
              <th> تاریخ </th>
              <th> وضعیت </th>
              <th> مجموع </th>
              <th className={lang == "en" ? "rounded-tr-xl" : "rounded-tl-xl"}>
                {" "}
                عملیات{" "}
              </th>
            </tr>
          </thead>

          <tbody className="rounded-xl">
            {endCartItems.length > 0 ? (
              endCartItems &&
              endCartItems.map((endCartItem, index) => (
                <tr key={index}>
                  <td className="rounded-br-xl"> {endCartItem?.orderCode} </td>
                  <td>
                    {" "}
                    <DateShow date={endCartItem?.createdAt} lang={lang} />{" "}
                  </td>
                  <td>
                    {(endCartItem?.status == "waiting" &&
                      " در انتظار تایید ") ||
                      (endCartItem?.status == "inProgress" &&
                        " در حال آماده سازی ") ||
                      (endCartItem?.status == "completed" && " ارسال شده ") ||
                      (endCartItem?.status == "canceled" && " رد شده ")}
                  </td>
                  <td>
                    {" "}
                    {Number(endCartItem?.totalCartPrice).toLocaleString()}{" "}
                    {endCartItem?.currency}{" "}
                  </td>
                  <td className="rounded-bl-xl">
                    <div className="flex justify-center">
                      <div className="flex justify-center items-center text-xl text-blue-500 : hover:text-blue-300">
                        <Link
                          href={`/${lang}/admin/manag-orders/${endCartItem._id}`}
                        >
                          <FaEye />
                        </Link>
                      </div>
                      <EditStatusModal orderId={endCartItem._id} />
                      <UserInfoModal user={endCartItem.user} />
                    </div>
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
                  اطلاعاتی برای نمایش وجود ندارد!{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="ms-7 me-2 xs:hidden">
        {endCartItems.length > 0 ? (
          endCartItems &&
          endCartItems.map((endCartItem, index) => (
            <article
              key={index}
              className="bg-green-50/50 p-5 mb-2
                            shadow-2xl rounded-2xl border-1 border-green-100"
            >
              <header className="flex justify-between items-center mb-4 pb-4 border-b-2 border-green-900">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  سفارش شماره {endCartItem?.orderCode}{" "}
                </h3>
                <div className="flex justify-center">
                  <div className="flex justify-center items-center text-xl text-blue-500 : hover:text-blue-300">
                    <Link
                      href={`/${lang}/admin/managOrders/${endCartItem._id}`}
                    >
                      <FaEye />
                    </Link>
                  </div>
                  <EditStatusModal orderId={endCartItem._id} />
                  <UserInfoModal user={endCartItem.user} />
                </div>
              </header>

              <article className="mb-4 pb-4 border-b-1 mx-2 border-green-700">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  تاریخ سفارش :{" "}
                </h3>
                <p className="indent-5 text-justify text-green-700 drop-shadow-lg text-sm">
                  <DateShow date={endCartItem?.createdAt} lang={lang} />
                </p>
              </article>
              <article className="mb-4 pb-4 border-b-1 mx-2 border-green-700">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  وضعیت سفارش :{" "}
                </h3>
                <p className="indent-5 text-justify text-green-700 drop-shadow-lg text-sm">
                  {(endCartItem?.status == "waiting" && " در انتظار تایید ") ||
                    (endCartItem?.status == "inProgress" &&
                      " در حال آماده سازی ") ||
                    (endCartItem?.status == "completed" && " ارسال شد ") ||
                    (endCartItem?.status == "canceled" && " رد شد ")}
                </p>
              </article>
              <article className="mb-4 pb-4 border-b-1 mx-2 border-green-700">
                <h3 className="font-bold text-green-800 text-sm drop-shadow-lg">
                  {" "}
                  مجموع قیمت :{" "}
                </h3>
                <p className="indent-5 text-justify text-green-700 drop-shadow-lg text-sm">
                  {Number(endCartItem?.totalCartPrice).toLocaleString()}{" "}
                  {endCartItem?.currency}
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
              اطلاعاتی برای نمایش وجود ندارد!{" "}
            </td>
          </tr>
        )}
      </section>
    </>
  );
};

export default ManagOrders;
