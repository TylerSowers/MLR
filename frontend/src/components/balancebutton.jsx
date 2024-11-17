import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Container
} from "@mui/material";

const AccountBalanceButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      {/* Button to trigger Dialog */}
      <Container sx={{ textAlign: "center", mt: 4 }}>
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
            className="account-balance-button"
            color="primary"
            onClick={handleOpenDialog} // Open the Dialog when clicked
            sx={{
              padding: "16px 48px",
              fontSize: "18px",
              minWidth: "300px",
              borderRadius: "50px"
            }}
          >
            Check Your Account Balance
          </Button>
        </Box>
      </Container>

      {/* Dialog Box */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Check Your Account Balance</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Stack buttons vertically
              gap: 2, // Add spacing between buttons
              alignItems: "center" // Center the buttons
            }}
          >
            <Button
              className="account-balance-button"
              variant="contained"
              color="primary"
              href="http://mlr.peeps2go.com:9090/act?fbclid=IwAR0ZSa37tYvyTBDjP-Wkg0AWcIjvADZk_JJ4vqqieXQO8VOvOgSyN6EQkBE"
              target="_blank"
              sx={{ padding: "8px 24px" }}
            >
              MLR Manchester
            </Button>
            <Button
              className="account-balance-button"
              variant="contained"
              color="primary"
              href="http://mlr2.peeps2go.com:9090/act?fbclid=IwAR2X4wGN3BUk-eCQc4Wc3I8KCgLDq8mwgynbvsmW9d4Wa57HYOHBGIcFpdg"
              target="_blank"
              sx={{ padding: "8px 45px" }}
            >
              MLR Red Lion
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountBalanceButton;
