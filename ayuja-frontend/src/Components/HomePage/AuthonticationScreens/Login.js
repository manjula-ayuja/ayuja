import React, { useState,useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,Dialog,
  DialogTitle,
  DialogContent,CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ayujalogo from "../../Logos/AuthScreens/AuthLogo.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Common/Footer";
import { fetchUserFromRedis } from "./Register";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginAPI = process.env.REACT_APP_LOGIN_API;

  const [user, setUser] = useState(null);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




const handleLogin = async () => {
  setLoading(true); 
  try {
    const res = await axios.post(loginAPI, formData);
    console.log("response in login ::",res)

    const userId = res.data.user.user_id;
    const token = res.data.token;
    // Save token
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId); 

    // Now fetch user from Redis
     const userData = await fetchUserFromRedis(userId, token); // pass userId & token explicitly
     console.log("User fetched from Redis after login:", userData);
 
     setUser(userData);

    // ✅ Role-based navigation
    const userRole = res.data.user.role;
    console.log("userRole::", userRole);

    if (userRole === "resident") {
      navigate("/services");
    } else {
      navigate("/"); 
    }

  } catch (err) {
    setError(err.response?.data || { message: "Login failed" });
    setOpenDialog(true);
  } finally {
    setLoading(false); 
  }
};



  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(null);
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

      <Card sx={{borderRadius: "16px", width: "50vw",}}>
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
              p: 4,width:"60%"
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
              Welcome <br/>
              Back to Ayuja
            </Typography>

            <Typography
              variant="h6"           
              sx={{mb: 2,textAlign: "center"}}>
              Your trusted partner in personalized in-home care for every stage of life
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

            {/* Emergency Support Box */}
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                p: 3,
                textAlign: "center",width:"50%",marginLeft:"100px"
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

          {/* Right Section */}
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
              Sign In
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Access your personalized care dashboard
            </Typography>

                        <TextField
              label="Email or Phone"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter email or 10-digit phone"
              fullWidth
              margin="normal"
            />

            {/* Password */}
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Button
                variant="text"
                sx={{ mt: 2, textTransform: "none" }}
                onClick={() => navigate("/ForgotPassword")}
              >
                Forgot Password?
              </Button>
            </Box>

            {/* Sign In button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#007a85","&:hover": { backgroundColor: "#005f64" },
                mb: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleLogin}
              disabled={loading} 
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Typography sx={{ textAlign: "center", mb: 2 }}>
              Don’t have an account?{" "}
              <a href="/Register" style={{ color: "#007a85", fontWeight: "bold" }}>
                Sign Up
              </a>
            </Typography>

            <Typography sx={{ textAlign: "center", mb: 2 }}>Or continue with</Typography>

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
      </Card>


<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Error</DialogTitle>
  <DialogContent>
    <Typography>{error?.message || "Login failed"}</Typography>
  </DialogContent>
  <Box sx={{ textAlign: "right", p: 1 }}>
    <Button onClick={handleCloseDialog}>Close</Button>
  </Box>
</Dialog>
    </Box>

<Footer/>
    </>

  );
};



export default Login;
