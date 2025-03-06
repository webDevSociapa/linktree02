import Header from "@/components/home/header";

export default function LearnPage() {
  const blogs = [
    {
      title: "How Bitten By A Kitten Rescue Revolutionized Fundraising with Followus.link",
      image: "./img/sm1.jpg",
    },
    {
      title: "The Future of Social Media Growth: Strategies for 2025",
      image: "./img/sm2.jpg",
    },
    {
      title: "Maximizing Online Donations: Tips for Nonprofits",
      image: "./img/sm1.jpg",
    },
    {
      title: "Why Community Engagement is Key for Digital Success",
      image: "./img/sm1.jpg",
    },
    {
      title: "Why Community Engagement is Key for Digital Success",
      image: "./img/sm2.jpg",
    },
    {
      title: "Why Community Engagement is Key for Digital Success",
      image: "./img/sm1.jpg",
    },{
      title: "Why Community Engagement is Key for Digital Success",
      image: "./img/sm1.jpg",
    },
    {
      title: "Why Community Engagement is Key for Digital Success",
      image: "./img/sm1.jpg",
    },
  ];

  return (
  <>
  <Header/>
  <div className="container mx-auto p-6 lg:mt-24 sm:mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
