import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import Calendar from "./calendar";
import PublicCalendar from "./PublicCalendar";
import Message from "./messages";
import Ad from "./Ad"; // Import the Ad component
import Money from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ToysIcon from "@mui/icons-material/Toys";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ReportIcon from "@mui/icons-material/Report";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import { jwtDecode } from "jwt-decode";

const Consign = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdVisible, setIsAdVisible] = useState(false); // State to control ad visibility

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setIsAdmin(decodedToken.isAdmin);
    }

    // Set ad visibility based on time period
    const currentDate = new Date();
    const startDate = new Date("2025-04-01"); // Start date for the ad
    const endDate = new Date("2025-04-30"); // End date for the ad
    setIsAdVisible(currentDate >= startDate && currentDate <= endDate);
  }, [token]);

  const policyPoints = [
    {
      title: "The Consignment Period",
      description:
        "All items remain on the floor for 90 days. After this time, items that have not sold become property of MLR Consignment and may be donated to local churches. Items priced over $25 may be requested to pick up at the end of the consignment period with a 48-hour notice.",
      icon: <AccessTimeIcon style={{ fontSize: 80, color: "Black" }} />
    },
    {
      title: "How the Money Works",
      description:
        "Once an item sells, you will get 50% of the selling price. Your money can be used as store credit to purchase items any time. You may cash your account once a month ONLY BETWEEN the 15th - 20th of the month. Amounts over $30 will be issued a check, under $30 will be given cash.",
      icon: <Money style={{ fontSize: 80, color: "green" }} />
    },
    {
      title: "Prepare Items",
      description:
        "All clothing must be freshly laundered within the last 48 hours prior to bringing your items in. Lay your items flat in a plastic tub or basket after washing to reduce wrinkles. NO GARBAGE BAGS or Boxes PLEASE!",
      icon: (
        <LocalLaundryServiceIcon style={{ fontSize: 80, color: "#a8a8a8" }} />
      )
    },
    {
      title: "Limitations",
      description:
        "30 item limit on walk-in days. No limit on large items like furniture and baby gear. Send a photo of large items to our Facebook/Email for pre-approval. Final approval will be given once the item is physically seen.",
      icon: <ReportIcon style={{ fontSize: 80, color: "red" }} />
    },
    {
      title: "Baby Clothing",
      description:
        "Must be newer styles within the past 2 years. Pair infant sets together (no pins please). No partial sets accepted. Onesies should be paired in sets of 2 or more, same size and brand.",
      icon: <ChildCareIcon style={{ fontSize: 80, color: "#ffd28a" }} />
    },
    {
      title: "Baby Equipment",
      description:
        "Items like swings, strollers, walkers, highchairs, etc., must be cleaned and meet current CDC and our safety guidelines. These items should be less than 5 years old. We DO NOT ACCEPT Car seats, Bathtubs, or Cribs.",
      icon: <ChildFriendlyIcon style={{ fontSize: 80, color: "#525454" }} />
    },
    {
      title: "Toys",
      description:
        "Must be less than 4 years old, cleaned, and have working batteries.",
      icon: <ToysIcon style={{ fontSize: 80, color: "Blue" }} />
    },
    {
      title: "Seasons",
      description:
        "Spring/Summer: January-June 14th. Fall/Winter: July-December 14th.",
      icon: <AcUnitIcon style={{ fontSize: 80, color: "#65d8f7" }} />
    }
  ];

  return (
    <Container>
      {isAdVisible && (
        <Ad
          title="MLR is in the top 5 for the 2025 York-Hanover Community's Choice Awards!"
          link="https://ydr.gannettcontests.com/2025-York--Hanover-Communitys-Choice-Awards/gallery/?group=512542&fbclid=IwY2xjawJr5XNleHRuA2FlbQIxMAABHhutSnbkz30fDNjkmi8mXKga8mvn2cNAlq-BBO3Oq2IAOMQ83ZMAbAhf_BlV_aem_OsYHgBHJez7HqW-cdBSvEQ" // Replace with your ad link
          isVisible={isAdVisible}
        />
      )}
      <Message token={token} />

      {isAdmin ? <Calendar token={token} /> : <PublicCalendar />}
      <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Consignment Policy
        </Typography>

        <Grid container spacing={3} style={{ marginTop: "16px" }}>
          {policyPoints.map((point, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <div style={{ textAlign: "center", padding: "16px" }}>
                  {point.icon}
                </div>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {point.title}
                  </Typography>
                  <Typography variant="body2">{point.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Consign;
