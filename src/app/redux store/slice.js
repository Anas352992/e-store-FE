import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "https://e-store-be.vercel.app/api";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE}/auth/signup`, credentials);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE}/auth/login`, credentials);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const ItemsonRefresh = createAsyncThunk(
  "auth/verify",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No Token");
      const res = await axios.get(`${BASE}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ item }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No Token");
      const res = await axios.post(
        `${BASE}/cart/add`,
        { item },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ itemId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No Token");
      const res = await axios.delete(`${BASE}/cart/remove`, {
        data: { itemId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ item }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No Token");
      const res = await axios.post(
        `${BASE}/wishlist/add`,
        { item },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ itemId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No Token");
      const res = await axios.delete(`${BASE}/wishlist/remove`, {
        data: { itemId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const placeOrder = createAsyncThunk(
  "order/place",
  async ({ items, province, city, address }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No Token");
      const res = await axios.post(
        `${BASE}/order/place`,
        { items, province, city, address },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

const useRedux = createSlice({
  name: "AuthandCart",
  initialState: {
    currentUser: null,
    cartItems: [],
    LikeItems: [],
    isLoading: false,
    checkoutLoading: true,
  },

  reducers: {
    Logout: (state) => {
      state.currentUser = null;
      state.cartItems = [];
      state.LikeItems = [];
      localStorage.removeItem("token");
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = {
        _id: action.payload._id,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
      state.cartItems = action.payload.cartItems;
      state.LikeItems = action.payload.wishlistItems;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = {
        _id: action.payload._id,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
      state.cartItems = action.payload.cartItems;
      state.LikeItems = action.payload.wishlistItems;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(ItemsonRefresh.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ItemsonRefresh.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = {
        _id: action.payload._id,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
      state.cartItems = action.payload.cartItems;
      state.LikeItems = action.payload.wishlistItems;
    });
    builder.addCase(ItemsonRefresh.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });

    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.LikeItems = action.payload;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.LikeItems = action.payload;
    });

    builder.addCase(placeOrder.pending, (state) => {
      state.checkoutLoading = true;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.checkoutLoading = false;
    });
    builder.addCase(placeOrder.rejected, (state) => {
      state.checkoutLoading = false;
    });
  },
});

export default useRedux.reducer;
export const { Logout, setisLoading } = useRedux.actions;
