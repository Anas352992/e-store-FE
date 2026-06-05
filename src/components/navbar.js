"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { rehydrateAll } from "@/app/redux store/slice";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-md border-bottom py-3 navbar-fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="LOGO" className="logo-img" />
          </a>

          <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav nav-special-font">
              <Link className="nav-link nav-link-custom mx-3" href="/">
                Home
              </Link>

              <Link
                className="nav-link nav-link-custom mx-3"
                href="/All-Products"
              >
                All Products
              </Link>

              <Link className="nav-link nav-link-custom mx-3" href="/Wishlist">
                Wishlist
              </Link>

              <Link className="nav-link nav-link-custom mx-3" href="/Account">
                Account
              </Link>
            </div>
          </div>

          <button
            className="d-md-none border-0 bg-transparent"
            onClick={() => setMenuActive(true)}
          >
            <img
              src="/hamburger-menu1.png"
              alt="MENU"
              style={{ width: "30px" }}
            />
          </button>
        </div>
      </nav>

      <div
        className={menuActive ? "mobile-side-menu active" : "mobile-side-menu"}
      >
        <div className="text-end">
          <button className="close-btn" onClick={() => setMenuActive(false)}>
            &times;
          </button>
        </div>

        <div className="mt-4">
          <Link
            href="/"
            className="mobile-nav-link"
            onClick={() => setMenuActive(false)}
          >
            Home
          </Link>

          <Link
            href="/All-Products"
            className="mobile-nav-link"
            onClick={() => setMenuActive(false)}
          >
            All Products
          </Link>

          <Link
            href="/Wishlist"
            className="mobile-nav-link"
            onClick={() => setMenuActive(false)}
          >
            Wishlist
          </Link>

          <Link
            href="/Account"
            className="mobile-nav-link"
            onClick={() => setMenuActive(false)}
          >
            Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
