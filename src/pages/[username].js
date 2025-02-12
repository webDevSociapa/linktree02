"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TempInsta from "../../public/img/temp_insta.png";
import Tempfb from "../../public/img/temp_fb.png";
import Tempyt from "../../public/img/temp_yt.png";
import axios from "axios";

export default function PreviewPage() {
  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const router = useRouter();

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

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername !== username) {
      setUsername(storedUsername);
      router.push(`/${storedUsername}`);
    }
  }, [username]);

  useEffect(() => {
    const fetchLinks = async () => {
      if (!username) return;

      try {
        const response = await axios.get(`/api/user/socialLinks`, {
          params: { username }
        });

        console.log("response", response);


        setLinks(response.data || []);
      } catch (error) {
        console.error("Error fetching links:", error.response?.data || error.message);
      }
    };

    fetchLinks();
  }, [username]);

  console.log("Links:", links);

  return (
    <>
      {selectedTemplate && (
        <div
          key={selectedTemplate._id}
          className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[20px] py-14 px-4 border-2 transition-all cursor-pointer"
          style={{ backgroundColor: selectedTemplate.bgcolor }}
        >
          <div className="flex flex-col items-center space-y-4">
            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.profileName}
              className="h-24 w-24 rounded-full object-cover"
            />
            <h1 className="text-xl font-bold">{selectedTemplate.profileName}</h1>
            <p className="text-center text-gray-600">{selectedTemplate.bio}</p>
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
            <Image src={TempInsta} alt="Instagram" width={40} height={40} />
            <Image src={Tempfb} alt="Facebook" width={40} height={40} />
            <Image src={Tempyt} alt="YouTube" width={40} height={40} />
          </div>
        </div>
      )}
    </>
  );
}
