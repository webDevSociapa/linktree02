import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Cards1 from '../../../public/img/c1.png';
import Cards2 from '../../../public/img/c2.png';
import Cards3 from '../../../public/img/c3.png';
import Cards4 from '../../../public/img/c4.png';

const ClaimSociotree = () => {


  return (
    <Box className="claim-container" sx={{ textAlign: 'center', p: 3 }}>
     <video 
                src="https://sociapadash.s3.ap-south-1.amazonaws.com/sheets+/cardsVideo.gif" 
                width={1200} 
                height={600} 
                // alt={`Card ${card.id}`} 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  zIndex: -1 
                }}
                autoPlay
                loop
                muted
              />
    </Box>
  );
};

export default ClaimSociotree;
