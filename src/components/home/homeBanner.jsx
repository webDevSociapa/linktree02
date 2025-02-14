import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Button, TextField, Grid, Typography,
  AppBar, Toolbar, useMediaQuery, useTheme,
  IconButton, Drawer, List, ListItem, ListItemText,
  InputAdornment
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import Link from "next/link";
import HomeBanner1 from "../../../public/img/home1.png";
import MainLogo from "../../../public/img/mainLogo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/slices/authSlice"; // Ensure correct import

const HomeBanner = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(false)

  const theme = useTheme();
  const userData = useSelector
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isAuthenticated = useSelector((state) => state.auth.authToken);




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

  useEffect(() => {
    const authStatusData = localStorage.getItem("login", "Login successful");
    if (authStatusData) {
      setAuthStatus(true)
    }
  }, [])


  const handleLogout = useCallback(() => {
    dispatch(logoutSuccess());
  }, [dispatch]);
  return (
    <Box className="homeBanner">
      {/* Navbar */}
      <AppBar position="fixed" color="inherit" elevation={2} className="navbar" sx={{
        top: 10,
        left: 0,
        width: "calc(100% - 20px)", // Reduces width to account for left & right margins
        margin: "0 10px", // 10px margin on both sides
        zIndex: 1100,
        borderRadius: "10px", // Optional: If you want rounded edges
      }}>
        <Toolbar className="toolbar">
          {/* Logo */}
          <Link href="/" passHref>
            <Image src={MainLogo} alt="logo" width="50" height="50" style={{ marginRight: '16px', cursor: 'pointer' }} />
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
              {isAuthenticated ? (
                <Button color="inherit" sx={{ background: "#EFF0EC", fontFamily: "Arial", fontWeight: "400" }} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
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
