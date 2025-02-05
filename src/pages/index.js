import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeScreen from "./HomeScreen";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token found
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Prevent flashing content before redirect
  }

  return <HomeScreen />;
}
