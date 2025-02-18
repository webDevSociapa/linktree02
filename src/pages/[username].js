"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TempInsta from "../../public/img/temp_insta.png";
import Tempfb from "../../public/img/temp_fb.png";
import Tempyt from "../../public/img/temp_yt.png";
import axios from "axios";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useSelector } from "react-redux";

export default function PreviewPage() {
  const [links, setLinks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const searchParams = useSearchParams();

  console.log();


  const userName = searchParams.get('username');
  const router = useRouter();
  // const userName = useSelector((state) => state.auth.authToken);

  console.log("userName", userName);


  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/user/template/templates");
        const fetchedTemplates = response.data.data || [];

        setTemplates(fetchedTemplates);

        // Find the selected template
        const selected = fetchedTemplates.find((itm) => itm.isSelected);
        setSelectedTemplate(selected || null);
      } catch (error) {
        console.error("Error fetching templates:", error.response?.data || error.message);
      }
    };

    fetchTemplates();
  }, []);

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");
  //   if (storedUsername && storedUsername !== username) {
  //     setUsername(storedUsername);
  //     router.push(`/${storedUsername}`);
  //   }
  // }, [username]);

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

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`/api/user/socialLinks?username=${userName}`);
        setLinks(response.data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
    fetchTemplates()
  }, [userName]);

  console.log("Links:", links);

  return (
    <>
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
                    {/* <h1 className="text-xl font-bold">{profileName}</h1>
                    <p className="text-center text-gray-600">{bio}</p> */}
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
    </>
  );
}
