import React from "react";
import Head from "next/head";

const Product = ({ data }) => {
  const { title } = data;
  console.log({ data });
  return (
    <div>
      <Head>
        <title>{title}</title>
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
      <main className="main flex flex-col">
        <div>1</div>
        <div>2</div>
      </main>
      {data.description}
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
