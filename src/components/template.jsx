import { useEffect, useState } from "react";
import Image from "next/image";
import TempInsta from "../../public/img/temp_insta.png";
import Tempfb from "../../public/img/temp_fb.png";
import Tempyt from "../../public/img/temp_yt.png";
import axios from "axios";
import { useRouter } from "next/navigation";

const Template = () => {
    
    const [templates, setTemplates] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get("/api/user/template/templates");
            setTemplates(response.data.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    const handleSelectTemplate = async (selectedTemplate) => {
        if (selectedTemplate.isSelected) return; // Prevent redundant API calls
        router.push("/marketplace");

        try {
            await axios.patch("/api/user/template/templates", {
                isSelected: true,
                id: selectedTemplate._id,
            });

            // Update state to mark only one template as selected
            setTemplates((prevTemplates) =>
                prevTemplates.map((template) => ({
                    ...template,
                    isSelected: template._id === selectedTemplate._id,
                }))
            );
        } catch (error) {
            console.error("Error updating template selection:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-center text-2xl font-bold mb-6">Choose a Template</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {templates.map((itm) => (
                    <div
                        key={itm._id}
                        className={`relative mx-auto w-full max-w-xs overflow-hidden rounded-[20px] py-14 px-4 border-2 transition-all cursor-pointer
                        ${itm.isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"}`}
                        style={{ backgroundColor: itm.bgcolor }}
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

                        {/* Checkbox for selecting a template */}
                        <div className="mt-4 flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={itm.isSelected}
                                onChange={() => handleSelectTemplate(itm)}
                                className="h-5 w-5 text-blue-500 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-700">Select</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Template;
