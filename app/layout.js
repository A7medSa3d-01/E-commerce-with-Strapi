'use client'
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import {ClerkProvider} from '@clerk/nextjs'
import { CartContext } from "./_context/CartContext";
import { useState } from "react";

const inter = Roboto({ subsets: ["latin"], weight: "700" });


export default function RootLayout({ children }) {
  const [cart, setCart] = useState([])
  return (
    <ClerkProvider>
      <CartContext.Provider value={{cart, setCart}}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
