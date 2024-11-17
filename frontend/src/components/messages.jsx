import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountBalanceButton from "./balancebutton"; // Adjust the path as needed

import "./messages.css";

const Message = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://mlr-backend.vercel.app/api/messages",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleAddMessage = async () => {
    try {
      await axios.post(
        "https://mlr-backend.vercel.app/api/messages",
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      await axios.delete(
        `https://mlr-backend.vercel.app/api/messages/${messageToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchMessages();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleEditMessage = async () => {
    try {
      await axios.patch(
        `https://mlr-backend.vercel.app/api/messages/${editMessageId}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      fetchMessages();
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent("");
    setEditMessageId(null);
  };

  const handleOpenDeleteDialog = (message) => {
    setMessageToDelete(message);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setMessageToDelete(null);
  };

  return (
    <div className="customer-messages-container">
      {/* Title for the message list */}
      <h2 className="announcements-title">Announcements</h2>

      {/* Add the Account Balance Button */}
      <AccountBalanceButton />

      {/* Rest of the component */}
      <ul>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message._id} className="message-item">
              {isEditing && editMessageId === message._id ? (
                <div>
                  <TextField
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    label="Edit Message"
                    variant="outlined"
                    fullWidth
                  />
                  <Button onClick={handleEditMessage}>Save</Button>
                  <IconButton onClick={handleCancelEdit}>
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <span>{message.content}</span>
                  {token && (
                    <>
                      <IconButton
                        onClick={() => {
                          setIsEditing(true);
                          setEditMessageId(message._id);
                          setEditContent(message.content);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteDialog(message)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </ul>

      {/* Additional token-dependent content */}
      {token && (
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleAddMessage}>Add Message</button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Message</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this message?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteMessage} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Message;
