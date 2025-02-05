"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
    const [links, setLinks] = useState([]);
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState({
        name: "Robin Khan",
        bio: "Welcome to my links!",
        avatar: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
    });

    console.log("links",links);
    

    const router = useRouter();

    // useEffect(() => {
    //     const storedUsername = localStorage.getItem("username");
    //     if (storedUsername) {
    //         setUsername(storedUsername);
    //         router.push(`/${storedUsername}`); // Redirect to maindomain.com/username
    //     }
    //     fetchLinks();
    // }, []);

    const fetchLinks = async () => {
        if (!username) return;
    
        try {
          const response = await fetch(`/api/socialLinks?username=${username}`);
          
          
          if (!response.ok) throw new Error('Failed to fetch data');
          
          const data = await response.json();
    
          if (data.message) {
            console.error(data.message);
            return;
          }
    
          setLinks(data);
        } catch (error) {
          console.error('Error fetching links:', error);
        }
      };

    const copyToClipboard = () => {
        const fullUrl = `${window.location.origin}/${username}`;
        navigator.clipboard.writeText(fullUrl);
        alert("Profile URL copied to clipboard!");
    };


    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
          router.push(`/${storedUsername}`); // Redirect to maindomain.com/username

        }
      }, []);
    
      // Re-fetch links when username changes
      useEffect(() => {
        if (username) fetchLinks();
      }, [username]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-[40px] bg-white shadow-xl">
                <div className="relative h-[667px] w-full overflow-y-auto p-6">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={profile.avatar || "/placeholder.svg"}
                            alt={profile.name}
                            className="h-24 w-24 rounded-full object-cover"
                        />
                        <h1 className="text-xl font-bold">{profile.name}</h1>
                        <p className="text-center text-gray-600">{profile.bio}</p>
                        <button
                            onClick={copyToClipboard}
                            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Copy Profile Link
                        </button>
                    </div>

                    <div className="mt-8 space-y-4">
                        {links?.map((link) => (
                            <a
                                key={link._id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full rounded-lg bg-gray-100 p-4 text-center font-medium transition-colors hover:bg-gray-200"
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
