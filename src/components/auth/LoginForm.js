"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      console.log("ddddd",data.user.userName);
      
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      localStorage.setItem("login","Login successful")
      localStorage.setItem("username",data.user.userName)
      router.push("/HomeScreen")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: "url('./img/bg12.jpeg')",backgroundRepeat:"no-repeat",backgroundSize:"100%",objectFit:"contain" }}>
      <div className="max-w-4xl w-full flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Sign in</h2>
          <p className="text-gray-500 text-center mt-1">Welcome back! 👋</p>

          {error && <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Email address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter password"
              />
            </div>

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
              <button className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Google</button>
              <button className="w-1/2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900">Facebook</button>
            </div>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
            </p>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden sm:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./img/a2.png')" }}>
          {/* Optional content */}
        </div>
      </div>
    </div>
  )
}
