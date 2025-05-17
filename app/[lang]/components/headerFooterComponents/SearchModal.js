"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { selectAllProducts } from "../../reducers/productSlice";
import { searchModalText } from "../../data/data";

// const SearchModal = ({ searchParams }) => {
const SearchModal = ({ lang }) => {
  const url = usePathname();
  const router = useRouter();

  const [inputSearch, setInputSearch] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //? ========================  START useSelector  ========================
  const products = useSelector(selectAllProducts);
  //? ========================  / END useSelector  ========================

  return (
    <>
      <Tooltip
        color="success"
        placement="top"
        content={searchModalText.title[lang]}
        className="text-white"
      >
        <Button
          onPress={onOpen}
          radius="none"
          isIconOnly
          className="
          bg-white
          text-gray-500 hover:text-gray-900 text-xl
          me-3 pe-1 border-e-2"
        >
          <FaSearch />
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        size="5xl"
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-transparent">
          <ModalBody>
            <section>
              <input
                type="search"
                placeholder={searchModalText.title[lang]}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                  if (e.target.value.length === 0) {
                    router.replace(`${url}`);
                  } else {
                    router.push(`${url}?search=${e.target.value}&page=1`);
                  }
                }}
                className="bg-gray-200/85 sm:bg-gray-200/50 text-green-800 placeholder:text-green-800/50 rounded-3xl w-full h-14 p-4 mb-1"
              />
              <article
                className={`${
                  !inputSearch && "hidden"
                } bg-gray-200/85 sm:bg-gray-200/50 rounded-3xl w-full py-5 px-10`}
              >
                {products &&
                  products.map(
                    (product, index) =>
                      product?.name[lang].match(inputSearch) && (
                        // product.name[lang].match(searchParams.search) &&

                        <Link
                          key={index}
                          // href={`/${lang}/products/${product._id}`}
                          href={`/${lang}/products/${product.slug[lang]}`}
                        >
                          <p className="p-1 text-green-800">
                            {" "}
                            {product.name[lang]}{" "}
                          </p>
                        </Link>
                      )
                  )}
              </article>
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;

// product.name[lang]
// product.slug[lang]
// product.fullDescription[lang]
// product.useCases[lang]
// product.price[lang].amount
// product.price[lang].unit
// product.price[lang].discount
// product.keywords[lang]
// product.qty
// product.images
// product.guideImages
// product.guideVideos
// product.files
// product.comments.map(comment) [array]
// comment._id
// comment.author {obj}
// comment.comment
// comment.status
// comment.date
