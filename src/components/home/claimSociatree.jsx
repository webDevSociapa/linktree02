import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ClaimSociotree = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 300, md: 800 },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        overflow: 'hidden',
        pt: -4,
      }}
    >
      <iframe
        src="https://sociapadash.s3.ap-south-1.amazonaws.com/sheets+/001.gif"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: -1,
        }}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, zIndex: 1,color:'#C0C0C0' }}>
        Share your Sociotree from your TikTok, Youtube, X, Instagram, Spotify and other bios
      </Typography>

      <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', borderRadius: 2, px: 3, py: 1.5, zIndex: 1 }}>
        Claim your Sociotree
      </Button>
    </Box>
  );
};

export default ClaimSociotree;
