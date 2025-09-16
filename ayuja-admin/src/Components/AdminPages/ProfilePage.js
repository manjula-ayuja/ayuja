
import React, { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, Avatar, IconButton, TextField, Button,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  Link, InputAdornment
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { fetchUserFromRedis } from "../AuthonticationPages/Register";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({ new_password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

  const getuserDetailsAPI = process.env.REACT_APP_GET_USER_DETAILS_API;
  const updateProfileAPI = process.env.REACT_APP_UPDATE_USER_PROFILE_API;
  const changePasswordAPI = process.env.REACT_APP_CHANGE_PASSWORD_API;

  useEffect(() => {
    const fetchAndSetUser = async () => {
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");

      if (!userId || !token) {
        setUser(null);
        return;
      }
      try {
        const userData = await fetchUserFromRedis(userId, token);
        if (userData) {
          setUser(userData);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user from Redis:", err);
        setUser(null);
      }
    };

    fetchAndSetUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const res = await fetch(getuserDetailsAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
          });
        } else {
          setSnackbar({ open: true, message: data.error, severity: "error" });
        }
      } catch (err) {
        setSnackbar({ open: true, message: "Failed to fetch user data!", severity: "error" });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(updateProfileAPI, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setEditMode(false);
        setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.error, severity: "error" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Something went wrong!", severity: "error" });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      setSnackbar({ open: true, message: "Passwords do not match!", severity: "error" });
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(changePasswordAPI, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      if (res.ok) {
        setSnackbar({ open: true, message: "Password updated successfully!", severity: "success" });
        setPasswordDialog(false);
        setPasswordData({ new_password: "", confirm_password: "" });
      } else {
        setSnackbar({ open: true, message: data.error, severity: "error" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Something went wrong!", severity: "error" });
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, mb: 10 }}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: "#F2FFF5" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: "#006D77", fontSize: "40px", textAlign: "center", mb: 5 }}>Profile</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80, fontSize: 32 }}>
              {formData.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6"></Typography>
            <IconButton onClick={() => setEditMode(!editMode)}>
              <EditIcon />
            </IconButton>
          </Box>

          <CardContent>
            {editMode ? (
              <>
                <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" />

                <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#006D77" }} onClick={handleSaveProfile}>Save Changes</Button>
              </>
            ) : (
              <>
                <Typography><strong>Name:</strong> {user?.name}</Typography>
                <Typography><strong>Email:</strong> {user?.email}</Typography>
                <Typography><strong>Phone:</strong> {user?.phone}</Typography>
                <Typography><strong>Address:</strong> {user?.address}</Typography>
              </>
            )}

            <Box sx={{ mt: 3 }}>
              <Link component="button" underline="always" onClick={() => setPasswordDialog(true)} sx={{ color: "#006D77" }}>
                Change Password
              </Link>
            </Box>
          </CardContent>
        </Card>

        {/* Password Dialog */}
        <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)}>
          <DialogTitle sx={{ color: "#006D77" }}>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              label="New Password"
              name="new_password"
              type={showPassword.new ? "text" : "password"}
              fullWidth
              margin="normal"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}>
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              name="confirm_password"
              type={showPassword.confirm ? "text" : "password"}
              fullWidth
              margin="normal"
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}>
                      {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialog(false)} sx={{ color: "#006D77" }}>Cancel</Button>
            <Button variant="contained" onClick={handleChangePassword} sx={{ backgroundColor: "#006D77" }}>Update</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>

    </>
  );
};

export default ProfilePage;
