import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMycontext } from "../src/Context/context";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/outline";

export default function Home({ data }) {
  const { Cart, dispatchCart, Total, dispatchTotal } = useMycontext();

  return (
    <div>
      <Head>
        <title>ShopNow</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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

      <main className="grid grid-cols-2 gap-x-4 px-3 md:grid-cols-3 lg:grid-cols-4 max-w-[1000px] mx-auto">
        {data.map((prod) => (
          <Link href={`/Products/${prod.id}`} key={prod.id} passHref>
            <div className="mb-4 flex flex-col p-1 cursor-pointer">
              <Image
                src={prod.image}
                placeholder="blur"
                blurDataURL={prod.image}
                alt={prod.title}
                width={180}
                height={120}
                objectFit="contain"
              />

              <h1 className="mb-2 text-sm">{prod.title}</h1>

              <h4 className="text-left mb-2">${prod.price}</h4>
              {Cart.some((c) => c.id == prod.id) ? (
                <button
                  className="bg-red-700 text-white flex space-x-4 justify-center items-center p-2 text-sm text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatchCart({ type: "REMOVE_FROM_CART", prod });
                    dispatchTotal({ type: "REMOVE_FROM_CART", prod });
                  }}
                >
                  <TrashIcon className="w-5 h-5" />
                  <p>Remove</p>
                </button>
              ) : (
                <button
                  className="bg-green-700 text-white flex space-x-4 justify-center items-center p-2 text-center text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatchCart({ type: "ADD_TO_CART", prod });
                    dispatchTotal({ type: "ADD_TO_CART", prod });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>{" "}
                  <p>Add to cart</p>
                </button>
              )}
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
