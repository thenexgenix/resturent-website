import React, { useState } from "react";
import { LoginUser } from "../api/user.api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !agreeTerms) {
      toast.error("Please fill all fields and accept terms.");
      return;
    }

    setLoading(true);
    try {
      const res = await LoginUser({ email, password });
      const token = res.data.token;

      // Store token in sessionStorage instead 
      sessionStorage.setItem("token", token);

      toast.success("Login successful!");
      // navigate("/dashboard"); // redirect after login
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster />
      {/* Left Image Section for md+ */}
      <div
        className="hidden md:flex md:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_vector-1734602135837-32b52d2d6eea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-[#000000b5] flex flex-col justify-center items-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl font-bold mb-4"
          >
            Welcome to Our Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white text-lg max-w-md text-center"
          >
            Log in to continue your journey with us. Fast, secure and reliable.
          </motion.p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-start"
          >
            <h2 className="text-3xl md:text-5xl text-bg-primary font-bold mb-6 md:mb-8">
              Login
            </h2>
            <p className="text-gray-600 mt-2">
              Welcome back! Please enter your details to continue.
            </p>
          </motion.div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F90806]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F90806]"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              id="termsCheckbox"
            />
            <label htmlFor="termsCheckbox" className="select-none">
              I agree to the{" "}
              <Link to="/terms" className="text-[#F90806] underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F90806] text-white p-3 rounded hover:bg-red-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#F90806] underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
