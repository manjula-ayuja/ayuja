
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,CircularProgress
} from "@mui/material";
import axios from "axios";
import ayujalogo from "../../Logos/AuthScreens/AuthLogo.png";
import Footer from "../../Common/Footer";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRequest = process.env.REACT_APP_PASSWORD_REQUEST_API;
  const verifyOtp = process.env.REACT_APP_VERIFY_OTP_API;
  const passwordReset = process.env.REACT_APP_PASSWORD_RESET_API;



  const handleSendOtp = async () => {
    setLoading(true); 
    if (!identifier) return alert("Please enter your email or phone");

    try {
      const res = await axios.post(passwordRequest, {
        identifier,
      });

      if (res.data.success) {
        alert(res.data.message);
        setStep(2);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
    finally {
      setLoading(false); 
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true); 
    if (!otp) return alert("Enter OTP");

    try {
      const res = await axios.post(verifyOtp, {
        identifier,
        otp,
      });

      if (res.data.success) {
        alert("OTP Verified!");
        setStep(3);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    } finally {
      setLoading(false); 
    }
  };

  const handleResetPassword = async () => {
    setLoading(true); 
    if (!newPassword) return alert("Enter new password");

    try {
      const res = await axios.post(passwordReset, {
        identifier,
        newPassword,
      });

      if (res.data.success) {
        alert("Password reset successful!");
        setStep(1);
        setIdentifier("");
        setOtp("");
        setNewPassword("");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Password reset failed");
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
              justifyContent: "center",
              width: "40%",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Follow the steps below to reset your password
            </Typography>

            {/* Step 1: Enter Email/Phone */}
            {step === 1 && (
              <>
                <TextField
                  label="Email or Phone"
                  placeholder="Enter your registered email or phone"
                  fullWidth
                  margin="normal"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#007a85",
                    "&:hover": { backgroundColor: "#005f64" },
                    mt: 2,
                  }}
                  onClick={handleSendOtp}
                  disabled={loading} 
                >
                  
                   {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
                </Button>
              </>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <>
                <TextField
                  label="OTP"
                  placeholder="Enter the OTP"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#007a85",
                    "&:hover": { backgroundColor: "#005f64" },
                    mt: 2,
                  }}
                  onClick={handleVerifyOtp}
                  disabled={loading} 
                >
                  
                   {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
                </Button>
              </>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <>
                <TextField
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#007a85",
                    "&:hover": { backgroundColor: "#005f64" },
                    mt: 2,
                  }}
                  onClick={handleResetPassword}
                  disabled={loading} 
                >
                 
                   {loading ? <CircularProgress size={24} color="inherit" /> : " Reset Password"}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Card>
  
    </Box>
  <Footer/>
 </>
  );
};

export default ForgotPassword;
