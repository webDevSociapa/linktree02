"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TempInsta from "../../public/img/temp_insta.png";
import Tempfb from "../../public/img/temp_fb.png";
import Tempyt from "../../public/img/temp_yt.png";
import axios from "axios";
import { Box, Card, Typography } from "@mui/material";

export default function PreviewPage() {
  const [links, setLinks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const router = useRouter();
  const { username } = router.query;

  console.log("userPrdddofile",userProfile);
  

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/user/template/templates");
        const fetchedTemplates = response.data.data || [];
        setTemplates(fetchedTemplates);

        const selected = fetchedTemplates.find((itm) => itm.isSelected);
        setSelectedTemplate(selected || null);
      } catch (error) {
        console.error("Error fetching templates:", error.response?.data || error.message);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (username) {
        try {
          const response = await axios.get(`/api/auth/signup?username=${username}`);
          setUserProfile(response.data[0]);
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
    <>
      {selectedTemplate && (
        <Card
          className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[30px] p-6 border-2 transition-all cursor-pointer"
          sx={{
            backgroundColor: selectedTemplate.bgcolor,
            textAlign: "center",
            padding: "20px",
            borderRadius: "30px",
          }}
        >
          <Box className="flex flex-col items-center space-y-3">
            <Image
              src={userProfile?.profileImage || selectedTemplate.image}
              alt={userProfile?.profileName || "Profile Image"}
              width={96}
              height={96}
              className="rounded-full border-4 border-white"
            />
            <Typography variant="h5" className="text-white font-bold">
              {userProfile?.profileName || "Profile Name"}
            </Typography>
            <Typography className="text-gray-200">{userProfile?.Bio || "User bio goes here..."}</Typography>
          </Box>

          <Box className="mt-6 space-y-3 w-full">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="block w-full rounded-full bg-white text-center py-3 font-medium text-gray-800 hover:bg-gray-200 transition-colors"
              >
                {link.title}
              </a>
            ))}
          </Box>

          <Box className="flex justify-center gap-6 mt-6">
            <Image src={Tempfb} width={24} height={24} alt="Facebook" />
            <Image src={TempInsta} width={24} height={24} alt="Instagram" />
            <Image src={Tempyt} width={24} height={24} alt="YouTube" />
          </Box>
        </Card>
      )}
    </>
  );
}