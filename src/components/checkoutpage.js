"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removeFromCart, placeOrder } from "@/app/redux store/slice";
import toast from "react-hot-toast";
const locationData = {
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Sialkot",
  ],
  Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
  KPK: ["Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat"],
  Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Chaman"],
};

const provinces = Object.keys(locationData);

function CheckoutPage() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  const CartItems = useSelector((state) => state.AuthManager.cartItems);
  const currentUser = useSelector((state) => state.AuthManager.currentUser);
  const Dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const hasCookie = document.cookie.includes("canCheckout=true");
    if (!hasCookie) {
      window.location.replace("/");
    }
  }, []);
  const checkoutLoading = useSelector(
    (state) => state.AuthManager.checkoutLoading,
  );
  const isLoading = useSelector((state) => state.AuthManager.isLoading);
  useEffect(() => {
    if (!checkoutLoading && CartItems.length === 0) {
      router.replace("/");
      toast.error("No Items in Cart", {
        duration: 4000,
        style: {
          backgroundColor: "red",
          color: "yellow",
          borderRadius: "20px",
        },
      });
      document.cookie = "canCheckout=; path=/, max-age=0";
    }
  }, [CartItems, checkoutLoading]);
  function handleProvinceChange(e) {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
  }

  function handleDeleteItem(item) {
    if (!currentUser) return;
    Dispatch(removeFromCart({ itemId: item.id }));
  }

  async function handlePlaceOrder() {
    if (!selectedProvince || !selectedCity || !address.trim()) return;
    setIsPlacing(true);

    const result = await Dispatch(
      placeOrder({
        items: CartItems,
        province: selectedProvince,
        city: selectedCity,
        address: address.trim(),
      }),
    );

    if (placeOrder.fulfilled.match(result)) {
      router.push("/orderPlaced");
    } else {
      setIsPlacing(false);
      alert("Something went wrong. Please try again.");
    }
  }

  const totalPrice = CartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const isFormValid =
    selectedProvince && selectedCity && address.trim() && !isPlacing;
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
    <div className="checkout-wrapper">
      <div className="container">
        <h2 className="checkout-title mb-2">CHECKOUT</h2>
        <p className="checkout-subtitle mb-5">
          Review your order and fill in delivery details
        </p>

        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <h5 className="section-title mb-3">
              YOUR ITEMS ({CartItems.length})
            </h5>

            <div className="d-flex flex-column gap-3">
              {CartItems.map((item) => (
                <div
                  key={item.id}
                  className="checkout-item-card d-flex align-items-center gap-3"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="checkout-item-img"
                  />
                  <div className="flex-grow-1">
                    <p className="checkout-item-name mb-1">{item.name}</p>
                    <p className="checkout-item-price mb-1">{item.price}</p>
                    <p className="checkout-item-qty mb-0">
                      qty: x{item.quantity}
                    </p>
                  </div>
                  <button
                    className="checkout-delete-btn"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <img src="/delete.png" alt="delete" />
                  </button>
                </div>
              ))}
            </div>

            <div className="checkout-total-card d-flex justify-content-between align-items-center mt-4">
              <span className="fw-bold fs-6">TOTAL</span>
              <span className="checkout-total-price">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <h5 className="section-title mb-3">DELIVERY DETAILS</h5>

            <div className="checkout-delivery-card d-flex flex-column gap-4">
              <div>
                <label className="checkout-field-label d-block mb-2">
                  PROVINCE
                </label>
                <select
                  className="checkout-select"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="checkout-field-label d-block mb-2">
                  CITY
                </label>
                <select
                  className="checkout-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedProvince}
                >
                  <option value="">
                    {!selectedProvince
                      ? "Select Province First"
                      : "Select City"}
                  </option>
                  {selectedProvince &&
                    locationData[selectedProvince].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="checkout-field-label d-block mb-2">
                  ADDRESS
                </label>
                <textarea
                  className="checkout-textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address..."
                  rows={3}
                />
              </div>

              <button
                className="checkout-place-btn"
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
              >
                {isPlacing ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
