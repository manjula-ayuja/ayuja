import React from "react";
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
  InputAdornment,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ayujalogo from "../../Logos/Ayuja_Logo.jpg"
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
<Box
  sx={{
    minHeight: "100vh",  
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    m: 0,
  }}
>

      <Card sx={{borderRadius: "16px", overflow: "hidden" , backgroundColor: "red",}}>
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
              {/* <img
                src={ayujalogo}
                alt="Ayuja Logo"
                style={{ height: "40px", verticalAlign: "middle", marginRight: "8px" }}
              /> */}
              Ayuja
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Welcome Back to Ayuja
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Your trusted partner in personalized in-home care for every stage of life
            </Typography>

            {/* Features */}
            <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
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
                textAlign: "center",width:"50%"
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
                backgroundColor: "#007a85",
                "&:hover": { backgroundColor: "#005f64" },
                mb: 3,
              }}
            >
              Sign In
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
    </Box>
  );
};



export default Login;