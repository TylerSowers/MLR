// src/components/Navbar.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import logo from "../media/logo.png"; // Adjust the path as needed

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Contact Us", link: "/contact" },
    { text: "About Us", link: "/about" },
    { text: "Consign", link: "/" }
    //{ text: "Login", link: "/login" }
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3794fe", height: 110 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
            padding: "0 20px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              sx={{ height: 90, marginRight: 2 }}
              alt="Logo"
              src={logo}
            />
            <Typography
              variant="h4"
              sx={{ marginLeft: 1, color: "#c8e066", fontWeight: "bold" }}
            >
              MLR
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <Typography variant="h6">
                  <Link
                    to={item.link}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {item.text}
                  </Link>
                </Typography>
                {index < menuItems.length - 1 && (
                  <Divider orientation="vertical" flexItem />
                )}
              </React.Fragment>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "auto",
            top: 110, // Adjust the top offset if needed
            backgroundColor: "#3794fe"
          }
        }}
      >
        <Box
          sx={{ width: "100%" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <ListItem button component={Link} to={item.link}>
                  <ListItemText primary={item.text} />
                </ListItem>
                {index < menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
