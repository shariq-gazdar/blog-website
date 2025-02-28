import React, { useState } from "react";
import { motion } from "framer-motion";
import googleIcon from "../assets/google-icon.png";
import { auth, db, googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword === formData.password) {
      console.log("Form Submitted:", formData);
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      navigate("/profile");
      setError("");
    } else {
      setError("Passwords do not match!");
    }
  };
  const handleGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/profile");
  };

  return (
    <div className="w-full flex justify-center h-screen bg-light-gray/5 py-42">
      <form
        className="flex flex-col items-center w-52 justify-center h-fit bg-white shadow-lg rounded-2xl p-3 gap-y-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-heading font-semibold">Signup</h1>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <label className="text-xs w-full">
          Email:
          <input
            type="email"
            name="email"
            className="border border-light-gray rounded-sm p-1 w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className="text-xs w-full relative">
          Password:
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="border border-light-gray rounded-sm p-1 w-full pr-8"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "🐵"}
            </button>
          </div>
        </label>

        <label className="text-xs w-full relative">
          Confirm Password:
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="border border-light-gray rounded-sm p-1 w-full pr-8"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "🐵"}
            </button>
          </div>
        </label>

        <motion.button
          type="submit"
          className="bg-purple text-white py-2 mt-2 rounded-sm text-[12px] w-full"
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
        >
          Submit
        </motion.button>
        <motion.div
          className="text-xs text-center w-full mt-2 bg-blue-800 text-white py-1 rounded-sm flex justify-center items-center"
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
          onClick={handleGoogle}
        >
          SignIn With Google
          <img src={googleIcon} alt="" className="w-8" />
        </motion.div>
      </form>
    </div>
  );
}

export default Signup;
