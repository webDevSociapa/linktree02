"use client"
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField, InputAdornment } from '@mui/material';
import HomeBanner1 from "../../../public/img/home1.png";
import Image from 'next/image';
import "../../styles/globals.css";
import Link from 'next/link';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';



const ClaimSociotree = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("");

  // const username = useSelector((state) => state.auth.user)


  const handleFetchData = async () => {
    if (inputValue.length > 0) {
      router.push("/admin");
    }


  }

  return (
    <Box className="homeBanner">
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
      <Grid container spacing={2} alignItems="center" className="bannerContent">
        {/* Left Side Content */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" className="bannerText bannerTitle">
            Everything you are. In one, simple link in bio.
          </Typography>
          <Typography variant="h6" className="bannerText bannerSubtitle">
            Join 30M+ people using Sociotree for their link in bio. One link to help you share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
          </Typography>

          {/* Input and Button */}
          <Box className="inputContainer" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="inputUsername"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    followers.link/
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" type='submit' onClick={handleFetchData} color="success" sx={{ background: "#414141" }}>
              Claim your Sociotree
            </Button>
          </Box>
        </Grid>
        {/* Right Side Image */}
        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Image src={HomeBanner1} alt="hero" className="bannerImage" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClaimSociotree;
