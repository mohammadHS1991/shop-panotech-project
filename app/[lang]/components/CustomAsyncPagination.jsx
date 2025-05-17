"use client";
//* -----------------------imports
import React from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/react";
import { Libre_Franklin } from "next/font/google";
//* -----------------------/imports
const libre = Libre_Franklin({ subsets: ["latin"] });

const CustomAsyncPagination = ({
  counts,
  type,
  keyword = "null",
  category = "null",
  lang = "fa",
  itemsPerPage = 6,
}) => {
  const pages = Math.ceil(counts / itemsPerPage);
  const router = useRouter();

  const createPath = (page) => {
    let path = `/${lang}/${type}`;
    if (category === "null" && keyword === "null") {
      path = `/${lang}/${type}${page > 1 ? "?page=" : ""}${
        page > 1 ? page : ""
      }`;
    }
    if (category !== "null" && keyword === "null") {
      path = `/${lang}/${type}?category=${category}${
        +page > 1 ? "&page=" : ""
      }${+page > 1 ? page : ""}`;
    }
    if (category === "null" && keyword !== "null") {
      path = `/${lang}/${type}?keyword=${keyword}${+page > 1 ? "&page=" : ""}${
        +page > 1 ? page : ""
      }`;
    }
    if (category !== "null" && keyword !== "null") {
      path = `/${lang}/${type}?keyword=${keyword}&category=${category}${
        +page > 1 ? "&page=" : ""
      }${+page > 1 ? page : ""}`;
    }
    return path;
  };
  //* -----------------------return
  return (
    <>
      {pages > 1 && (
        <div className="flex items-center justify-center py-5">
          <Pagination
            variant="bordered"
            showShadow
            color="success"
            total={pages}
            onChange={(page) => {
              router.push(
                createPath(page)
                // `/${lang}/${type}?keyword=${keyword}&page=${page}&category=${category}`
              );
            }}
            classNames={{
              item: `text-success font-bold ${
                lang === "en" && libre.className
              }`,
            }}
          />
        </div>
      )}
    </>
  );
  //* -----------------------/return
};

export default CustomAsyncPagination;
