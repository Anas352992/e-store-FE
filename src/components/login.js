"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser, signupUser } from "@/app/redux store/slice";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const Router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.AuthManager.isLoading);

  function validateFields() {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (/\s/.test(password)) {
      setError("Spacing is not allowed in the password.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    const complexityRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
    if (!complexityRegex.test(password)) {
      setError("Password must include letters, numbers, and a special symbol.");
      return false;
    }
    return true;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateFields()) return;

    const result = await dispatch(
      loginUser({ userEmail: email, userPass: password }),
    );

    if (loginUser.fulfilled.match(result)) {
      document.cookie = "isLoggedIn=true; path=/; max-age=86400";
      setError("");
      Router.replace("/");
    } else {
      setError(result.payload || "Login failed");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!validateFields()) return;

    if (userName.trim().length <= 3) {
      setError("Username must be more than 3 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await dispatch(
      signupUser({
        userName: userName.trim(),
        userEmail: email,
        userPass: password,
      }),
    );

    if (signupUser.fulfilled.match(result)) {
      document.cookie = "isLoggedIn=true; path=/; max-age=86400";
      setError("");
      Router.replace("/");
    } else {
      setError(result.payload || "Signup failed");
    }
  }

  function toggleMode() {
    setIsSignup((prev) => !prev);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");
  }

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 20px",
    },
    card: {
      borderRadius: "20px",
      border: "none",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "420px",
      backgroundColor: "#fff",
    },
    input: {
      borderRadius: "12px",
      padding: "12px 15px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div className="card p-4 p-md-5" style={styles.card}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">NEO STEP</h2>
          <p className="text-muted small">
            {isSignup ? "Create your account" : "Access your account"}
          </p>
        </div>

        <form className="w-100">
          {isSignup && (
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">
                Username
              </label>
              <input
                type="text"
                className="form-control shadow-none"
                style={styles.input}
                placeholder="John Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Email Address
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              style={styles.input}
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Password
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignup && (
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control shadow-none"
                style={styles.input}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && (
            <div className="alert alert-danger py-2 text-center small fw-bold">
              {error}
            </div>
          )}

          <div className="d-grid gap-2 mt-4">
            {isSignup ? (
              <>
                <button
                  className="btn btn-dark py-3 fw-bold rounded-3 shadow-sm"
                  type="button"
                  onClick={handleSignup}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "CREATE ACCOUNT"}
                </button>
                <div className="d-flex align-items-center my-2">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted small fw-bold">
                    Already have an account?
                  </span>
                  <hr className="flex-grow-1" />
                </div>
                <button
                  className="btn btn-outline-dark py-3 fw-bold rounded-3"
                  type="button"
                  onClick={toggleMode}
                  disabled={isLoading}
                >
                  BACK TO LOGIN
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-dark py-3 fw-bold rounded-3 shadow-sm"
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "LOGIN"}
                </button>
                <div className="d-flex align-items-center my-2">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted small fw-bold">OR</span>
                  <hr className="flex-grow-1" />
                </div>
                <button
                  className="btn btn-outline-dark py-3 fw-bold rounded-3"
                  type="button"
                  onClick={toggleMode}
                  disabled={isLoading}
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
