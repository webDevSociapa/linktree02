"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { Box, Card, Typography } from "@mui/material";
import { faInstagram, faFacebook, faYoutube, faXTwitter, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PreviewPage() {
  const [links, setLinks] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const router = useRouter();
  const { username } = router.query;

  const groupOfButtons = [
    { id: "1", Icon: faInstagram },
    { id: "2", Icon: faFacebook },
    { id: "3", Icon: faYoutube },
    { id: "4", Icon: faXTwitter },
    { id: "5", Icon: faWhatsapp },
    { id: "6", Icon: faLinkedin },
  ];

  const handleLinkClick = async (linkId) => {
    try {
      await axios.patch(`/api/user/socialLinks?id=${linkId}&type=click`);
    } catch (error) {
      console.error("Error updating link click count:", error);
    }
  };

  const handleView = async (linkId) => {
    try {
      await axios.patch(`/api/user/socialLinks?id=${linkId}&type=view`);
    } catch (error) {
      console.error("Error updating link view count:", error);
    }
  };

  useEffect(() => {
    if (links.length > 0) {
      links.forEach((link) => {
        handleView(link._id);
      });
    }
  }, [links]);

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

  return (
    <div className="w-full h-screen flex justify-center items-center p-0">
      {selectedTemplate && (
        <Card
          className="relative w-full h-full overflow-hidden border-0 transition-all cursor-pointer"
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

          <div className="flex items-center justify-center gap-4 p-4">
            {groupOfButtons.map((button) => (
              <button key={button.id} className="bg-white text-black py-2 px-4 rounded-md hover:bg-red transition duration-300">
                <FontAwesomeIcon icon={button.Icon} />
              </button>
            ))}
          </div>

          <Box className="mt-6 space-y-2 w-full md:w-1/2 mx-auto">
            {links?.filter(link => link.isVisible).map((link) => (
              <a key={link.id} href={link.url} 
                onClick={() => handleLinkClick(link._id)}
                className="w-full py-2 border border-gray-300 rounded-lg text-base mb-3 text-center block hover:bg-gray-300 transition"
                style={{ backgroundColor: selectedTemplate.bgcolor || '#f3f4f6' }}
              >
                {link.title}
              </a>
            ))}
          </Box>
        </Card>
      )}
    </div>
  );
}