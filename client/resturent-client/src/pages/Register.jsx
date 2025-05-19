import React, { useState, useEffect } from "react";
import { registerUser } from "../api/user.api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: "#D00706" },
  tap: { scale: 0.95 },
};

const overlayVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !agreeTerms) {
      toast.error("Please fill all fields and accept terms.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ name, email, password });
      const token = res.data.token;

      sessionStorage.setItem("authToken", token);

      toast.success("Registration successful! Redirecting...");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster />

      {/* Left Input Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12">
        <motion.h1
          className="text-4xl font-extrabold text-[#F90806] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Register
        </motion.h1>
        <motion.p
          className="mb-8 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Create your account and start your journey with us today.
        </motion.p>

        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
        >
          <motion.input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#F90806]"
            required
            variants={inputVariants}
            custom={0}
          />
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#F90806]"
            required
            variants={inputVariants}
            custom={1}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#F90806]"
            required
            variants={inputVariants}
            custom={2}
          />
          <motion.div
            className="flex items-center gap-3"
            variants={inputVariants}
            custom={3}
          >
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="w-5 h-5"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <Link to="/terms" className="text-[#F90806] underline">
                Terms and Conditions
              </Link>
            </label>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F90806] text-white py-3 rounded font-semibold hover:bg-red-700 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            custom={4}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-6 text-center text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-[#F90806] underline">
            Login here
          </Link>
        </motion.p>
      </div>

      {/* Right Image Section */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/vector-1740699300565-b48b64151431?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          minHeight: "100vh",
        }}
      >
        <motion.div
          className="absolute bottom-16 left-16 text-white bg-black bg-opacity-40 p-6 rounded max-w-xs"
          initial="hidden"
          animate="visible"
          variants={overlayVariants}
        >
          <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
          <p>
            Create your account to access exclusive features and start
            exploring.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
