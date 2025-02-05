import React, { useEffect, useState } from "react";
import {
  Box, Button, TextField, Grid, Typography,
  AppBar, Toolbar, useMediaQuery, useTheme,
  IconButton, Drawer, List, ListItem, ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import Link from "next/link";
import HomeBanner1 from "../../../public/img/home1.png";

const HomeBanner = () => {
  const [inputValue, setInputValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authStatus,setAuthStatus] = useState(false)

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navLinks = [
    { title: "Templates", href: "/template" },
    { title: "Marketplace", href: "/marketplace" },
    { title: "Discover", href: "/discover" },
    { title: "Pricing", href: "/pricing" },
    { title: "Learn", href: "/learn" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileOpen(open);
  };

  useEffect(()=>{
    const authStatusData = localStorage.getItem("login","Login successful");
    if(authStatusData){
      setAuthStatus(true)
    }
  },[])

  return (
    <Box className="homeBanner">
      {/* Navbar */}
      <AppBar position="static" color="inherit" elevation={2} className="navbar">
        <Toolbar className="toolbar">
          {/* Logo */}
          <Link href="/" passHref>
            <img src="./SociapaLogo.png" alt="logo" width="50" height="50" style={{ marginRight: '16px', cursor: 'pointer' }} />
          </Link>

          {/* Mobile Menu Icon */}
          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer(true)} className="mobileMenuIcon">
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Box className="navLinks">
                {navLinks.map((item) => (
                  <Link key={item.title} href={item.href} passHref>
                    <Typography variant="h6" component="div" sx={{ cursor: "pointer", margin: "0 10px" }}>
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </Box>
              {!authStatus && (
                <Box sx={{ display: "flex", gap: 2 }}>
                <Link href="/login" passHref>
                  <Button color="inherit" sx={{ background: "#EFF0EC", fontFamily: "Arial", fontWeight: "400" }}>
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="contained" color="success" sx={{ background: "#414141" }}>
                    Sign up free
                  </Button>
                </Link>
              </Box>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
      >
        <Box className="drawer" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <IconButton className="drawerHeader"><CloseIcon /></IconButton>
          <List>
            {navLinks.map((item) => (
              <Link key={item.title} href={item.href} passHref>
                <ListItem button>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
            <Link href="/login" passHref>
              <ListItem button>
                <ListItemText primary="Log in" />
              </ListItem>
            </Link>
            <Link href="/signup" passHref>
              <ListItem button>
                <ListItemText primary="Sign up free" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>

      {/* Banner Content */}
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
          <Box className="inputContainer">
            <TextField
              fullWidth
              label="Sociotree/yourname"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="inputUsername"
            />
            <Button variant="contained" color="success" sx={{ background: "#414141" }}>
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

export default HomeBanner;
