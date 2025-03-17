"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Copy, Edit, Share2, Trash2, Plus, ArrowRight, Download } from "lucide-react"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axiosInstance from "utils/axiosInstance"
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DialogModal from "@/components/common/dialogModal"
import Link from "next/link"
import PagesList from "@/components/common/pagesList"
import { Alert, Button, Input } from "@mui/material"

export default function AdminPage() {
  const router = useRouter()
  const [links, setLinks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [templates, setTemplates] = useState([]);
  const [buttonUrls, setButtonUrls] = useState({});
  const [openSocial, setOpenSocial] = useState(false);
  const [formData2, setFormData2] = useState({ url: "" });
  const [socialUrls, setSocialUrls] = useState([]);
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    profileName: "",
    profileImage: null,
    bio: "",
    avatar: null,
  })
  const username = useSelector((state) => state.auth.user)

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [open, setOpen] = useState(false);
  const [isOpenFiled, setIsOpenFiled] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProfileUrl(`${window.location.origin}/${username}`)
    }
    fetchLinks()
    fetchProfile()
  }, [username])

  const groupOfButtons = [
    { id: "1", Icon: faInstagram },
    { id: "2", Icon: faFacebook },
    { id: "3", Icon: faYoutube },
    { id: "4", Icon: faXTwitter },
    { id: "6", Icon: faLinkedin },
  ]

  const handleInputChange = (id, value) => {
    setButtonUrls((prev) => ({ ...prev, [id]: value }));
  };





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
      const profileData = response.data[0]
      setUserProfile(profileData)
      setFormData({
        ...formData,
        profileName: profileData.profileName || "",
        bio: profileData.Bio || "",
        profileImage: profileData.profileImage || null,
        _id: profileData._id || ""
      })
      setAvatarPreview(profileData.profileImage || null)
    } catch (error) {
      toast.error("Error fetching profile")
    }
  };

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
        isVisible: "false"
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

  const handleEditLink = async (e, isUrlUpdate = false) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("_id", formData._id);

      if (isUrlUpdate) {
        // If updating socialUrls, append new URL
        if (formData2.url.trim()) {
          data.append("socialUrls", formData2.url);
        }
      } else {
        // If updating bio & profile image
        data.append("Bio", formData.bio);
        if (formData.avatar) {
          data.append("profileImage", formData.avatar);
        }
      }
      const response = await axiosInstance.put(`/api/auth/signup`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");
      fetchProfile(); // Refresh profile data
      if (isUrlUpdate) {
        setSocialUrls([...socialUrls, formData2.url]); // Append new URL to state
        setFormData2({ url: "" }); // Reset input field
      } else {
        setIsOpenFiled(false); // Hide input after update
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };



  const handleDeleteLink = async (id) => {
    try {
      await axios.delete(`/api/user/socialLinks?id=${id}`)
      setLinks(links.filter((link) => link.id !== id))
      toast.success("Link deleted successfully")
      fetchLinks()
    } catch (error) {
      toast.error("Failed to delete link")
    }
  }

  const handleToggleLinkVisibility = async (id, isVisible) => {

    try {
      await axios.put(`/api/user/socialLinks?id=${id}`, { isVisible: !isVisible })
      setLinks(links.map((link) => (link._id === id ? { ...link, isVisible: !isVisible } : link)))
      toast.success("Link visibility updated")
    } catch (error) {
      toast.error("Failed to update link visibility")
    }
  }




  const handleEditClick = (link) => {
    // setEditingLink(link);
    // setUrl(link.url);
    // setTitle(link.title);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      toast.success("Profile URL copied to clipboard")
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

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`/api/user/template/chooseTemplate?username=${username}`);
      const result = await response.json();

      if (result.success) {
        setTemplates(result.data);
        // Use result.data to update UI
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (templates.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[90%] max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800"> Go to Template Page select a template and come back here</h2>
          <p className="text-lg text-gray-600 mb-6">You need to Select template in to access this page.</p>
          <div className="flex justify-center gap-6">
            <Link href="/template" className="bg-gray-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md transition-all">
              Go
            </Link>
            {/* <button
        className="bg-gray-400 hover:bg-gray-500 px-6 py-3 rounded-lg shadow-md transition-all"
        onClick={() => setOpenTemplateModal(false)}
      >
        Cancel
      </button> */}
          </div>
        </div>
      </div>
    )
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
      <PagesList />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Analytics Header */}
          <div className="bg-black text-white p-4 rounded-md mb-6">
            <h1 className="text-lg font-medium">Analytics</h1>
          </div>

          {/* User Profile */}
          <div className="bg-white rounded-md p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white overflow-hidden">
                <Image
                  src={avatarPreview || "/placeholder.svg"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                {/* <span >{formData.profileName.charAt(0)}</span> */}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{userProfile?.username || "Robin Khan"}</h2>
                  {/* <Edit onClick={handleEditClick} /> */}
                </div>
                <p className="text-sm text-gray-600 inline-flex items-center gap-1">
                  {userProfile?.Bio || "Always down for a good time and making memories with my squad 🤝"}
                  <Edit onClick={() => setIsOpenFiled(true)} />
                </p>
                {isOpenFiled && (
                  <form onSubmit={handleEditLink} className="inline-flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="border border-gray-300 rounded-md p-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="submit" className="text-blue-600 hover:underline">
                      Save
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="mb-4">
            <button
              className="w-full bg-red-700 text-white py-2 rounded-md flex items-center justify-center"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus size={18} className="mr-1" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {/* Social Buttons */}
            <div className="flex gap-2">
              {groupOfButtons.map((button) => (
                <button
                  key={button.id}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                  onClick={() => setOpenSocial(openSocial === button.id ? null : button.id)}
                >
                  <FontAwesomeIcon icon={button.Icon} />
                </button>
              ))}
            </div>

            {/* URL Input Field (Shows only for the clicked button) */}
            {openSocial && (
              <form onSubmit={handleEditLink} className="flex items-center gap-2 bg-white rounded-lg shadow p-3 w-full border">
                <FontAwesomeIcon icon={groupOfButtons.find(btn => btn.id === openSocial)?.Icon} className="text-gray-700 w-5 h-5" />
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => {
                    console.log("User Input:", e.target.value); // Log input value correctly
                    setFormData({ ...formData, url: e.target.value });
                  }}
                  className="flex-1 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                  placeholder="Enter URL"
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  Update
                </button>
              </form>
            )}
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow p-6 space-y-4 mb-4">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 border"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 border"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
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

          {/* Add form of social-media */}


          {/* Collection and Archive */}
          <div className="flex justify-between mb-6">
            <button className="bg-gray-200 text-black py-2 px-4 rounded-md text-sm mt-2">Add Collection</button>
            <button className="text-black text-sm flex items-center">
              View Archive <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          {/* Social Platforms */}
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="bg-white rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{link.title}</h3>
                    <button onClick={() => handleEditClick(link)}>
                      <Edit size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button>
                      <Download size={16} />
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={link.isVisible}
                        onChange={() => handleToggleLinkVisibility(link._id, link.isVisible)}
                      />
                      <div className="w-10 h-6 bg-gray-200 peer-checked:bg-gray-600 rounded-full peer">
                        <div
                          className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${link.isVisible ? "translate-x-4" : ""}`}
                        ></div>
                      </div>
                    </label>
                    <button className="text-gray-600 hover:text-red-600" onClick={() => handleDeleteLink(link._id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">URL</p>
                <div className="bg-gray-200 h-12 rounded-md mb-2"></div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">30 Days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="flex flex-col items-center mt-10">
        {/* Profile URL Section */}
        <div className="bg-green-100 px-4 py-2 rounded-md mb-4">
          <button className="text-gray-600 hover:text-blue-600 flex items-center" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" /> {profileUrl}🔥🔥🔥
          </button>
        </div>

        {/* Mobile Preview */}
        <aside className="w-96 p-6 flex items-center justify-center">
          <div
            className="relative w-80 h-[700px] border-[12px] border-black rounded-[50px] overflow-hidden bg-white shadow-2xl"
            style={{ backgroundColor: templates?.[0]?.bgcolor || '#f3f4f6' }}
          >
            {/* Notch for the mobile mockup */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-black rounded-b-xl"></div>

            <div className="p-6 flex flex-col items-center pt-16">
              {/* Profile Avatar */}
              <div className="h-20 w-20 rounded-full overflow-hidden mb-3 border-2 border-gray-300">
                <Image
                  src={avatarPreview || "/placeholder.svg"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-gray-100">{userProfile?.username || "Robin Khan"}</h3>
              <p className="text-sm text-gray-900 mb-5">@{userProfile?.Bio}</p>

              {/* Social Buttons */}
              <div className="flex space-x-3 my-3">
                {groupOfButtons.map((button) => (
                  <button
                    key={button.id}
                    className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <FontAwesomeIcon icon={button.Icon} size="lg" />
                  </button>
                ))}
              </div>

              {/* Links */}
              {links?.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 border border-gray-300  rounded-lg text-base mb-3 text-center block hover:bg-gray-300 transition"
                  style={{ bgcolor: templates?.[0]?.bgcolor || '#f3f4f6' }}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <DialogModal open={open} setOpen={setOpen} />
    </div>
  )
}

