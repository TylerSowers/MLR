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
import Button from "@mui/material/Button";
import logo from "../media/logo.png";

const Navbar = ({ token, setToken }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Contact Us", link: "/contact" },
    { text: "About Us", link: "/about" },
    { text: "How It Works", link: "/" }
  ];

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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
            {token && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Button>
            )}
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
            top: 110,
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
            {token && (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
