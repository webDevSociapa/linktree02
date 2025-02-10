import Link from "next/link";
import XIcon from '@mui/icons-material/X';
import AddTaskIcon from '@mui/icons-material/AddTask';
import mainLogo from "../../../public/img/mainLogo.png"
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#E3E3E3] to-[#DDEAFF] py-10 px-6 md:px-20 my-20">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-black">
                {/* Column 1 */}
                <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: "The Sociotree Blog", link: "/blog" },
                            { name: "Marketplace", link: "/marketplace" },
                            { name: "What's New", link: "/news" },
                            { name: "About", link: "/about" },
                            { name: "Press", link: "/press" },
                            { name: "Careers", link: "/careers" },
                            { name: "Social Good", link: "/social-good" },
                            { name: "Contact", link: "/contact" },
                        ].map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className="cursor-pointer hover:underline">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="font-semibold mb-3">Community</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: "Linktree for Enterprise", link: "/enterprise" },
                            { name: "2022 Creator Report", link: "/creator-report" },
                            { name: "Charities", link: "/charities" },
                            { name: "Creator Profile Directory", link: "/directory" },
                            { name: "Explore Templates", link: "/templates" },
                        ].map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className="cursor-pointer hover:underline">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: "Help Topics", link: "/help" },
                            { name: "Getting Started", link: "/getting-started" },
                            { name: "Sociotree Pro", link: "/sociotree-pro" },
                            { name: "Features & How-Tos", link: "/features" },
                            { name: "FAQs", link: "/faq" },
                            { name: "Report a Violation", link: "/report" },
                        ].map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className="cursor-pointer hover:underline">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h3 className="font-semibold mb-3">Trust & Legal</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: "Terms & Conditions", link: "/terms" },
                            { name: "Privacy Notice", link: "/privacy" },
                            { name: "Cookie Notice", link: "/cookies" },
                            { name: "Trust Center", link: "/trust" },
                        ].map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className="cursor-pointer hover:underline">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Buttons and Icons */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10">
                <div className="flex gap-4">
                    <Link href="/login">
                        <button className="px-4 py-2 border border-black rounded-lg">
                            Log in
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="px-4 py-2 border border-black bg-white rounded-lg">
                            Get started for free
                        </button>
                    </Link>
                </div>

                {/* App Store & Social Links */}
                <div className="flex items-center gap-4 mt-6 md:mt-0">
                    <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                        <img src="/appstore.png" alt="App Store" className="h-10" />
                    </a>
                    <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/googleplay.png" alt="Google Play" className="h-10" />
                    </a>
                    <div className="flex gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <XIcon className="text-2xl" />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <XIcon className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex items-center items-center justify-center">
                <Image src={mainLogo} />
                <h2 className="text-[140px] text-[#C0C0C0] font-Arial">Sociotree</h2>
            </div>
        </footer>
    );
};

export default Footer;
