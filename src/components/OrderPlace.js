"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function OrderPlacedPage() {
  const router = useRouter();

  useEffect(() => {
    const hasCookie = document.cookie.includes("canCheckout=true");
    if (!hasCookie) {
      window.location.replace("/");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.cookie = "canCheckout=; path=/; max-age=0";
      router.replace("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="order-placed-wrapper d-flex flex-column align-items-center justify-content-center text-center px-3">
      <div className="order-placed-circle d-flex align-items-center justify-content-center mb-4">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path
            d="M10 25 L21 36 L40 14"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="order-placed-title mb-3">ORDER PLACED!</h2>
      <p className="order-placed-msg mb-2">
        Your order has been placed successfully. We'll get it to you soon!
      </p>
      <p className="order-placed-redirect">
        Redirecting you to home in 10 seconds...
      </p>
    </div>
  );
}

export default OrderPlacedPage;
