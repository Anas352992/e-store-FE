"use client";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, addToWishlist } from "@/app/redux store/slice";
import { useEffect } from "react";
export default function Products() {
  useEffect(() => {
  const hasCookie = document.cookie.includes("isLoggedIn=true");
  if (!hasCookie) {
    window.location.replace("/login");
  }
}, []);
  const shoeData = [
    {
      id: 1,
      name: "Elite Shoes",
      price: "$240",
      img: "/shoe 1.avif",
      quantity: 1,
    },
    {
      id: 7,
      name: "Lace Up Athletic",
      price: "$105",
      img: "/shoe 7.avif",
      quantity: 1,
    },
    {
      id: 8,
      name: "Leather Sandles",
      price: "$150",
      img: "/shoe 8.avif",
      quantity: 1,
    },
    {
      id: 4,
      name: "Nova Glide",
      price: "$210",
      img: "/shoe 4.avif",
      quantity: 1,
    },
    {
      id: 9,
      name: "Hand-stiched Rover",
      price: "$115",
      img: "/shoe 9.avif",
      quantity: 1,
    },
    {
      id: 6,
      name: "Aura Walkers",
      price: "$130",
      img: "/shoe 6.avif",
      quantity: 1,
    },
    {
      id: 10,
      name: "Primal Sneakers",
      price: "$210",
      img: "/shoe 10.avif",
      quantity: 1,
    },
    {
      id: 2,
      name: "Classic Veteran",
      price: "$190",
      img: "/shoe 2.avif",
      quantity: 1,
    },
    {
      id: 3,
      name: "Handmade",
      price: "$165",
      img: "/shoe 3.avif",
      quantity: 1,
    },
    {
      id: 11,
      name: "Leather Loafers",
      price: "$270",
      img: "/shoe 11.avif",
      quantity: 1,
    },
    {
      id: 5,
      name: "Sneakers Ignite",
      price: "$185",
      img: "/shoe 5.avif",
      quantity: 1,
    },
    {
      id: 12,
      name: "Business Loafers",
      price: "$240",
      img: "/shoe 12.avif",
      quantity: 1,
    },
  ];

  const Dispatch = useDispatch();
  const currentUser = useSelector((state) => state.AuthManager.currentUser);

  function addtoCart(shoe) {
    Dispatch(addToCart({ item: shoe }));
    toast.success(`${shoe.name} added to cart`, {
      duration: 2000,
      style: { backgroundColor: "green", color: "black", borderRadius: "20px" },
    });
  }

  function addtoWish(shoe) {
    Dispatch(addToWishlist({ item: shoe }));
    toast.success(`${shoe.name} added to Wishlist`, {
      duration: 2000,
      style: { backgroundColor: "green", color: "black", borderRadius: "20px" },
    });
  }

  return (
    <div className="container my-5">
      <div
        className="row g-4 justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <h1 className="text-center">All Products</h1>
        {shoeData.map((shoe) => (
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
                    onClick={() => addtoWish(shoe)}
                  >
                    ADD TO WISHLIST
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
