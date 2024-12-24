const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI; // Access MongoDB Atlas connection string

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import routes
const loginRoute = require("./routes/login");
const messagesRoute = require("./routes/messages");
const datesRoute = require("./routes/dates");

// Use routes
app.use("/api", loginRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/dates", datesRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
