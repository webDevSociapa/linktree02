import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const GrowEndEngageMent = ({ data, reverse }) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        bgcolor={data.bgColor}
        direction={reverse ? "row-reverse" : "row"} // Reverse layout for odd index
      >
       
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontFamily: "Arial",
              color: data.color,
              mt: { xs: 2, sm: 4, md: 6 },
              mb: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2 },
            }}
          >
            {data.content1}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontFamily: "Arial",
              color: data.color,

              mb: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2 },
            }}
          >
            {data.content2}
          </Typography>
          <Box display="flex">
            <Button
              variant="contained"
              sx={{
                background: data.btnColor,
                color: data.color,
                mt: 2,
                ml: 2,
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1.5, sm: 2 },
              }}
            >
              Get started for free
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src={data.image} alt="Engage Frame" style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GrowEndEngageMent;
