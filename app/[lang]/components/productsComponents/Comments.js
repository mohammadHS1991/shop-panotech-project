import React from "react";
import AddCommentModal from "./AddCommentModal";
import { FaUser } from "react-icons/fa";
import Comment from "./Comment";
import { productText } from "../../data/data";

const Comments = ({ comments, productId, lang }) => {
  return (
    <section
      className="
            shadow-xl rounded-2xl border-1 border-gray-100 bg-gray-50
            p-2 xs:p-5 my-10 mx-2 xs:mx-5 md:mx-10 xl:mx-40"
    >
      <header
        className="
                flex justify-between
                font-bold text-lg text-white
                bg-green-500 rounded-2xl"
      >
        <div
          className="
                    flex justify-between items-center
                    my-auto ms-10 gap-2"
        >
          <p className="">{productText.text1[lang]}</p>
          <p className="flex mr-2 text-sm items-center">
            ( <FaUser className="mx-1 text-xs" /> {comments.length}{" "}
            {productText.comment[lang]} )
          </p>
        </div>

        <AddCommentModal productId={productId} lang={lang} />
      </header>

      {comments.length ? (
        comments &&
        comments.map(
          (comment, index) =>
            comment.status && (
              <Comment
                key={index}
                author={comment.author}
                comment={comment.comment}
                status={comment.status}
              />
            )
        )
      ) : (
        <div className="text-center">
          <p
            className="
                        bg-gray-100 text-green-500
                        shadow-xl rounded-2xl border-1 border-gray-100
                        my-10 mx-auto py-8 px-4 w-3/4 md:w-2/4 xl:w-1/4"
          >
            {productText.text2[lang]}
          </p>
        </div>
      )}
    </section>
  );
};

export default Comments;
