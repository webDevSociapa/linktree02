import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeScreen from "./HomeScreen";
import LoadingSpinner from "@/components/loadingSpinner";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token found
    } else {
      setIsAuthenticated(true);
    }
    setTimeout(() => setLoading(false), 1000); // Simulate loading time
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner
  }

  if (!isAuthenticated) {
    return null; // Prevent flashing content before redirect
  }

  return <HomeScreen />;
}
