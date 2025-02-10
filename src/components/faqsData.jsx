import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const faqs = [
    { question: "Why do I need a link in bio tool?", answer: "A link in bio tool allows you to share multiple links from one bio link." },
    { question: "Is Sociotree the original link in bio tool?", answer: "Sociotree is a modern solution for managing multiple links effectively." },
    { question: "Can you get paid and sell things from a Sociotree?", answer: "Yes, you can monetize and sell products directly through your Sociotree." },
    { question: "Is Sociotree safe to use on all of my social media profiles?", answer: "Absolutely! Sociotree is designed with security in mind." },
    { question: "What makes Sociotree better than the other link in bio options?", answer: "It offers advanced customization, analytics, and e-commerce integration." },
    { question: "How can I drive more traffic to and through my Sociotree?", answer: "Optimize your links and share your Sociotree across platforms." },
    { question: "How many links should I have on my Sociotree?", answer: "It depends on your needs, but keeping it concise is recommended." },
    { question: "Do I need a website to use Sociotree?", answer: "No, Sociotree works independently and does not require a website." },
    { question: "Where can I download the app?", answer: "You can download it from the App Store or Google Play." }
];

const FaqsData = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const handleDropdown = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-black text-white p-6 max-w-2xl mx-auto my-10">
            <h3 className="text-center text-2xl font-bold mb-4">Let’s Get Clarity!</h3>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-900 rounded-md p-4">
                        <button
                            onClick={() => handleDropdown(index)}
                            className="w-full flex justify-between items-center text-left font-medium text-lg"
                        >
                            {faq.question}
                            <ArrowDropDownIcon className={`transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                        </button>
                        {openFaq === index && <p className="mt-2 text-gray-300">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqsData;
