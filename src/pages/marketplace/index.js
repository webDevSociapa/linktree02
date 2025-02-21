"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Copy, Edit, Share2, Trash2, Plus } from "lucide-react"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axiosInstance from "utils/axiosInstance"

export default function AdminPage() {
  const router = useRouter()
  const [links, setLinks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    profileName: "",
    profileImage:null,
    bio: "",
    avatar: null,
  })
  const username = useSelector((state) => state.auth.user)
  const userId = useSelector((state) => state.auth._id)

  const [avatarPreview, setAvatarPreview] = useState(null)
  const [profileUrl, setProfileUrl] = useState("");
  const [userProfile,setUserProfile] = useState()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProfileUrl(`${window.location.origin}/${username}`)
    }
    fetchLinks()
    fetchProfile()
    // fetchUserProfile()
  }, [username])

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`/api/user/socialLinks?username=${username}`)
      setLinks(response.data)
    } catch (error) {
      toast.error("Error fetching links")
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/auth/signup?username=${username}`)
      console.log("setUserProfile",response);
      
      setUserProfile(response.data)
    } catch (error) {
      toast.error("Error fetching links")
    }
  };



  // const fetchUserProfile = async () => {
  //   try {
  //     const response = await axios.get(`/api/user/profile?username=${username}`)
  //     setFormData({
  //       ...formData,
  //       profileName: response.data.profileName,
  //       bio: response.data.bio,
  //     })
  //     setAvatarPreview(response.data.avatarUrl)
  //   } catch (error) {
  //     toast.error("Error fetching user profile")
  //   }
  // }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, avatar: file })
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleAddLinks = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/user/socialLinks", {
        url: formData.url,
        title: formData.title,
        username: username,
      })
      setLinks([...links, response.data])
      toast.success("Link added successfully")
      setShowAddForm(false)
      setFormData({ ...formData, url: "", title: "" })
      fetchLinks()
    } catch (error) {
      toast.error("Failed to add link")
    }
  }

  console.log("linksss",links);
  

  const handleEditLink = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.put(`/api/auth/signup`, {
        id: userId,
        profileImage: formData.profileImage,
        profileName: formData.profileName,
        Bio: formData.bio
      })
      setEditingLink(null)
      toast.success("Link updated successfully")
    } catch (error) {
      toast.error("Failed to update link")
    }
  }

  const handleDeleteLink = async (id) => {
    try {
      await axios.delete(`/api/user/socialLinks/${id}`)
      setLinks(links.filter((link) => link.id !== id))
      toast.success("Link deleted successfully")
    } catch (error) {
      toast.error("Failed to delete link")
    }
  }

  const handleToggleLinkVisibility = async (id, isVisible) => {
    try {
      await axios.patch(`/api/user/socialLinks/${id}`, { isVisible: !isVisible })
      setLinks(links.map((link) => (link.id === id ? { ...link, isVisible: !isVisible } : link)))
      toast.success("Link visibility updated")
    } catch (error) {
      toast.error("Failed to update link visibility")
    }
  }

  const handleEditClick = (link) => {
    console.log("link", link);

    setEditingLink(link);
    setUrl(link.url);
    setTitle(link.title);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      toast.success("Link copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: formData.profileName,
          text: `Check out ${formData.profileName}'s profile`,
          url: profileUrl,
        })
      } else {
        throw new Error("Share not supported")
      }
    } catch (error) {
      toast.error("Sharing not supported in this browser")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
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
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <div className="h-12 w-12">
          <Image src="/placeholder.svg" alt="Logo" width={48} height={48} />
        </div>
        <nav className="space-y-2">
          {["Links", "Shops", "Appearance", "Social Planner", "Audience", "Analytics", "Settings"].map((item) => (
            <button
              key={item}
              className={`w-full text-left px-4 py-2 rounded-md ${
                item === "Links" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-2xl font-bold">Profile</h2>
              <form onSubmit={handleEditLink} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                    {avatarPreview ? (
                      <Image src={avatarPreview || "/placeholder.svg"} alt="Profile" layout="fill" objectFit="cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-400">
                        {formData.profileName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Profile Picture
                      </label>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="profileName"
                        type="text"
                        value={formData.profileName}
                        onChange={(e) => setFormData({ ...formData, profileName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"

                >
                  Update Basic Details
                </button>
              </form>

              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="inline-block mr-2 h-4 w-4" />
                Add New Link
              </button>

              {showAddForm && (
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <form onSubmit={handleAddLinks} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        URL
                      </label>
                      <input
                        id="url"
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {links.map((link) => (
                  <div key={link.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                    <span>{link.title}</span>
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={link.isVisible}
                          onChange={() => handleToggleLinkVisibility(link._id, link.isVisible)}
                          className="hidden peer"
                        />
                        <div className="relative w-10 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition-colors duration-300">
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:left-5"></div>
                        </div>
                      </label>
                      <button className="text-gray-600 hover:text-blue-600" onClick={() => setEditingLink(link)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600" onClick={() => handleDeleteLink(link.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 truncate">{profileUrl}</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-blue-600" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600" onClick={shareProfile}>
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={() => router.push("/preview")}
              >
                Preview
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-[9/16] bg-gray-100 m-4 relative rounded-lg">
                <div className="absolute inset-0 flex flex-col items-center p-6">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                    {avatarPreview ? (
                      <Image src={avatarPreview || "/placeholder.svg"} alt="Profile" layout="fill" objectFit="cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-400">
                        {formData.profileName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{formData.profileName}</h3>
                  <p className="text-sm text-gray-600">{formData.bio}</p>
                  <div className="w-full mt-6 space-y-2">
                    {links
                    
                      .map((link) => (
                        <button
                          key={link.id}
                          className="w-full bg-white text-gray-800 py-2 px-4 rounded-md shadow hover:bg-gray-50 transition duration-300"
                        >
                          {link.title}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

