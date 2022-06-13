import React from "react";
import Image from "next/image";
import { useMycontext } from "../src/Context/context";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const Cart = () => {
  const { Cart, Total } = useMycontext();
  return (
    <section>
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
      <h1>This is my cart page</h1>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="flex flex-col col-span-3 p-4">
          {Cart.map((item) => (
            <div key={item.id} className="mb-2 flex">
              <Image
                src={item.image}
                placeholder="blur"
                blurDataURL={item.image}
                objectFit="contain"
                width={100}
                height={100}
              />
              <div className="flex flex-col ml-3">
                <div> {item.title}</div>
                <p className="font-bold">${item.price}</p>
                <p className="text-green-600">in Stock</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 p-4">
          <p>
            Subtotal ({Cart.lrngth} item):{" "}
            <span className="font-bold"> ${Total}</span>
          </p>
          <button className="bg-green-600 text-center px-4 py-1  text-white">
            Proceed to CheckOut
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
