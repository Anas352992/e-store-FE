"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeFromCart } from "@/app/redux store/slice";

function Cartside() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const CartItems = useSelector((state) => state.AuthManager.cartItems);
  const currentUser = useSelector((state) => state.AuthManager.currentUser);
  const isLoading = useSelector((state) => state.AuthManager.isLoading);
  const Dispatch = useDispatch();
  const router = useRouter();

  function DeleteItem(items) {
    if (!currentUser) return;
    Dispatch(removeFromCart({ itemId: items.id }));
  }

  function handleCheckout() {
    document.cookie = "canCheckout=true; path=/";
    setIsCartOpen(false);
    router.replace("/checkout");
  }

  return (
    <div>
      <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
        <img src="/cart icon.png" alt="Cart" style={{ width: "26px" }} />
      </button>

      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header d-flex justify-content-between align-items-center">
          <h4 className="fw-bold m-0">My Cart</h4>
          <button
            className="btn-close-cart"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : CartItems.length === 0 ? (
          <p className="text-center mt-5">Your cart is empty</p>
        ) : (
          <>
            {CartItems.map((items) => (
              <div
                key={items.id}
                className="cart-body d-flex gap-2 justify-content-around mt-5"
              >
                <button className="btn" onClick={() => DeleteItem(items)}>
                  <img src="/delete.png" alt="delete" />
                </button>
                <img
                  src={items.img}
                  style={{ width: "95px", height: "95px" }}
                  alt={items.name}
                />
                <div>
                  <p className="mb-1">{items.name}</p>
                  <p className="mb-1">{items.price}</p>
                  <p>qty: x{items.quantity}</p>
                </div>
              </div>
            ))}

            <div className="px-3 mt-4 mb-3">
              <button
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "30px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>

      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Cartside;
