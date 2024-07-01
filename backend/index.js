const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET; // Access the secret key from environment variables
const MONGODB_URI = process.env.MONGODB_URI; // Access MongoDB Atlas connection string

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const dateSchema = new mongoose.Schema({
  date: { type: Date, required: true }
});

const User = mongoose.model("User", userSchema);
const DateModel = mongoose.model("Date", dateSchema);

// User registration (for setup, not included in final app)
// app.post("/api/register", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   await User.create({ username, password: hashedPassword });
//   res.json({ message: "User registered" });
// });

// User login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});

// Middleware to check token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Fetch crossed-off dates
app.get("/api/dates", async (req, res) => {
  try {
    const dates = await DateModel.find({});
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update crossed-off dates (protected)
app.post("/api/dates", authenticateToken, async (req, res) => {
  const { date } = req.body;
  try {
    const existingDate = await DateModel.findOne({ date });
    if (existingDate) {
      await DateModel.deleteOne({ date });
    } else {
      await DateModel.create({ date });
    }
    res.json({ message: "Date updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
