import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import MainLogo from "../../../public/img/mainLogo.png";

export default function PagesList() {
  const [activePage, setActivePage] = useState("Links")

  const pagesList = [
    { name: "Links", link: "/admin" },
    { name: "Shops", link: "/shops" },
    { name: "Appearance", link: "/appearance" },
    { name: "Social Planner", link: "/social-planner" },
    { name: "Audience", link: "/audience" },
    { name: "Analytics", link: "/analytics" },
    { name: "Settings", link: "/settings" },
  ]

  return (
    <aside className="w-64 bg-white border-r p-6 space-y-6 h-full min-h-screen">
      <div className="h-12 w-12">
        <Image src={MainLogo} alt="Logo" width={48} height={48} />
      </div>
      <nav className="space-y-2">
        {pagesList.map((item) => (
          <Link href={item.link} key={item.name}>
            <button
              className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 ${activePage === item.name ? "font-bold" : "font-normal"}`}
              onClick={() => setActivePage(item.name)}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}