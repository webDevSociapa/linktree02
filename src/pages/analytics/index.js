import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import Header from '@/components/home/header';
import PagesList from '@/components/common/pagesList';

const Analytics = () => {
    const [linksData, setLinksData] = useState([]);
    const [graphData, setGraphData] = useState({ clicks: [], views: [], labels: [] });

    const username = useSelector(state => state.auth.user);

    const fetchLinksData = async () => {
        try {
            const response = await axios.get(`/api/user/socialLinks?username=${username}`);
            console.log("linksData", response.data);

            const data = response.data;
            setLinksData(data);

            // Prepare Graph Data
            const labels = data.map((_, index) => `Link ${index + 1}`);
            const clicks = data.map(link => link.clickCount || 0);
            const views = data.map(link => link.viewCount || 0);
            setGraphData({ labels, clicks, views });
        } catch (error) {
            console.error("Error fetching links data:", error);
        }
    };

    useEffect(() => {
        fetchLinksData();
    }, []);


    // Calculate Total Clicks & Views
    const totalClicks = linksData.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    const totalViews = linksData.reduce((sum, link) => sum + (link.viewCount || 0), 0);
    

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <PagesList />

                {/* Main Content */}
                <div className="flex-1 px-6 py-6">
                    <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-6">
                        Analytics Overview
                    </h1>

                    {/* Graph Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Engagement Overview</h2>
                        <LineChart
                            xAxis={[{ data: graphData.labels }]}
                            series={[
                                { data: graphData.clicks, label: "Clicks" },
                                { data: graphData.views, label: "Views" },
                            ]}
                            width={1200}
                            height={300}
                        />
                    </div>

                    {/* Summary Data */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600">Total Clicks</h3>
                            <p className="text-3xl font-bold text-blue-600">{totalClicks}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
                            <h3 className=" text-lg font-semibold text-gray-600">Total Views</h3>
                            <p className="text-3xl font-bold text-yellow-500">{totalViews}</p>
                        </div>
                    </div>

                    {/* Links Data */}
                    <div className="mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Links Breakdown</h2>
                        <ul className="divide-y divide-gray-200">
                            {linksData.map(link => (
                                <li key={link._id} className="py-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{link.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        <strong>URL:</strong>{' '}
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {link.url}
                                        </a>
                                    </p>
                                    <div className="flex justify-between mt-2 text-sm text-gray-700">
                                        <span className="font-medium">Clicks: {link.clickCount}</span>
                                        <span className="font-medium">Views: {link.viewCount}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;