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
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false } // Added the isAdmin field
});

const dateSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  hours: { type: String, default: "9:00AM - 6:45PM" } // Add the hours field
});

const RLdateSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  hours: { type: String, default: "9:00AM - 5:30PM" } // Add the hours field
});

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  datePosted: { type: Date, default: Date.now }
});

const DropOffHoursSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  hours: { type: String, required: true }
});

const DropOffHours = mongoose.model("DropOffHours", DropOffHoursSchema);

const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", userSchema);
const DateModel = mongoose.model("Date", dateSchema);
const RLDateModel = mongoose.model("RLDate", RLdateSchema);

// User login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Include the isAdmin field in the JWT payload
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    JWT_SECRET
  );
  res.json({ token });
});

/// User Registration with optional isAdmin field
app.post("/api/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false // Set isAdmin if provided, otherwise default to false
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: error.message });
  }
});

// Middleware to check token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Add user info (including isAdmin) to request
    console.log("Decoded user:", req.user); // Log the entire user object to check `isAdmin`
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

// Fetch crossed-off dates
app.get("/api/rldates", async (req, res) => {
  try {
    const dates = await RLDateModel.find({});
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/dates", authenticateToken, async (req, res) => {
  const { date, hours } = req.body;
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  try {
    const existingDate = await DateModel.findOne({ date });
    if (existingDate) {
      existingDate.hours = hours || existingDate.hours;
      await existingDate.save();
      res.json({ message: "Date updated for Manchester", date: existingDate });
    } else {
      const newDate = await DateModel.create({ date, hours });
      res.json({ message: "Date added for Manchester", date: newDate });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update crossed-off dates (Red Lion, protected)
app.post("/api/rldates", authenticateToken, async (req, res) => {
  const { date, hours } = req.body;
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  try {
    const existingDate = await RLDateModel.findOne({ date });
    if (existingDate) {
      existingDate.hours = hours || existingDate.hours;
      await existingDate.save();
      res.json({ message: "Date updated for Red Lion", date: existingDate });
    } else {
      const newDate = await RLDateModel.create({ date, hours });
      res.json({ message: "Date added for Red Lion", date: newDate });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/dates", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  const { date } = req.body;
  try {
    const existingDate = await DateModel.findOne({ date });
    if (!existingDate) {
      return res.status(404).json({ message: "Date not found" });
    }
    await DateModel.deleteOne({ date });
    res.json({ message: "Date removed for Manchester" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete crossed-off dates (Red Lion, protected)
app.delete("/api/rldates", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  const { date } = req.body;
  try {
    const existingDate = await RLDateModel.findOne({ date });
    if (!existingDate) {
      return res.status(404).json({ message: "Date not found" });
    }
    await RLDateModel.deleteOne({ date });
    res.json({ message: "Date removed for Red Lion" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all messages (public access)
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new message (admin access only)
app.post("/api/messages", authenticateToken, async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const newMessage = await Message.create({ content });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a message (admin access only)
app.delete("/api/messages/:id", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden" });
  }

  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a message (admin access only)
app.patch("/api/messages/:id", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden" });
  }

  const { content } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true } // Return the updated message
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing message (admin access only)
app.put("/api/messages/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    if (!updatedMessage)
      return res.status(404).json({ message: "Message not found" });
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
