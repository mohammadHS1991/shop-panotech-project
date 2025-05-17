import { Badge, Card, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const CommentCard = ({product, lang}) => {
    return (
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
            <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={product.name[lang]}
                className="w-full object-cover h-[240px]"
                src={`/${product.images[0].name}`}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-3 absolute before:rounded-xl rounded-large bottom-0 shadow-small z-10">
                <p className="text-tiny text-white/80">
                    {product?.name[lang]}
                </p>
                <Badge content={product?.comments.length} color="danger" placement="top-left">
                    <Link href={`/${lang}/admin/comments/${product._id}`}>
                        <button className="text-tiny text-white bg-black/20 p-2 rounded-xl ">
                         مشاهده نظرات </button>
                    </Link>
                </Badge>
            </CardFooter>
        </Card>
      );
};

export default CommentCard;

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