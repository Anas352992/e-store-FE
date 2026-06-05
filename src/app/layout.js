"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";
import Cartside from "@/components/cartsidebar";
import Footer from "@/components/Footer";
import StoreProvider from "./redux store/Provider";
import { Toaster } from "react-hot-toast";
import SessionProvider from "./redux store/RefreshProvider";
export default function RootLayout({ children }) {
  const Pathname = usePathname();
  const onLoginPage = Pathname === "/login";
  const onCheckOut = Pathname === "/checkout";
  const onPlaceOrder = Pathname === "/orderPlaced";
const onWishlist = Pathname === "/Wishlist"
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <SessionProvider>
            {!onLoginPage && <Navbar />}
            {!onLoginPage && !onCheckOut && !onPlaceOrder && <Cartside />}

            <Toaster position="top-center" reversOrder="false" />
            {children}
            {!onLoginPage && !onWishlist && <Footer/>}
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
