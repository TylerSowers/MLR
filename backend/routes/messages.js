const express = require("express");
const Message = require("../models/Messages");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const newMessage = await Message.create({ content });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
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

router.put("/:id", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden" });
  }

  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
