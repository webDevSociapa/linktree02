// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import Image from "next/image";
// import TempInsta from "../../public/img/temp_insta.png"
// import Tempfb from "../../public/img/temp_fb.png"
// import Tempyt from "../../public/img/temp_yt.png"

// export default function PreviewPage() {
//     const [links, setLinks] = useState([]);
//     const [username, setUsername] = useState("");
//     const [profile, setProfile] = useState({
//         name: "Robin Khan",
//         bio: "Welcome to my links!",
//         avatar: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
//     });

//     console.log("links", links);


//     const router = useRouter();
//     const selectedTemplate = useSelector((state) => state.template.selectedTemplate);
//     console.log("selectedTemplate", selectedTemplate);


//     // useEffect(() => {
//     //     const storedUsername = localStorage.getItem("username");
//     //     if (storedUsername) {
//     //         setUsername(storedUsername);
//     //         router.push(`/${storedUsername}`); // Redirect to maindomain.com/username
//     //     }
//     //     fetchLinks();
//     // }, []);

//     const fetchLinks = async () => {
//         if (!username) return;

//         try {
//             const response = await fetch(`/api/socialLinks?username=${username}`);
//             if (!response.ok) throw new Error('Failed to fetch data');

//             const data = await response.json();

//             if (data.message) {
//                 console.error(data.message);
//                 return;
//             }

//             setLinks(data);
//         } catch (error) {
//             console.error('Error fetching links:', error);
//         }
//     };

//     const copyToClipboard = () => {
//         const fullUrl = `${window.location.origin}/${username}`;
//         navigator.clipboard.writeText(fullUrl);
//         alert("Profile URL copied to clipboard!");
//     };


//     useEffect(() => {
//         const storedUsername = localStorage.getItem("username");
//         if (storedUsername) {
//             setUsername(storedUsername);
//             router.push(`/${storedUsername}`); // Redirect to maindomain.com/username
//         }
//     }, []);

//     // Re-fetch links when username changes
//     useEffect(() => {
//         if (username) fetchLinks();
//     }, [username]);

//     return (
//         <div
//             className={`relative mx-auto w-full max-w-xs overflow-hidden rounded-[20px] py-14 px-4 border-2 transition-all cursor-pointer
// `}
//             // onClick={() => handleSelectTemplate(itm)}
//             style={{ backgroundColor: selectedTemplate?.bgcolor }} // Dynamic background color
//         >
//             <div className="flex flex-col items-center space-y-4">
//                 <Image
//                     src={selectedTemplate?.image}
//                     alt={selectedTemplate?.profileName}
//                     className="h-24 w-24 rounded-full object-cover"
//                 />
//                 <h1 className="text-xl font-bold">{selectedTemplate?.profileName}</h1>
//                 <p className="text-center text-gray-600">{selectedTemplate?.bio}</p>
//             </div>

//             <div className="mt-4 space-y-2">
//                 {links?.linksData?.map((link) => (
//                     <a
//                         key={link.id}
//                         href={link.url}
//                         className="block w-full rounded-lg border border-gray-300 p-3 text-center font-medium transition-colors hover:bg-gray-200"
//                     >
//                         {link.title}
//                     </a>
//                 ))}
//             </div>

//             <div className="flex justify-center gap-4 mt-4">
//                 <Image src={TempInsta} width={40} height={10} />
//                 <Image src={Tempfb} width={40} height={10} />

//                 <Image src={Tempyt} width={40} height={10} />

//             </div>
//         </div>
//     );
// }


const UserNamePage = ()=>{
    return (
        <h1>ddd</h1>
    )
}

export default UserNamePage