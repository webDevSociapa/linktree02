"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TempInsta from "../../public/img/temp_insta.png";
import Tempfb from "../../public/img/temp_fb.png";
import Tempyt from "../../public/img/temp_yt.png";
import axios from "axios";
import { Box, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function PreviewPage() {
  const [links, setLinks] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const router = useRouter();
  const { username } = router.query;


  // Fetch Template Data
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`/api/user/template/chooseTemplate?username=${username}`);
        const result = await response.json();

        if (result.success && result.data) {
          setSelectedTemplate(result.data[0]);
        } else {
          console.error("Error:", result.message);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    if (username) fetchTemplates();
  }, [username]);

  // Fetch User Profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (username) {
        try {
          const response = await axios.get(`/api/auth/signup?username=${username}`);
          const profileData = response.data[0];
          setUserProfile(profileData);
        } catch (error) {
          console.error("Error fetching profile:", error.response?.data || error.message);
        }
      }
    };
    fetchProfile();
  }, [username]);

  // Fetch Social Links
  useEffect(() => {
    const fetchLinks = async () => {
      if (username) {
        try {
          const response = await axios.get(`/api/user/socialLinks?username=${username}`);
          setLinks(response.data);
        } catch (error) {
          console.error("Error fetching links:", error);
        }
      }
    };
    fetchLinks();
  }, [username]);

  console.log("links", links);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {selectedTemplate && (
        <Card
          className="relative w-full h-full overflow-hidden  px-4 border-2 transition-all cursor-pointer"
          sx={{
            backgroundColor: selectedTemplate.bgcolor,
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Box className="flex flex-col items-center space-y-3">
            <Image src={userProfile?.profileImage || ""} alt={userProfile?.profileImage} width={96} height={96} className="rounded-full border-4 border-white" />
            <Typography variant="h5" className="text-white font-bold">
              {userProfile?.profileName || selectedTemplate.profileName}
            </Typography>
            <Typography className="text-gray-200">{userProfile?.Bio || selectedTemplate.bio}</Typography>
          </Box>

          <Box className="mt-6 space-y-3 w-full">
            {links?.map((link) => (
              <a key={link.id} href={link.url} className="block w-full rounded-full bg-white text-center py-3 font-medium text-gray-800 hover:bg-gray-200 transition-colors">
                {link.title}
              </a>
            ))}
          </Box>

          {/* Social Icons */}
          <Box className="flex justify-center gap-6 mt-6">
            <Image src={Tempfb} width={24} height={24} alt="Facebook" />
            <Image src={TempInsta} width={24} height={24} alt="Instagram" />
            <Image src={Tempyt} width={24} height={24} alt="YouTube" />
          </Box>
        </Card>
      )}
    </div>
  );
}