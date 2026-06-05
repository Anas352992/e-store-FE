"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";
import Cartside from "@/components/cartsidebar";
import StoreProvider from "./redux store/Provider";
import { Toaster } from "react-hot-toast";
import SessionProvider from "./redux store/RefreshProvider";
export default function RootLayout({ children }) {
  const Pathname = usePathname();
  const onLoginPage = Pathname === "/login";

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
            {!onLoginPage && <Cartside />}
            <Toaster position="top-center" reversOrder="false" />
            {children}
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
