"use client"

import { useState, useEffect } from "react"
import { Add, Edit, Delete, Instagram, YouTube, Mail } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import Image from "next/image"
import { Button, TextField, Card, CardContent, Avatar } from "@mui/material"
import { setUser } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const [links, setLinks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [username, setUsername] = useState("")
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [profileName, setProfileName] = useState("Your Name")
  const [location, setLocation] = useState("Location")

  // const selector = useSelector();

  const selector = useSelector(()=>state)

  // Fetch links for the current username
  const AddLink = async () => {
    try {
      const response = await axios.post(`/api/user/socialLinks?username=${username}`);
      setLinks(response.data)
      
    } catch (error) {
      console.log("Error Fetching Links", error);
      
    }
    // if (!username) return
    // try {
    //   const response = await fetch(`/api/user/socialLinks?username=${username}`)
    //   if (!response.ok) throw new Error("Failed to fetch data")
    //   const data = await response.json()
    //   setLinks(data)
    // } catch (error) {
    //   console.error("Error fetching links:", error)
    // }
  }

  // Handle form submission for adding new links
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newLink = { url, title, username }
    try {
      const response = await fetch("/api/user/socialLinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLink),
      })
      if (response.ok) {
        setUrl("")
        setTitle("")
        setShowAddForm(false)
        AddLink()
      }
    } catch (error) {
      console.error("Error submitting link:", error)
    }
  }

  // Handle edit submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingLink) return;
  
    try {
      const response = await fetch(`/api/auth/user/socialLinks/${editingLink._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title }),
      });
  
      if (response.ok) {
        setEditingLink(null); // Close the edit form
        setUrl("");
        setTitle("");
        AddLink(); // Refresh the list
      } else {
        console.error("Failed to update link");
      }
    } catch (error) {
      console.error("Error editing link:", error);
    }
  };
  
  
  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/user/socialLinks?id=${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        AddLink(); // Refresh after deletion
      } else {
        console.error("Failed to delete link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  useEffect(()=>{
    if(setUser.token){
      AddLink();
    }
  })
  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username")
  //   if (storedUsername) {
  //     setUsername(storedUsername)
  //   }
  // }, [])

  const handleEditClick = (link) => {
    setEditingLink(link); // Set the selected link for editing
    setUrl(link.url);     // Pre-fill the form with existing data
    setTitle(link.title);
  };

  useEffect(() => {
    if (username) AddLink()
  }, [username]) // Removed fetchLinks from dependency array

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex gap-4">
      {/* Left Section - Link Management */}
      <div className="w-2/3 space-y-4">
        <Card className="p-6">
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar sx={{ width: 80, height: 80 }}>
                <Image src="/placeholder.svg" alt="Profile" width={80} height={80} />
              </Avatar>
              <div className="flex-1 space-y-2">
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {[Mail, Instagram, YouTube].map((Icon, index) => (
                <Button key={index} variant="outlined" className="min-w-0 p-2">
                  <InstagramIcon />
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Links</h2>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowAddForm(true)}>
                  Add Link
                </Button>
              </div>

              {showAddForm && (
                <Card className="p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label="URL"
                      variant="outlined"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" variant="contained">
                        Save
                      </Button>
                      <Button variant="outlined" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

{links.map((link) => (
  <Card key={link._id} className="p-4">
    <div className="flex items-center justify-between">
      <span>{link.title}</span>
      <div className="flex gap-2">
        <Button variant="outlined" className="min-w-0 p-2" onClick={() => handleEditClick(link)}>
          <EditIcon />
        </Button>
        <Button variant="outlined" className="min-w-0 p-2" onClick={() => handleDelete(link._id)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>

    {/* Show edit form only for the selected link */}
    {editingLink?._id === link._id && (
      <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex gap-2">
          <Button type="submit" variant="contained">Update</Button>
          <Button variant="outlined" onClick={() => setEditingLink(null)}>Cancel</Button>
        </div>
      </form>
    )}
  </Card>
))}


            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - Mobile Preview */}
      <div className="w-1/3">
        <Card className="p-4 aspect-[9/19] mx-auto max-w-[300px]">
          <CardContent className="h-full bg-purple-100 rounded-xl p-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar sx={{ width: 80, height: 80 }}>
                <Image src="/placeholder.svg" alt="Profile" width={80} height={80} />
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{profileName}</h2>
                <p className="text-sm text-gray-600">{location}</p>
              </div>

              <div className="flex gap-2">
                {[Mail, Instagram, YouTube].map((Icon, index) => (
                  <Button key={index} variant="outlined" className="min-w-0 p-2">
                    <Icon />
                  </Button>
                ))}
              </div>

              <div className="w-full space-y-2">
                {links.map((link) => (
                  <Button
                    key={link.id}
                    variant="contained"
                    fullWidth
                    className="bg-purple-700 text-white hover:bg-purple-800"
                  >
                    {link.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

