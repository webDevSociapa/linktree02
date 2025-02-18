"use client";

import { useState, useEffect } from "react";
import { Add, Edit, Delete, Instagram, YouTube, Mail, ContentCopy, Share, } from "@mui/icons-material";
import { Button, TextField, Card, CardContent, Avatar, IconButton, Tooltip, Typography, Box, Switch } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TempInsta from "../../../public/img/temp_insta.png";
import Tempfb from "../../../public/img/temp_fb.png";
import Tempyt from "../../../public/img/temp_yt.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SnapChatImage from "../../../public/img/snapIcon1.png"
import MainLogo from "../../../public/img/mainLogo.png"
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [links, setLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [profileName, setProfileName] = useState("Your Name");
  const [bio, setBio] = useState("Creative");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [copied, setCopied] = useState(false)
  const [profileUrl, setProfileUrl] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const router = useRouter()
  const userName = useSelector((state) => state.auth.user);




  useEffect(() => {
    if (typeof window !== "undefined") {
      setProfileUrl(`${window.location.origin}/${userName}`);
    }
  }, [userName]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };


  const fetchLinks = async () => {
    try {
      const response = await axios.get(`/api/user/socialLinks?username=${userName}`);

      console.log("response", response);

      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleAddLinks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/socialLinks", {
        url,
        title,
        username: userName,
      });
      setLinks([...links, response.data]);
      toast.success("Data Added Successfully");
      setShowAddForm(false);
      setUrl("");
      setTitle("");
      fetchLinks()
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingLink) return;

    try {
      await axios.put(`/api/user/socialLinks?id=${editingLink._id}`, {
        url,
        title,
      });
      toast.success("Link Updated Successfully");
      setEditingLink(null);
      setUrl("");
      setTitle("");
      fetchLinks();
    } catch (error) {
      console.error("Error editing link:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user/socialLinks?id=${id}`);
      toast.success("Link Deleted Successfully");
      fetchLinks();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleEditClick = (link) => {
    console.log("link", link);

    setEditingLink(link);
    setUrl(link.url);
    setTitle(link.title);
  };


  const shareProfile = () => {
    if (navigator.share && profileUrl) {
      navigator.share({
        title: profileName,
        text: `Check out ${profileName}'s profile`,
        url: profileUrl
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("/api/user/template/templates");
      const fetchedTemplates = response.data.data;

      setTemplates(fetchedTemplates);

      // Find the selected template
      const selected = fetchedTemplates.find((itm) => itm.isSelected);
      setSelectedTemplate(selected || null); // If none found, set to null
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };


  const handleRedirect = () => {
    router.push(`/${userName}`);
  };
  


  useEffect(() => {
    if (userName)
      fetchLinks();
  }, [userName]);

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log("storedUser", storedUserData);
  }, [])

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ width: 240, borderRight: 1, borderColor: "divider", p: 3 }}>
        <Image src={MainLogo} alt="Logo" width={40} height={40} />
        <Box component="nav" sx={{ mt: 4 }}>
          {["Links", "Shops", "Appearance", "Social Planner", "Audience", "Analytics", "Settings"].map((item) => (
            <Button
              key={item}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                px: 2,
                py: 1,
                mb: 1,
                color: item === "Analytics" ? "text.primary" : "text.secondary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full md:w-2/3 space-y-6">
        <Card className="p-6 shadow-md rounded-lg">
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar sx={{ width: 100, height: 100 }}>
                <input type="file" id="avatar" accept="image/*" style={{ objectFit: "inherit" }} />
                <Image src="/placeholder.svg" alt="Profile" width={100} height={100} />
              </Avatar>
              <div className="flex-1 space-y-3">
                {editingLink ? (
                  <>
                    <TextField fullWidth label="Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                    <TextField fullWidth label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                  </>
                ) :
                  <>
                    <Typography>{profileName} <Edit onClick={handleEditClick} /></Typography>
                    <Typography>{bio} <Edit /></Typography>
                  </>
                }

              </div>
            </div>
            <Button fullWidth variant="contained" sx={{ bgcolor: "#740102", mt: 2 }} onClick={() => setShowAddForm(true)}>
              Add
            </Button>

            <div className="flex gap-3 mt-4">
              {[Mail, Instagram, YouTube].map((Icon, index) => (
                <Button key={index} variant="outlined" className="p-2">
                  <Icon />
                </Button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {/* <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Links</h2>
                <Button variant="contained" startIcon={<Add />} >
                  Add Link
                </Button>
              </div> */}
              {showAddForm && (
                <Card className="p-4">
                  <form onSubmit={handleAddLinks} className="space-y-4">
                    <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField fullWidth label="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <div className="flex gap-2">
                      <Button type="submit" variant="contained">Save</Button>
                      <Button variant="outlined" onClick={() => setShowAddForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </Card>
              )}
              {links.map((link) => (
                <Card key={link._id} className="p-4 flex justify-between items-center">
                  {editingLink?._id === link._id ? (
                    // Edit Mode
                    <form
                      onSubmit={(e) => handleEditSubmit(e)}  // Pass the event
                      className="flex gap-2 w-full"
                    >
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="p-2 border rounded flex-1"
                      />
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 border rounded flex-1"
                      />
                      <Button type="submit" variant="contained" className="p-2">
                        ✅
                      </Button>
                      <Button
                        variant="outlined"
                        className="p-2"
                        onClick={() => setEditingLink(null)}
                      >
                        ❌
                      </Button>
                    </form>
                  ) : (
                    // View Mode
                    <>
                      <span>{link.title}</span>
                      <Box sx={{ mr: 1 }}>
                        <Switch />
                        <Edit onClick={() => handleEditClick(link)} />

                        <Delete onClick={() => handleDelete(link._id)} />
                      </Box>
                    </>
                  )}
                </Card>
              ))}

            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full md:w-1/3 space-y-6">
        <Button sx={{ mt: 4, textAlign: "center" }} onClick={handleRedirect}>
          Preview
        </Button>
        {/* <div className="flex justify-between bg-green-100 p-4 rounded-md shadow-md">
          <Tooltip title="Copy Link">
            <IconButton onClick={() => navigator.clipboard.writeText(profileUrl)} className="text-purple-700">
              <ContentCopy />
            </IconButton>
          </Tooltip>
          <Typography className="text-sm">{profileUrl}</Typography>
          <Tooltip title="Share">
            <IconButton className="text-purple-700">
              <Share />
            </IconButton>
          </Tooltip>
        </div> */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {/* Mockup Frame */}
          <div
            className="relative w-[823px] h-[603px] bg-center bg-contain bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: "url('/img/mockup1.png')" }}
          >
            {/* Inner Screen (Properly Positioned Inside the Mockup) */}
            <div className="absolute w-[240px] h-[500px] bg-white rounded-xl  overflow-hidden rounded-3xl

                            shadow-lg inset-0 m-auto" style={{ backgroundColor: selectedTemplate && selectedTemplate.bgcolor }}>
              {/* Your Component Goes Here */}
              {selectedTemplate && (
                <div className="relative w-full h-full p-4 overflow-y-auto">
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src={selectedTemplate.image}
                      alt={selectedTemplate.profileName}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <h1 className="text-xl font-bold">{profileName}</h1>
                    <p className="text-center text-gray-600">{bio}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="block w-full rounded-lg border border-gray-300 p-3 text-center font-medium transition-colors hover:bg-gray-200"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <FacebookIcon />
                    <InstagramIcon />
                    <YouTubeIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
