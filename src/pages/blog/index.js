import Link from "next/link";
import Header from "@/components/home/header";
import { blogs } from "@/data/blogs";

export default function BlogListing() {
    console.log("blogs", blogs);

    return (
        <>
            <Header />
            <div className="container mx-auto px-6 py-12 mt-10">
                <h1 className="text-3xl font-bold text-center mb-10">Our Latest Blogs</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogs?.map((blog) => (
                        <Link key={blog.id} href={`/blog/blogDetails/${blog.id}`}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition h-[400px] flex flex-col">
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                    <p className="text-gray-600 text-sm">{blog.summary}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
