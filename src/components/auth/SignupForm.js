"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signUpRequest } from "@/redux/slices/authSlice";
import SignImage from "../../../public/img/signup01.png"
import Image from "next/image";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpRequest(formData));
  };

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Form */}
        <div className="flex flex-col justify-center items-center bg-[#222222] text-white p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Join Sociotree !</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium disabled:bg-gray-500"
              >
                {loading ? "Creating account..." : "Continue"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By clicking Create account, you agree to Linktree's <Link href="#" className="underline">privacy notice</Link>, <Link href="#" className="underline">T&Cs</Link> and to receive offers, news and updates.
              </p>

              <button className="w-full py-2 border border-gray-500 rounded-md flex items-center justify-center gap-2 hover:bg-gray-700">
                {/* <img src="/google-icon.svg" alt="Google" className="w-5 h-5" /> */}
                <GoogleIcon/>
                Sign up with Google
              </button>

              <button className="w-full py-2 border border-gray-500 rounded-md flex items-center justify-center gap-2 hover:bg-gray-700">
                <AppleIcon/>
                {/* <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" /> */}
                Sign up with Apple
              </button>

              <p className="text-sm text-center">
                Already have an account? <Link href="/login" className="text-blue-400 underline">Login</Link>
              </p>
            </form>
            <p className="text-xs text-gray-500 text-center mt-4">
              This site is protected by reCAPTCHA and the <Link href="#" className="underline">Google Privacy Policy</Link> and <Link href="#" className="underline">Terms of Service</Link> apply.
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-full">
          <Image src={SignImage} alt="Signup Illustration" />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}