"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart"

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    setIsLoggedIn(window?.location?.href.toString().includes("sign-in"));
  }, []);
  const { user } = useUser();
useEffect(() => {
		user && getCartItems();
	}, [user])
	const getCartItems = () => {
		CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then((res) => {
			console.log('response from cart items', res?.data?.data)
			res?.data?.data.forEach((citem) => {
				setCart((oldCart) => [
					...oldCart,
					{
						id: citem.id,
						product: citem?.attributes?.products?.data[0]
					}
				])
			})

		})
	}
  return (
    !isLoggedIn && (
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <Link href={"/"}>
            <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/explore"
                  >
                    {" "}
                    Explore{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/Projects"
                  >
                    {" "}
                    Projects{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/aboutus"
                  >
                    {" "}
                    About us{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/contactus"
                  >
                    {" "}
                    Contact us{" "}
                  </Link>
                </li>
              </ul>
            </nav>
            {!user ? (
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block cursor-pointer rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
                    href="/sign-in"
                  >
                    Login
                  </a>

                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-500 sm:block"
                    href="/sign-up"
                  >
                    Register
                  </a>
                </div>

                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <h2
                  className="flex gap-1 cursor-pointer"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <ShoppingCart />({cart?.length})
                </h2>
                <UserButton
                // afterSignOutUrl="/sign-in"
                />
                {openCart && (
                  <Cart setOpenCart={setOpenCart} />
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
