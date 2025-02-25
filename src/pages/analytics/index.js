// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";

// const AnalyticsPage = () => {
//   const [linkData, setLinkData] = useState([]);

//   useEffect(() => {
//     const fetchLinkData = async () => {
//       try {
//         const response = await axios.get("/api/links");
//         setLinkData(response.data);
//       } catch (error) {
//         console.error("Error fetching link data:", error);
//       }
//     };

//     fetchLinkData();
//   }, []);

//   const data = {
//     labels: linkData.map((link) => link.title),
//     datasets: [
//       {
//         label: "Clicks",
//         data: linkData.map((link) => link.clicks),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Link Analytics</h2>
//       <Bar data={data} />
//     </div>
//   );
// };

// export default AnalyticsPage;