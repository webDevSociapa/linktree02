import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, ButtonGroup, Card, Grid, Typography, IconButton } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import Header from "./home/header";
import TempInsta from "../../public/img/temp_insta.png";
import Tempfb from "../../public/img/temp_fb.png";
import Tempyt from "../../public/img/temp_yt.png";
import { useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import SpecialTemplates from "./specialTemplate";

const Template = () => {
  const [templates, setTemplates] = useState([]);
  const router = useRouter();
  const username = useSelector((state) => state.auth.user);
  const [selectedType, setSelectedType] = useState("All");
  const [storeTemplates, setStoreTemplates] = useState([]);

  const typesOfTemplates = [
    { id: "1", name: "All" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Health and Fitness" },
    { id: "4", name: "Influencer and Creator" },
    { id: "5", name: "Marketing" },
    { id: "6", name: "Small Business" },
    { id: "7", name: "Music" },
    { id: "8", name: "Social Media" },
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSelectType = (selectedType) => {
    setSelectedType(selectedType.name);
    if (selectedType.name === "All") {
      setTemplates(storeTemplates);
    } else {
      const filterTemplates = storeTemplates.filter((template) => template.type === selectedType.name);
      setTemplates(filterTemplates);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("/api/user/template/templates");
      const selectedTemplateRes = await axios.get(`/api/user/template/chooseTemplate?username=${username}`);

      const selectedTemplateId = selectedTemplateRes.data?.templateId;

      const updatedTemplates = response.data.data.map((template) => ({
        ...template,
        isSelected: template._id === selectedTemplateId,
      }));

      setStoreTemplates(response.data.data);
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleSelectTemplate = async (selectedTemplate) => {
    if (selectedTemplate.isSelected) return;

    if (!username) {
      toast.error("Please login to select a template");
      return;
    }

    try {
      const response = await axios.post("/api/user/template/chooseTemplate", {
        username,
        templateId: selectedTemplate._id,
        profileName: selectedTemplate.profileName,
        bio: selectedTemplate.bio,
        image: selectedTemplate.image,
        linksData: selectedTemplate.linksData,
        bgcolor: selectedTemplate.bgcolor,
      });

      if (response.status === 200) {
        setTemplates((prevTemplates) =>
          prevTemplates.map((template) => ({
            ...template,
            isSelected: template._id === selectedTemplate._id,
          }))
        );    
        router.push("/admin");
      } else {
        console.error("Failed to select template:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating template selection:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", mt: 10 }}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />

        {/* Hero Section */}
        <Box sx={{ py: 4, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item>
              <Typography
                variant="h2"
                sx={{
                  color: "#E3E3E3",
                  fontWeight: 900,
                  textAlign: "center",
                  fontFamily: "Arial",
                  fontSize: { xs: "40px", md: "70px" },
                  lineHeight: 1.2,
                }}
              >
                The Template To Suit <br /> Every Brand And <br /> Creator
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  textAlign: "center",
                  maxWidth: "800px",
                  fontSize: { xs: "16px", md: "20px" },
                  fontWeight: 400,
                }}
              >
                Different Link Apps, integrations, and visual styles can help you create a Followus.link that looks and feels like you and your brand. Explore our library of custom templates to grow and connect with your audience even more easily!
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Filter Section */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
          <IconButton sx={{ color: "white" }}>
            <FilterList />
          </IconButton>
          <ButtonGroup
            variant="contained"
            sx={{
              p: { xs: 1, sm: 2 },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            {typesOfTemplates?.map((label) => (
              <Button
                key={label.id}
                sx={{
                  background: "#fff",
                  color: "#1B1D1A",
                  border: "1px solid black",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  minWidth: { xs: "80px", sm: "100px" },
                  px: { xs: 1, sm: 2 },
                  py: { xs: 0.5, sm: 1 },
                }}
                onClick={() => handleSelectType(label)}
              >
                {label.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* Templates Section */}
        <Box className="p-6">
          <Typography variant="h4" className="text-center text-white font-bold mb-6">
            Choose a Template
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {templates.map((itm) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={itm._id}>
                <Card
                  className={`relative mx-auto w-full max-w-xs overflow-hidden rounded-[30px] p-6 border-2 transition-all cursor-pointer ${itm.isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"
                    }`}
                  sx={{
                    backgroundColor: itm.bgcolor,
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "30px",
                  }}
                >
                  <Box className="flex flex-col items-center space-y-3">
                    <Image src={itm.image} alt={itm.profileName} width={96} height={96} className="rounded-full border-4 border-white" />
                    <Typography variant="h5" className="text-white font-bold">
                      {itm.profileName}
                    </Typography>
                    <Typography className="text-gray-200">{itm.bio}</Typography>
                  </Box>

                  <Box className="mt-6 space-y-3 w-full">
                    {itm.linksData.map((link) => (
                      <a key={link.id} href={link.url} className="block w-full rounded-full bg-white text-center py-3 font-medium text-gray-800 hover:bg-gray-200 transition-colors">
                        {link.title}
                      </a>
                    ))}
                  </Box>

                  {/* Social Icons */}
                  <Box className="flex justify-center gap-6 mt-6">
                    <Image src={Tempfb} width={24} height={24} alt="Facebook" />
                    <Image src={TempInsta} width={24} height={24} alt="Instagram" />
                    <Image src={Tempyt} width={24} height={24} alt="YouTube" />
                  </Box>

                  {/* Select Checkbox */}
                  <Box className="mt-6 flex items-center justify-center">
                    <input type="checkbox" checked={itm.isSelected} onChange={() => handleSelectTemplate(itm)} className="h-5 w-5 text-blue-500 cursor-pointer" />
                    <span className="ml-2 text-white">Select</span>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <SpecialTemplates/>
        </Box>
      </Box>
    </>
  );
};

export default Template;
