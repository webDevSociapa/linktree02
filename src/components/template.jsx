import { useState } from "react";
import Image from "next/image";
import TempInsta from "../../public/img/temp_insta.png"
import Tempfb from "../../public/img/temp_fb.png"
import Tempyt from "../../public/img/temp_yt.png"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setTemplate } from "@/redux/slices/templateSlice";

// import TempImage1 from "../../public/img/TempImage1.jpeg"

const Template = () => {
    // const [selectedTemplate, setSelectedTemplate] = useState(null);
    const router = useRouter()
    const dispatch = useDispatch();


    const selectedTemplate = useSelector((state) => state.template.selectedTemplate);
    console.log("selectedTemplate",selectedTemplate);
    


    const TemplateData = [
        {
            id: 1,
            profileName: "Harshita Sharma",
            bio: "Caption",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#fff",
        },
        {
            id: 2,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#FFBBBB",
        },
        {
            id: 3,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#BE6600"

        },
        {
            id: 4,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#AB0E0E"

        },
        {
            id: 5,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#AB0E0E"

        },
        {
            id: 6,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#FFE664"

        },

        {
            id: 7,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#777777"

        },
        {
            id: 7,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#000000"

        },
        {
            id: 7,
            profileName: "Robin",
            bio: "1ddf",
            image: "https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg",
            linksData: [
                { id: 1, url: "#", title: "Menu" },
                { id: 2, url: "#", title: "Online Order" },
                { id: 3, url: "#", title: "Our Story" },
                { id: 4, url: "#", title: "Locations" },
            ],
            bgcolor: "#fff"

        },
        // Add more profiles as needed
    ];

    const handleSelectTemplate = (itm) => {
        if (selectedTemplate?.id === itm.id) {
            dispatch(setTemplate(null));
    
            fetch("/api/chooseTemplate", {
                method: "DELETE",
                body: JSON.stringify({ userId: "USER_ID" }),
                headers: { "Content-Type": "application/json" },
            });
    
            return;
        }
    
        dispatch(setTemplate(itm));
        
        fetch("/api/chooseTemplate", {
            method: "POST",
            body: JSON.stringify({
                userId: "user_id",
                templateId: itm.id,
                profileName: itm.profileName,
                bio: itm.bio,
                image: itm.image,
                linksData: itm.linksData,
                bgcolor: itm.bgcolor,
            }),
            headers: { "Content-Type": "application/json" },
        });
    
        router.push(`/marketplace`);
    };
    

    return (
        <div className="p-6">
            <h1 className="text-center text-2xl font-bold mb-6">Choose a Template</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {TemplateData.map((itm) => (
                    <div
                        key={itm.id}
                        className={`relative mx-auto w-full max-w-xs overflow-hidden rounded-[20px] py-14 px-4 border-2 transition-all cursor-pointer
            ${selectedTemplate === itm.id ? "border-blue-500 shadow-lg" : "border-gray-300"}`}
                        onClick={() => handleSelectTemplate(itm)}
                        style={{ backgroundColor: itm.bgcolor }} // Dynamic background color
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={itm.image}
                                alt={itm.profileName}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                            <h1 className="text-xl font-bold">{itm.profileName}</h1>
                            <p className="text-center text-gray-600">{itm.bio}</p>
                        </div>

                        <div className="mt-4 space-y-2">
                            {itm.linksData.map((link) => (
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
                            <Image src={TempInsta} width={40} height={10} />
                            <Image src={Tempfb} width={40} height={10} />

                            <Image src={Tempyt} width={40} height={10} />

                        </div>
                    </div>
                ))}
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white display-flex font-bold py-2 px-4 rounded">
                Button
            </button>
        </div>
    );
};

export default Template;
