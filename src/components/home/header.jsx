import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/slices/authSlice";
import MainLogo from "../../../public/img/mainLogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.authToken);

  const navLinks = [
    { title: "Templates", href: "/template" },
    { title: "Marketplace", href: "/admin" },
    { title: "Discover", href: "/discover" },
    { title: "Pricing", href: "/pricing" },
    { title: "Learn", href: "/learn" },
  ];

  useEffect(() => {
    const authStatusData = localStorage.getItem("login");
    if (authStatusData) {
      setAuthStatus(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logoutSuccess());
  }, [dispatch]);

  return (
    <header className="fixed top-2 left-0 w-[calc(100%-140px)] mx-[70px] z-50 bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
      <Link href="/">
        <Image src={MainLogo} alt="logo" width={50} height={50} className="cursor-pointer" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 ml-6">
        {navLinks.map((item) => (
          <Link key={item.title} href={item.href} className="text-lg cursor-pointer hover:text-gray-500">
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center space-x-4">
        {isAuthenticated ? (
          <button className="bg-gray-200 px-4 py-2 rounded-md sm:block" onClick={handleLogout}>Logout</button>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="bg-gray-200 px-4 py-2 rounded-md">Log in</Link>
            <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded-md">Sign up free</Link>
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
                <Link key={item.title} href={item.href} className="text-lg hover:text-gray-500">
                  {item.title}
                </Link>
              ))}
              <Link href="/login" className="bg-gray-200 px-4 py-2 rounded-md">Log in</Link>
              <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded-md">Sign up free</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
