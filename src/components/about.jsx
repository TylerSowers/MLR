import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import elizabethImage from "../media/momgrace.jpg"; // Adjust the path as needed

const About = () => {
  return (
    <Container
      sx={{ textAlign: "center", pt: { xs: 4, sm: 8 }, pb: { xs: 4, sm: 8 } }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Meet The Owner!
      </Typography>
      <Divider sx={{ mb: 3, bgcolor: "#c8e066", height: 1.3 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 4
        }}
      >
        <Box sx={{ flex: "1" }}>
          <img
            src={elizabethImage}
            alt="Elizabeth Sowers"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "30%",
              display: "block",
              margin: "0 auto"
            }}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 4, display: { xs: "none", sm: "block" } }}
        />
        <Box sx={{ flex: "1", textAlign: "left" }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Elizabeth Sowers
          </Typography>
          <Typography variant="body1" sx={{ color: "#3794fe" }}>
            I am the mother of 2 intelligent boys and 2 stylish girls. Before I
            opened MLR - I was selling kids clothing on EBay. With my house
            filled with products and boxes, my mother joked around and said
            "with all of this product, you might as well open a consignment
            store!" Almost two decades later, here MLR stands with 2 locations.
            With the idea of my mother and support from everyone around me - my
            dream became a reality. I thank God everyday for MLR and how it has
            been a blessing for so many people, including myself. You can
            usually catch me roller skating out on the floor helping with
            displays, or helping out with the process in the back at both
            locations. Also, meet the future owner of MLR Grace!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
