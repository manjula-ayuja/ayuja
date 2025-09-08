
import React, { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, Avatar, IconButton, TextField, Button,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  Link, InputAdornment, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Footer from "../../Common/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergency_contacts: [{ name: "", phone: "" }],
    family_members: [{ name: "", relation: "" }],
    documents: [{ type: "", number: "" }],
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({ new_password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

  const getuserDetailsAPI = process.env.REACT_APP_GET_USER_DETAILS_API;
  const updateProfileAPI = process.env.REACT_APP_UPDATE_USER_PROFILE_API;
  const changePasswordAPI = process.env.REACT_APP_CHANGE_PASSWORD_API;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedStoredUser = JSON.parse(storedUser);
  
      // Merge storedUser into current user state, including role
      setUser(prevUser => ({
        ...prevUser,
        ...parsedStoredUser,  // this includes role
      }));
  
      // Update formData as well
      setFormData(prevFormData => ({
        ...prevFormData,
        name: parsedStoredUser.name || prevFormData.name,
        email: parsedStoredUser.email || prevFormData.email,
        phone: parsedStoredUser.phone || prevFormData.phone,
        address: parsedStoredUser.address || prevFormData.address,
        emergency_contacts: parsedStoredUser.emergency_contacts || prevFormData.emergency_contacts,
        family_members: parsedStoredUser.family_members || prevFormData.family_members,
        documents: parsedStoredUser.documents || prevFormData.documents,
      }));
    }
  }, []);
  


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
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
          const emergency_contacts = data.user.emergency_contacts?.map(c => {
            if (typeof c === "string") {
              const [name, phone] = c.split(":");
              return { name, phone };
            }
            return c;
          }) || [{ name: "", phone: "" }];

          const family_members = data.user.family_members?.map(m => {
            if (typeof m === "string") {
              const [name, relation] = m.split(":");
              return { name, relation };
            }
            return m;
          }) || [{ name: "", relation: "" }];

          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            emergency_contacts,
            family_members,
            documents: data.user.documents || [{ type: "", number: "" }],
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

  // Emergency Contacts
  const handleEmergencyChange = (index, field, value) => {
    const updated = [...formData.emergency_contacts];
    updated[index][field] = value;
    setFormData({ ...formData, emergency_contacts: updated });
  };

  // Family Members
  const handleFamilyChange = (index, field, value) => {
    const updated = [...formData.family_members];
    updated[index][field] = value;
    setFormData({ ...formData, family_members: updated });
  };

  // Documents
  const handleDocumentChange = (index, field, value) => {
    const updated = [...formData.documents];
    updated[index][field] = value;
    setFormData({ ...formData, documents: updated });
  };

  // Document Validation
  const validateDocument = (type, number) => {
    if (type === "Aadhar") return /^\d{12}$/.test(number);
    if (type === "PAN") return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number);
    return true;
  };

  const handleSaveProfile = async () => {
    for (const doc of formData.documents) {
      if (!validateDocument(doc.type, doc.number)) {
        setSnackbar({ open: true, message: `${doc.type} number is invalid!`, severity: "error" });
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(updateProfileAPI, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
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
      const token = localStorage.getItem("token");
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

                {user?.role == "admin" && (
                  <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Emergency Contacts</Typography>
                    {formData.emergency_contacts.map((c, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: 2, mt: 1 }}>
                        <TextField label="Name" value={c.name} onChange={(e) => handleEmergencyChange(idx, "name", e.target.value)} fullWidth />
                        <TextField label="Phone" value={c.phone} onChange={(e) => handleEmergencyChange(idx, "phone", e.target.value)} fullWidth />
                      </Box>
                    ))}
                    <Button sx={{ color: "#006D77" }} onClick={() => setFormData({ ...formData, emergency_contacts: [...formData.emergency_contacts, { name: "", phone: "" }] })}>+ Add Contact</Button>

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Family Members</Typography>
                    {formData.family_members.map((m, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: 2, mt: 1 }}>
                        <TextField label="Name" value={m.name} onChange={(e) => handleFamilyChange(idx, "name", e.target.value)} fullWidth />
                        <TextField label="Relation" value={m.relation} onChange={(e) => handleFamilyChange(idx, "relation", e.target.value)} fullWidth />
                      </Box>
                    ))}
                    <Button sx={{ color: "#006D77" }} onClick={() => setFormData({ ...formData, family_members: [...formData.family_members, { name: "", relation: "" }] })}>+ Add Member</Button>

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Documents</Typography>
                    {formData.documents.map((d, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: 2, mt: 1 }}>
                        <TextField select label="Type" value={d.type} onChange={(e) => handleDocumentChange(idx, "type", e.target.value)} fullWidth>
                          <MenuItem value="Aadhar">Aadhar</MenuItem>
                          <MenuItem value="PAN">PAN</MenuItem>
                        </TextField>
                        <TextField label="Number" value={d.number} onChange={(e) => handleDocumentChange(idx, "number", e.target.value)} fullWidth />
                      </Box>
                    ))}
                    <Button sx={{ color: "#006D77" }} onClick={() => setFormData({ ...formData, documents: [...formData.documents, { type: "Aadhar", number: "" }] })}>+ Add Document</Button>
                  </>
                )}

                <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#006D77" }} onClick={handleSaveProfile}>Save Changes</Button>
              </>
            ) : (
              <>
                <Typography><strong>Name:</strong> {user?.name}</Typography>
                <Typography><strong>Email:</strong> {user?.email}</Typography>
                <Typography><strong>Phone:</strong> {user?.phone}</Typography>
                <Typography><strong>Address:</strong> {user?.address}</Typography>

                {user?.role == "admin" && (
                  <>
                    <Typography sx={{ mt: 2 }}><strong>Emergency Contacts:</strong></Typography>
                    {formData.emergency_contacts.map((c, i) => (
                      <Typography key={i}>• {c.name} ({c.phone})</Typography>
                    ))}

                    <Typography sx={{ mt: 2 }}><strong>Family Members:</strong></Typography>
                    {formData.family_members.map((m, i) => (
                      <Typography key={i}>• {m.name} - {m.relation}</Typography>
                    ))}

                    <Typography sx={{ mt: 2 }}><strong>Documents:</strong></Typography>
                    {formData.documents.map((d, i) => (
                      <Typography key={i}>• {d.type}: {d.number}</Typography>
                    ))}
                  </>
                )}
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
      <Footer />
    </>
  );
};

export default ProfilePage;
