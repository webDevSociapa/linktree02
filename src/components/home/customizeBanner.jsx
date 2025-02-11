import { Box, Button, Grid, Typography } from "@mui/material";
import newGif from "../../../public/img/newGif.gif";
import Image from "next/image";

const CustomizeBanner = () => {
    return (
        <Box sx={{ bgcolor: "#E3E3E3", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6, md: 8 } }}>
            <Grid container spacing={2} alignItems="center">
                {/* Image Section */}
                <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                    <Image
                        src={newGif}
                        alt="hero"
                        className="banner-image"
                        style={{
                            background: "none",
                            width: "100%",
                            height: "auto",
                            maxWidth: "500px",
                            mixBlendMode: "difference",
                        }}
                    />
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: { xs: "center", sm: "left" } }}>
                    <Typography
                        variant="h3"
                        color="#010101"
                        fontFamily="Arial"
                        fontWeight="400"
                        lineHeight="1.2"
                        sx={{
                            fontSize: { xs: "32px", sm: "48px", md: "45px", lg: "55px" },
                            mt: { xs: 1, sm: 2 }
                        }}
                    >
                        Create and customize your Sociotree in minutes
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" }, mt: 2 }}>
                        Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more.
                        It all comes together in a link in bio landing page designed to convert.
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            background: "#010101",
                            mt: 3,
                            width: { xs: "100%", sm: "250px", md: "300px" },
                            fontSize: { xs: "14px", sm: "16px" },
                            py: 1.5
                        }}
                    >
                        Get started for free
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CustomizeBanner;
