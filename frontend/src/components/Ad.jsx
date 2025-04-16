import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button
} from "@mui/material";
import adImage from "../media/vote.jpg"; // Import the image directly here

const Ad = ({ title, link, isVisible }) => {
  if (!isVisible) return null; // Do not render the ad if it's not visible

  return (
    <Card sx={{ maxWidth: 1000, margin: "16px auto" }}>
      <CardMedia
        component="img"
        image={adImage} // Use the imported image directly
        alt={title}
        sx={{
          height: 600, // Set a fixed height
          objectFit: "contain" // Ensure the entire image fits without being cropped
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Here Scroll down to "Consignment Shop Section"
        </Button>
      </CardContent>
    </Card>
  );
};

export default Ad;
