import React from "react";
import homeImage from "../media/setup2.jpg";
import setup from "../media/setup.jpg"; // Example image path
import setup2 from "../media/home2.jpg";
import setup3 from "../media/setup3.jpg";
import setup5 from "../media/setup5.jpg";
import toys from "../media/toys.jpg";
import toys2 from "../media/toys2.jpg"; // Example image path
import policyImage from "../media/policy.png"; // Policy image path
import Carousel from "react-material-ui-carousel";
import {
  Typography,
  Box,
  Button,
  Container,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Home = () => {
  const carouselItems = [
    { img: setup, title: "setup 1" },
    { img: setup2, title: "setup 2" },
    { img: setup3, title: "setup 1" },
    { img: setup5, title: "setup 2" },
    { img: toys, title: "setup 1" },
    { img: toys2, title: "setup 2" }
  ];

  return (
    <Box>
      <Box
        component="img"
        src={homeImage}
        alt="Home Image"
        sx={{ width: "100vw", height: "auto" }}
      />
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Check Your Account Balance
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            mt: 3
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href="http://mlr.peeps2go.com:9090/act?fbclid=IwAR0ZSa37tYvyTBDjP-Wkg0AWcIjvADZk_JJ4vqqieXQO8VOvOgSyN6EQkBE"
            target="_blank"
            sx={{
              padding: "16px 48px",
              fontSize: "18px",
              minWidth: "300px",
              borderRadius: "50px"
            }}
          >
            MLR Manchester
          </Button>
          <Divider sx={{ width: "80%", my: 2 }} />
          <Button
            variant="contained"
            color="primary"
            href="http://mlr2.peeps2go.com:9090/act?fbclid=IwAR2X4wGN3BUk-eCQc4Wc3I8KCgLDq8mwgynbvsmW9d4Wa57HYOHBGIcFpdg"
            target="_blank"
            sx={{
              padding: "16px 48px",
              fontSize: "18px",
              minWidth: "300px",
              borderRadius: "50px"
            }}
          >
            MLR Red Lion
          </Button>
        </Box>
      </Container>
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5">
              Click Here to view our consignment Policy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <img
                src={policyImage}
                alt="Policy"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ width: "80%", my: 4 }} />
        <Typography variant="h5" component="h3" gutterBottom>
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: 4,
            mt: 3
          }}
        >
          <Box>
            <Typography variant="h6">MLR Manchester:</Typography>
            <Typography variant="body1">
              4159 N George St. <br />
              Manchester, PA 17345 <br />
              717-266-3680
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 4 }} />
          <Box>
            <Typography variant="h6">MLR Red Lion:</Typography>
            <Typography variant="body1">
              59 S. Main St. <br />
              Red Lion, PA 17356 <br />
              717-501-4174
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ width: "80%", my: 4 }} />
        <Carousel autoPlay={false} animation="slide">
          {carouselItems.map((item, index) => (
            <Paper key={index}>
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{ width: "100%", height: "900px", objectFit: "cover" }}
              />
            </Paper>
          ))}
        </Carousel>
        <Typography variant="h4" component="h2" gutterBottom>
          New Items Daily
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
