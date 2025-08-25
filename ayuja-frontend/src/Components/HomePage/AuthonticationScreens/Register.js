import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
<Box
  sx={{
    height: "100vh",     
    width: "100vw",      
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    m: 0,                 
    position: "fixed",   
    left: 0,
  }}
>
      <Card sx={{ borderRadius: "16px", overflow: "hidden" }}>
        <Grid container>
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #007a85, #004f54)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,width:"60%"
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Ayuja
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Join Ayuja Today
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Transform lives through personalized in-home care.  
              Become part of a community that values compassion, dignity, and exceptional service.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
              <Typography variant="body2">✅ Trusted Care</Typography>
              <Typography variant="body2">✅ 24/7 Support</Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                p: 3,
                textAlign: "center",width:"60%"
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
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                  color: "white",
                  fontWeight: "bold",
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
              justifyContent: "center",width:"40%"
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Get started with your personalized care dashboard
            </Typography>

            {/* Name */}
            <TextField
              label="Full Name"
              placeholder="Enter your full name"
              fullWidth
              margin="normal"
            />

            {/* Email */}
            <TextField
              label="Email Address"
              placeholder="Enter your email address"
              fullWidth
              margin="normal"
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              fullWidth
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
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              fullWidth
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

            {/* Register Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#007a85",
                "&:hover": { backgroundColor: "#005f64" },
                mt: 2,
                mb: 3,
              }}
            >
              Sign Up
            </Button>

            <Typography sx={{ textAlign: "center", mb: 2 }}>
              Already have an account?{" "}
              <a href="/Login" style={{ color: "#007a85", fontWeight: "bold" }}>
                Sign In
              </a>
            </Typography>

            <Typography sx={{ textAlign: "center", mb: 2 }}>Or sign up with</Typography>

            {/* Social Logins */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ borderRadius: "8px" }}>
                Google
              </Button>
              <Button variant="outlined" fullWidth startIcon={<FacebookIcon />} sx={{ borderRadius: "8px" }}>
                Facebook
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};



export default Register;