"use client";

import { useState, useEffect } from "react";
import { Add, Edit, Delete, Instagram, YouTube, Mail, ContentCopy, Share, } from "@mui/icons-material";
import { Button, TextField, Card, CardContent, Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const [links, setLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("")
  const [title, setTitle] = useState("");
  const [profileName, setProfileName] = useState("Your Name");
  const [bio, setBio] = useState("Creative");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [copied,setCopied] = useState(false)
  const [profileUrl, setProfileUrl] = useState("");



  useEffect(() => {
    if (typeof window !== "undefined") {
        setProfileUrl(`${window.location.origin}/${username}`);
    }
}, [username]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };


  const fetchLinks = async () => {
    try {
      const response = await axios.get(`/api/user/socialLinks?username=${username}`);

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
        username: username,
      });
      setLinks([...links, response.data]);
      toast.success("Data Added Successfully");
      setShowAddForm(false);
      setUrl("");
      setTitle("");
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
    setEditingLink(link);
    setUrl(link.url);
    setTitle(link.title);
  };


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

  }, []);


  const copyToClipboard = () => {
    if (profileUrl) {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
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



  useEffect(() => {
    if (username) fetchLinks();
  }, [username]);;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex gap-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-2/3 space-y-4">
        <Card className="p-6">
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar sx={{ width: 80, height: 80 }}>
                <Image src="/placeholder.svg" alt="Profile" width={80} height={80} />
              </Avatar>
              <div className="flex-1 space-y-2">
                <TextField fullWidth label="Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                <TextField fullWidth label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                <Button variant="contained" component="label">
                  Upload Avatar
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {[Mail, Instagram, YouTube].map((Icon, index) => (
                <Button key={index} variant="outlined" className="min-w-0 p-2">
                  <Icon />
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Links</h2>
                <Button variant="contained" startIcon={<Add />} onClick={() => setShowAddForm(true)}>
                  Add Link
                </Button>
              </div>

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

              {links?.map((link) => (
                <Card key={link._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <span>{link.title}</span>
                    <div className="flex gap-2">
                      <Button variant="outlined" className="min-w-0 p-2" onClick={() => handleEditClick(link)}>
                        <Edit />
                      </Button>
                      <Button variant="outlined" className="min-w-0 p-2" onClick={() => handleDelete(link._id)}>
                        <Delete />
                      </Button>
                    </div>
                  </div>

                  {editingLink?._id === link._id && (
                    <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
                      <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                      <TextField fullWidth label="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
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
      <div className="w-1/3">
      <div className="flex justify-between bg-[#90EE90]">
                            <Tooltip title="Copy Link">
                                <IconButton onClick={copyToClipboard} className="text-purple-700">
                                    <ContentCopy />
                                    <Typography> Copy Profile Link :{profileUrl}</Typography>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                                <IconButton onClick={shareProfile} className="text-purple-700">
                                    <Share />
                                </IconButton>
                            </Tooltip>
                        </div>
        <Card className="p-4 aspect-[9/19] mx-auto max-w-[300px]">
          <CardContent className="h-full bg-purple-100 rounded-xl p-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar sx={{ width: 80, height: 80 }}>
                <Image src="/placeholder.svg" alt="Profile" width={80} height={80} />
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{profileName}</h2>
                <p className="text-sm text-gray-600">{bio}</p>
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
  );
}
