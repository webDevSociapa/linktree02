import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BrushIcon from "@mui/icons-material/Brush";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";

const HomeCardsPage = () => {
  const cardData = [
    {
      icon: <StorefrontIcon fontSize="large" />,
      title: "Shop",
      description:
        "Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link-in-bio landing page designed to convert.",
    },
    {
      icon: <BrushIcon fontSize="large" />,
      title: "Appearance",
      description:
        "Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link-in-bio landing page designed to convert.",
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      title: "Analytics",
      description:
        "Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link-in-bio landing page designed to convert.",
    },
    {
      icon: <DescriptionIcon fontSize="large" />,
      title: "Resume Creation",
      description:
        "Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link-in-bio landing page designed to convert.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#181818", minHeight: "100vh", py: 5, px: 3 }}>
      {/* Header Text */}
      <Typography variant="h4" color="white" fontWeight="bold" >
        The fast, friendly and powerful link in bio tool.
      </Typography>

      <Box  my={2}>
        <Button variant="outlined" sx={{ color: "white", fontWeight: "bold" }}>
          Claim your Soclstore
        </Button>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                bgcolor: "#292929",
                color: "white",
                textAlign: "center",
                p: 2,
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Box sx={{ fontSize: "3rem", mb: 2 }}>{card.icon}</Box>
                <Typography variant="h6" fontWeight="bold">
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "#333",
                    color: "white",
                    "&:hover": { bgcolor: "#444" },
                  }}
                >
                  Discover
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer Large Text */}
      <Typography variant="h2" color="white" fontWeight="bold" textAlign="center" mt={5}>
        One Stop Link For
      </Typography>
    </Box>
  );
};

export default HomeCardsPage;
