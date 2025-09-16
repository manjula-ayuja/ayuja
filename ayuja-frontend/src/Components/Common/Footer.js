import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link,
  TextField,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";

// icons
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";

// logo

import ayujalogo from "../Logos/Ayuja_Logo.jpg";

const socialButtonStyle = {
  border: "1px solid #ccc",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#fff",
        color: "#153f4b",
        py: 6,
        fontSize: 14,
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={4}
          mb={4}
        >
          {/* Contact & Logo */}
          <Box sx={{ minWidth: 200 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 3, mt: 3 }}>
              <img
                src={ayujalogo}
                alt="Ayuja Logo"
                width={100}
                height={28}
                style={{ marginRight: 10 }}
              />
            </Box>
            <Typography variant="body2" mb={1}>
              Personalized Care, Trusted by Communities.
            </Typography>
            <Typography variant="body2" mb={2}>
              Call: +91 7661889977
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="twitter"
                component="a"
                href="https://x.com/ayuja_life"
                target="_blank"
                size="small"
                sx={{ ...socialButtonStyle }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="instagram"
                component="a"
                href="https://www.instagram.com/ayuja.life"
                target="_blank"
                size="small"
                sx={{ ...socialButtonStyle }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="facebook"
                component="a"
                href="https://www.facebook.com/ayuja.life"
                target="_blank"
                size="small"
                sx={{ ...socialButtonStyle }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="linkedin"
                component="a"
                href="https://www.linkedin.com/in/ayuja-lifecare-8a0892369/"
                target="_blank"
                size="small"
                sx={{ ...socialButtonStyle }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="telegram"
                component="a"
                href="https://t.me/ayuja_life"
                target="_blank"
                size="small"
                sx={{ ...socialButtonStyle }}
              >
                <TelegramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Explore */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Explore
            </Typography>
            <Stack spacing={1.5}>
              <Link
                component={NavLink}
                to="/services"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
                Services
              </Link>

              <Link
                component={NavLink}
                to="/aboutus"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
                About us
              </Link>

              <Link href="#" underline="hover" color="inherit">
                FAQs
              </Link>

              <Link
                component={NavLink}
                to="/contactus"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
                Contact us
              </Link>
            </Stack>
          </Box>
          
          {/* Legal */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Legal
            </Typography>
            <Stack spacing={1.5}>

              <Link
                component={NavLink}
                to="/privacy-policy"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
               Privacy Policy
              </Link>
    
              <Link
                component={NavLink}
                to="/terms&conditions"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
               Terms & Conditions
              </Link>

              <Link
                component={NavLink}
                // to="/documentation"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
                Documentation
              </Link>
              <Link
                component={NavLink}
                // to="/help-center"
                underline="hover"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "teal" : "inherit",
                })}
              >
                Help Center
              </Link>
            </Stack>
          </Box>

          {/* Subscribe */}
          <Box sx={{ minWidth: 220 }}>
            {/* <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Subscribe
            </Typography>
            <Typography variant="body2" mb={1}>
              Subscribe to get the latest news from us
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                maxWidth: 400,
                width: "100%",
              }}
            >
              <TextField
                size="small"
                placeholder="Your email"
                type="email"
                required
                sx={{
                  backgroundColor: "#E5FDCF",
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    backgroundColor: "#E5FDCF",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ mr: 1, color: "#0a9a92" }} />
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "20px",
                  px: 3,
                  ml: "-20%",
                  zIndex: 2,
                  backgroundColor: "#0a9a92",
                  textTransform: "none",
                }}
              >
                Subscribe
              </Button>
            </Box> */}
          </Box>
        </Stack>

        {/* Bottom Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4, px: 2 }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; 2025 Ayuja. All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              href="#"
              component={NavLink}
              to="/privacy-policy"
              underline="hover"
              color="text.secondary"
              variant="caption"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              component={NavLink}
              to="/terms&conditions"
              underline="hover"
              color="text.secondary"
              variant="caption"
            >
              Terms & Conditions
            </Link>
            <Link
              // href="#"
              underline="hover"
              color="text.secondary"
              variant="caption"
            >
              Accessibility
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
