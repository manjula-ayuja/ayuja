

import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,Checkbox,
  Alert,CircularProgress,FormControlLabel
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ayujalogo from "../../Logos/AuthScreens/AuthLogo.png";
import Footer from "../../Common/Footer"
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const signupAPI = process.env.REACT_APP_REGISTER_URL;
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


// Handle form submit
const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post(signupAPI, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    });
    console.log("response in register ::",response)
    if (response.data.success) {
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });

      // Save token & user in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      // ✅ Role-based navigation
      const userRole = response.data.user.role; 
      console.log("userRole::",userRole)
      if (userRole === "resident") {
        navigate("/services");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "superadmin") {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/"); 
      }
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Something went wrong. Please try again.";
    setSnackbar({ open: true, message: errorMessage, severity: "error" });
  } finally {
    setLoading(false);
  }
};

  return (
    <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
          }}
        >
      <Card sx={{ borderRadius: "16px",width: "50vw", }}>
        <Grid container>
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #004f54, #007a85, #007a85)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,
              width: "50%",
            }}
          >
          <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",mb: 2, }}>
            <img
              src={ayujalogo}
              alt="Ayuja Logo"
              style={{
                height: "80px",      
                width: "auto",
                display: "block",
              }}
            />
          </Box>
             <Typography
               variant="h4"           
               sx={{fontWeight: "bold",mb: 2,textAlign: "center"}}>
               Join <br/>
               Ayuja Today
             </Typography>


          <Typography
              variant="h6"           
              sx={{mb: 2,textAlign: "center"}}>
                  Transform lives through personalized in-home care.  
                  Become part of a community that values compassion, dignity, and exceptional service.
            </Typography>

            {/* Features */}
            <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",gap: 3, mb: 4 }}>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                ✅ 24/7 Support
              </Typography><br/>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                ✅ Certified Caregivers
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                p: 3,
                textAlign: "center",width:"60%",marginLeft:"80px"
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Emergency Support Available
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Need immediate assistance? Our emergency support team is available 24/7 to help you
                and your loved ones.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#80ED99",
                  "&:hover": { backgroundColor: "#80ED99" },
                  color: "#22577A",
                 textTransform:"none",
                  borderRadius: "8px",
                }}
              >
                Contact Emergency
              </Button>
            </Box>
          </Grid>

          {/* Right Section (Sign Up Form) */}

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: "white",
              p: 4,
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                Create Account
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                Get started with your personalized care dashboard
              </Typography>

              {/* Name */}
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                fullWidth
                margin="normal"
                required
              />

              {/* Email */}
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                fullWidth
                margin="normal"
                required
              />

              {/* Mobile */}
              <TextField
                label="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  // Only allow digits, max 10
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData({ ...formData, phone: value });
                }}
                placeholder="Enter 10-digit mobile number"
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
              />

              {/* Password */}
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                fullWidth
                required
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                fullWidth
                required
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Role */}
              <TextField
                select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                label="User Category"
              >
                <MenuItem value="" disabled>
                  <em>Select a value</em>
                </MenuItem>
                <MenuItem value="resident">Resident</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="superadmin">Super Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="other">Others</MenuItem>
              </TextField>

              {/* Register Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#007a85",
                  "&:hover": { backgroundColor: "#005f64" },
                  mt: 2,
                  mb: 3,
                }}
                disabled={loading} 
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
              </Button>
  
          <FormControlLabel control={<Checkbox />} required label="Accept Ayuja's Terms and Conditions" />
            </form>

            <Typography sx={{ textAlign: "center", mb: 2 }}>
              Already have an account?{" "}
              <a href="/Login" style={{ color: "#007a85", fontWeight: "bold" }}>
                Sign In
              </a>
            </Typography>

            <Typography sx={{ textAlign: "center", mb: 2 }}>Or sign up with</Typography>

            {/* Social Logins */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ borderRadius: "8px" }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
                sx={{ borderRadius: "8px" }}
              >
                Facebook
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* </Grid> */}
      </Card>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    <Footer/>
    </>
  );
};

export default Register;
