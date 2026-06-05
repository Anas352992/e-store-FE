"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logout } from "@/app/redux store/slice";

export default function AccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const user = useSelector((state) => state.AuthManager?.currentUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(Logout());
    document.cookie = "isLoggedIn=; path=/; max-age=0";
    document.cookie = "canCheckout=; path=/; max-age=0"
    router.replace("/login");
  };

  const initials = user?.userName
    ? user.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  if (!mounted) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user?.userEmail) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="account-card">
              <div className="avatar-wrapper">
                <div className="avatar-circle">
                  <span className="avatar-text">{initials}</span>
                </div>
              </div>
              <div className="user-info text-center">
                <h1 className="user-name">{user.userName}</h1>
                <p className="user-email">{user.userEmail}</p>
              </div>
              <hr className="divider" />
              <button className="btn-logout" onClick={handleLogout}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sign Out
              </button>
            </div>
            <div className="brand text-center mt-4">
              <span className="brand-text">NEO STEP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
