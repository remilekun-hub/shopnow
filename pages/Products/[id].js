import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useMycontext } from "../../src/Context/context";
import Image from "next/image";

const Product = ({ data }) => {
  const { title } = data;
  const { Cart, dispatchCart, dispatchTotal } = useMycontext();
  console.log({ data });
  return (
    <div>
      <Head>
        <title>{`ShopNow: ${title}`}</title>
      </Head>
      <header className="py-5 px-4 sticky top-0 bg-[#232F3E] z-20">
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto">
          <Link href="/">
            <a className="text-white font-bold">ShopNow</a>
          </Link>

          <Link href="/cart" passHref>
            <div className="relative cursor-pointer">
              <ShoppingCartIcon className="w-9 h-9 text-white" />
              {Cart.length > 0 && (
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full flex justify-center items-center bg-green-600 text-white font-bold text-xs">
                  {Cart.length}
                </span>
              )}
            </div>
          </Link>
        </nav>
      </header>
      <section className="px-4 pb-4">
        <div className="max-w-[1200px] mx-auto">
          <p className="py-3">cateogry: {data.category}</p>
          <main className="main flex flex-col gap-x-8 items-center md:flex-row md:justify-center max-w-[700px] mx-auto">
            <div className="">
              <Image
                src={data.image}
                placeholder="blur"
                blurDataURL={data.image}
                objectFit="contain"
                height={500}
                width={300}
              />
            </div>
            <div className="max-w-[400px]">
              <h2 className="font-bold mb-5 md:text-[23px]">{data.title}</h2>
              <p className="mb-4">{data.description}</p>

              <p className="font-bold mb-5 text-[22px]">${data.price}</p>
              <button
                onClick={() => {
                  const checkindex = Cart.findIndex((c) => c.id == data.id);
                  if (checkindex >= 0) {
                    alert("item already exists in cart");
                    return;
                  }
                  dispatchCart({ type: "ADD_TO_CART_FROM_DYNAMIC", data });
                  dispatchTotal({ type: "ADD_TO_CART_FROM_DYNAMIC", data });
                }}
                className="px-4 py-2 font-bold hover:bg-yellow-400 focus:bg-yellow-300 bg-yellow-500 rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const item = await res.json();

  return {
    props: {
      data: item,
    },
  };
};
