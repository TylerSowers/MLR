// src/components/Consign.jsx

import React from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import Calendar from "./calendar";

const Consign = () => {
  const policyPoints = [
    {
      text: (
        <>
          <strong>Walk-In Days/Times: </strong> Mondays 9-4 & Wednesdays 9-6:45.{" "}
          <strong>30 Item Limit</strong>
        </>
      )
    },
    {
      text: (
        <>
          <strong>How the Money works:</strong> Once an item sells, you will get
          50% of the selling price. Your money can be used as store credit to
          purchase items any time. You may cash your account once a month ONLY
          BETWEEN the <strong>15th - 20th</strong> of the month. Amounts over
          $30 will be issued a check, under $30 will be given cash.
        </>
      )
    },
    {
      text: (
        <>
          <strong>The Consignment Period:</strong> All items remain on the floor
          for <strong>90 days.</strong> After this time items that have not sold
          become property of MLR Consignment and may be donated to local
          churches in the area. Items priced over <strong>$25</strong> may be
          requested to pick up at the end of the consignment period with a 48
          hour notice.
        </>
      )
    },
    {
      text: (
        <>
          <strong>Prepare Items: </strong> All clothing must be freshly
          laundered within the last 48 hours prior to bringing your items in. We
          recommend laying your items flat in a plastic tub or basket after
          washing them to reduce wrinkles. NO GARBAGE BAGS or Boxes PLEASE!
        </>
      )
    },
    {
      text: (
        <>
          <strong>Limitations: </strong> 30 item limit on walk in days. We do
          not have a limit on large items such as furniture and baby gear. You
          may send a photo of large items to our Facebook/Email for
          pre-approval. Final approval will be given once the item is physically
          seen.
        </>
      )
    },

    {
      text: (
        <>
          <strong>Baby Clothing: </strong>Must be newer styles within the past 2
          years. Please make sure you pair infant sets together (no pins
          please). No partial sets accepted. Onesies should be paired together
          in sets of 2 or more, same size and brand.
        </>
      )
    },

    {
      text: (
        <>
          <strong>Baby Equipment: </strong> such as swings, strollers, walkers,
          highchairs, etc. must be cleaned and meet current CDC and our safety
          guidelines. These items should be less than 5 years old. We DO NOT
          ACCEPT Car seats, Bathtubs, or Cribs.
        </>
      )
    },
    {
      text: (
        <>
          <strong>Toys:</strong> Must be less than 4 years old, cleaned and have
          working batteries.
        </>
      )
    },
    {
      text: (
        <>
          <strong>Seasons: </strong> Spring/Summer: January-June 14th
          Fall/Winter: July December 14th
        </>
      )
    }
  ];

  return (
    <Container>
      <Calendar />
      <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          Consignment Policy
        </Typography>
        <Typography variant="body1" component="div">
          **Walk in days/dates subject to change. Calendar updated the 1st of
          each month**
        </Typography>
        <List>
          {policyPoints.map((point, index) => (
            <ListItem key={index}>
              <ListItemText primary={point.text} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body1" component="div">
          **Consignment policy subject to change**
        </Typography>
      </Paper>
    </Container>
  );
};

export default Consign;
