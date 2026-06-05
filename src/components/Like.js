"use client";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWishlist } from "@/app/redux store/slice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
export default function Likepage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const hasCookie = document.cookie.includes("isLoggedIn=true");
    if (!hasCookie) {
      window.location.replace("/login");
    }
  }, []);
  const WishItems = useSelector((state) => state.AuthManager.LikeItems) || [];
  const currentUser = useSelector((state) => state.AuthManager.currentUser);
  const isLoading = useSelector((state) => state.AuthManager.isLoading);
  const Dispatch = useDispatch();

  function addtoCart(shoe) {
    if (!currentUser) return;
    Dispatch(addToCart({ item: shoe }));
    toast.success(`${shoe.name} added to cart`, {
      duration: 2000,
      style: { backgroundColor: "green", color: "white", borderRadius: "20px" },
    });
  }

  function RemoveWish(shoe) {
    if (!currentUser) return;
    Dispatch(removeFromWishlist({ userId: currentUser._id, itemId: shoe.id }));
  }
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      
      <div
        className="row g-4 justify-content-center"
        style={{ marginTop: "100px" }}
      >
        {WishItems.length === 0 ? (
          <h3 className="text-center mt-5">Your Wishlist is empty</h3>
        ) : 
        
        (
          <>
           <h1 className="text-center">Liked Products ❤️</h1>
         { WishItems.map((shoe) => (
            <div
              key={shoe.id}
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
            >
              
              <div className="premium-shoe-card">
                <div className="image-holder">
                  <img src={shoe.img} alt={shoe.name} className="img-fluid" />
                </div>
                <div className="card-details">
                  <h3 className="shoe-title">{shoe.name}</h3>
                  <p className="shoe-price">{shoe.price}</p>
                  <div className="btn-stack">
                    <button
                      className="btn-add-cart"
                      onClick={() => addtoCart(shoe)}
                    >
                      ADD TO CART
                    </button>
                    <button
                      className="btn-add-wish"
                      onClick={() => RemoveWish(shoe)}
                    >
                      Remove from WISHLIST
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </>
        )}
      </div>
    </div>
  );
}
