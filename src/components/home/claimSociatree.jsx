"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import HomeBanner1 from "../../../public/img/home1.png";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

const ClaimSociotree = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.authToken);


  const handleFetchData = async () => {
    if (inputValue.length > 0 && isAuthenticated) {
      router.push("/admin");
    }

    else{
      toast.error("check your input and login");
    }
  };

  return (
    <div className="bg-[#222222] py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 items-center gap-8">
        {/* Left Side Content */}
        <div className="text-center sm:text-left">
          <h3 className="text-5xl md:text-5xl font-bold text-[#C0C0C0] mb-4 px-4 sm:px-8">
            Everything you are. In one, simple link in bio.
          </h3>
          <p className="text-lg text-[#C0C0C0] mb-6 px-4 sm:px-8">
            Join 30M+ people using Sociotree for their link in bio. One link to help you share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
          </p>
          {/* Input and Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 px-4 sm:px-8">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">followers.link/</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-24 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <button
              onClick={handleFetchData}
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Claim your Sociotree
            </button>
          </div>
        </div>
        {/* Right Side Image */}
        <div className="flex justify-center mt-8 sm:mt-20">
          <Image src={HomeBanner1} alt="hero" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default ClaimSociotree;
