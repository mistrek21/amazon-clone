import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

function checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length ? "Your Items" : "Your Amazon Basket is empty"}
            </h1>

            {items.map(
              (
                {
                  id,
                  title,
                  price,
                  description,
                  category,
                  image,
                  hasPrime,
                  rating,
                },
                i
              ) => (
                <CheckoutProduct
                  key={i}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  hasPrime={hasPrime}
                  rating={rating}
                />
              )
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length > 1 ? "items" : "item"})
                <span className="font-bold">
                  <Currency quantity={total} currency="EUR" />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
