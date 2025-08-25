import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ayujalogo from "../../Logos/Ayuja_Logo.jpg";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = () => {
    if (!email) return alert("Please enter your email");
    console.log("Sending OTP to:", email);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");
    console.log("Verifying OTP:", otp);
    setStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword) return alert("Enter new password");
    console.log("Password reset for:", email, "→", newPassword);
    alert("Password reset successful!");
  };

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
              p: 4,
              width: "60%",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Ayuja
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Reset Your Password
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Securely reset your password to regain access to your personalized care dashboard.
            </Typography>

            {/* Info Box */}
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                p: 3,
                textAlign: "center",
                width: "60%",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Need Help?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                If you face issues resetting your password, please contact our 24/7 support team.
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
                Contact Support
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

            {/* Step 1: Enter Email */}
            {step === 1 && (
              <>
                <TextField
                  label="Email Address"
                  placeholder="Enter your registered email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                >
                  Send OTP
                </Button>
              </>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <>
                <TextField
                  label="OTP"
                  placeholder="Enter the OTP sent to your email"
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
                >
                  Verify OTP
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
                >
                  Reset Password
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
