import React from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";

function ProductItem({ product }) {
  return (
    <>
      <Link
      href={`/product-details/${product?.id}`}
      >
      <div
        className="group cursor-pointer rounded-lg border-teal-400 
      hover:border p-1 hover:shadow-md transition duration-1000"
      >
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner-cart"
          width={400}
          height={350}
          className="rounded-t-lg h-[170px] object-cover"
        />
        <div
          className="p-3 flex items-center justify-between bg-gray-50 rounded-b-lg 
      group-hover:bg-gray-100 duration-1000"
        >
          <div>
            <h2 className="text-[12px] font-medium line-clamp-1">
              {product?.attributes?.title}
            </h2>
            <h2 className="text-[10px] text-gray-400 font-medium flex gap-1 items-center">
              <List className="w-4 h-4" />
              {product?.attributes?.category}
            </h2>
          </div>
          <h2 className="text-teal-700">{product?.attributes?.price}$</h2>
        </div>
        </div>
      </Link>
    </>
  );
}

export default ProductItem;
