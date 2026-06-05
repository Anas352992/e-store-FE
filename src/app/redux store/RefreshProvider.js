"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemsonRefresh } from "./slice";
import { setisLoading } from "./slice";
export default function SessionProvider({ children }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.AuthManager.currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) {
      dispatch(ItemsonRefresh());
    } else {
      dispatch(setisLoading(false));
    }
  }, []);

  return children;
}
