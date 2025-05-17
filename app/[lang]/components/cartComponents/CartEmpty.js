import { Image } from "@nextui-org/react";
import React from "react";

const CartEmpty = ({ lang }) => {
  return (
    <article className=" flex flex-col justify-center items-center min-h-[70vh]">
      <section
        className="
                flex flex-col justify-center items-center
                shadow-2xl rounded-lg
                lg:w-1/4 m-5 lg:m-20 "
      >
        <Image
          width={300}
          alt="NextUI hero Image"
          src="/images/empty/emptyCart.svg"
        />
        <p className="font-bold text-lg m-5 text-danger-400 text-center">
          {(lang == "fa" && "سبد خرید خالی است !") ||
            (lang == "en" && "The shopping cart is empty!") ||
            (lang == "ar" && "عربة التسوق فارغة!")}
        </p>
      </section>
    </article>
  );
};

export default CartEmpty;
