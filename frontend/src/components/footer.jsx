// src/components/Footer.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#c8e066" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "2px",
            width: "30%",
            textAlign: "center"
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#3794fe", marginBottom: "5px" }}
          >
            MLR MANCHESTER
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#3794fe", marginBottom: "5px" }}
          >
            717-266-3680
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#3794fe", marginBottom: "5px" }}
          >
            MLR RED LION
          </Typography>
          <Typography variant="body2" sx={{ color: "#3794fe" }}>
            717-501-4174
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

//r717-501-4174
//m717-266-3680
