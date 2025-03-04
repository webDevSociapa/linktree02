import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/slices/authSlice";
import MainLogo from "../../../public/img/mainLogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.authToken);

  const navLinks = [
    { title: "Templates", href: "/template" },
    { title: "Marketplace", href: "/admin" },
    { title: "Discover", href: "/discover" },
    { title: "Pricing", href: "/pricing" },
    { title: "Learn", href: "/learn" },
  ];

  const handleProtectedNavigation = (href) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push(href);
    }
  };

  const handleLogout = useCallback(() => {
    dispatch(logoutSuccess());
    toast.success("Logged out successfully");
    router.push("/login");
  }, [dispatch, router]);

  return (
    <header className="fixed top-2 left-0 w-[calc(100%-140px)] mx-[70px] z-50 bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
      <Link href="/">
        <Image src={MainLogo} alt="logo" width={50} height={50} className="cursor-pointer" />
      </Link>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 ml-6">
        {navLinks.map((item) => (
          <button
            key={item.title}
            className="text-lg hover:text-gray-500"
            onClick={() => handleProtectedNavigation(item.href)}
          >
            {item.title}
          </button>
        ))}
      </nav>

      {/* Authentication Buttons */}
      <div className="ml-auto flex items-center space-x-4">
        {isAuthenticated ? (
          <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="bg-gray-200 px-4 py-2 rounded-md">
              Log in
            </Link>
            <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded-md">
              Sign up free
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button className="md:hidden" onClick={() => setMobileOpen(true)}>
        <MenuIcon />
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button className="mb-4" onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </button>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.title}
                  className="text-lg hover:text-gray-500"
                  onClick={() => handleProtectedNavigation(item.href)}
                >
                  {item.title}
                </button>
              ))}
              <Link href="/login" className="bg-gray-200 px-4 py-2 rounded-md">
                Log in
              </Link>
              <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded-md">
                Sign up free
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[90%] max-w-lg h-auto ">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login Required</h2>
          <p className="text-lg text-gray-600 mb-6">You need to log in to access this page.</p>
          <div className="flex justify-center gap-6">
            <Link href="/login" className="bg-gray-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md transition-all">
              Log In
            </Link>
            <button
              className="bg-gray-400 hover:bg-gray-500 px-6 py-3 rounded-lg shadow-md transition-all"
              onClick={() => setShowAuthModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      )}
    </header>
  );
};

export default Header;
