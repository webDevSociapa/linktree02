"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRequest } from "@/redux/slices/authSlice";

export default function LoginForm() {

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('./img/bg12.jpeg')" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Sign in</h2>
          <p className="text-gray-500 text-center mt-1">Welcome back! 👋</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {[
              { label: "Email address", type: "email", name: "email", placeholder: "Enter email" },
              { label: "Password", type: "password", name: "password", placeholder: "Enter password" },
            ].map(({ label, type, name, placeholder }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  required
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-blue-600 hover:underline">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                // onClick={() => signIn('google', { callbackUrl: '/marketplace' })}
                className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Google
              </button>

              <button
                type="button"
                className="w-1/2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
              >
                Facebook
              </button>
            </div>

            <p className="text-center text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
            </p>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden sm:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./img/a2.png')" }} />
      </div>
    </div>
  );
}
