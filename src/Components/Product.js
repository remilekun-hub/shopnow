import React from "react";
import Image from "next/image";

const Product = ({ prod: { title, image } }) => {
  return (
    <div>
      <div className="bg-[#f3f3f3]">
        <Image src={image} placeholder="blur" blurDataURL={image} alt={title} />
      </div>
    </div>
  );
};

export default Product;
