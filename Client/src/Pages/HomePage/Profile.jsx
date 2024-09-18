import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import UploadFileForm from "./upload";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    profile_picture: "",
  });
  const [editing, setEditing] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const public_id = localStorage.getItem("public_id");
  console.log("public_id from localStorage:", public_id); // Add this line for debugging
  useEffect(() => {
    if (public_id) {
      fetch(`https://e-learning-platform-1-10z1.onrender.com/profile/${public_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Profile data:", data); // Add this for debugging
          setUser(data);
        })
        .catch((error) => console.error("Error fetching user profile:", error));
    }
  }, []);

  const handleUpdateField = () => {
    // const { profile_picture, ...sent_user } = user;
    const { email, bio, username } = user;

    const putData = { email, bio, username };

    fetch(`https://e-learning-platform-1-10z1.onrender.com/profile/${public_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        setEditing(false);
      })
      .catch((error) => console.error("Error updating user profile:", error));
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "white",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  };

  return (
    <Paper elevation={3} style={containerStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Times New Roman",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          USER PROFILE
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationEnabled}
              onChange={handleNotificationToggle}
              color="primary"
            />
          }
          label="Enable Notifications"
        />
      </div>
      {user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={user.profile_picture}
            alt="Profile"
            sx={{
              width: 170,
              height: 170,
              marginTop: "20px",
              marginBottom: "1px",
            }}
          />
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Username:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="username"
                value={user.username || ""}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.username}</Typography>
            )}
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Email:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.email}</Typography>
            )}
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Bio:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="tel"
                value={user.bio || ""}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.bio}</Typography>
            )}
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            {editing ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateField}
                  style={{ marginTop: "10px" }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditing(true)}
                  style={{ marginTop: "10px" }}
                  className="submit-button"
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading student profile...</div>
      )}
      <UploadFileForm />
    </Paper>
  );
};

export default Profile;
