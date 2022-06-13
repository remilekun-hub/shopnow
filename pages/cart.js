import React from "react";
import Image from "next/image";
import { useMycontext } from "../src/Context/context";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";

const Cart = () => {
  const { Cart, Total, dispatchCart, dispatchTotal } = useMycontext();
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
      <section className="px-4 max-w-[1200px] mx-auto">
        {Cart.length > 0 ? (
          <h1 className="text-[21px] ">Cart summary</h1>
        ) : (
          <h1 className="text-[21px] ">No item in Cart</h1>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8 mt-4">
          <div className="flex flex-col col-span-3 mb-8">
            {Cart.map((item) => (
              <div key={item.id} className="mb-8 flex">
                <Image
                  src={item.image}
                  placeholder="blur"
                  blurDataURL={item.image}
                  objectFit="contain"
                  width={200}
                  height={100}
                />
                <div className="flex flex-col ml-3">
                  <div className="mb-2 text-[13px]"> {item.title}</div>
                  <div className="mb-2 hidden md:inline">{`${item.description.slice(
                    0,
                    100
                  )}...`}</div>
                  <p className="font-bold mb-2">${item.price}</p>
                  <p className="text-green-600 mb-4">in Stock</p>
                  <div
                    onClick={() => {
                      dispatchCart({
                        type: "REMOVE_FROM_CARTPAGE",
                        prod: item.id,
                      });
                      dispatchTotal({
                        type: "REMOVE_FROM_CARTPAGE",
                        prod: item.price,
                      });
                    }}
                    className="cursor-pointer mr-2"
                  >
                    <TrashIcon className="text-red-700 w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 pb-7">
            <p className="mb-4">
              Subtotal ({Cart.length} {Cart.length > 1 ? "items" : "item"}):{" "}
              <span className="font-bold mb"> ${Total.toFixed(2)}</span>
            </p>
            <button
              className="bg-green-600 text-center px-2 py-1  text-white disabled:bg-green-300"
              disabled={Cart.length === 0}
            >
              Proceed to CheckOut
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Cart;
