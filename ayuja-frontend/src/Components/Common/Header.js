
import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ayujalogo from "../Logos/Ayuja_Logo.jpg"; 

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [selected, setSelected] = useState("");

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelected(newValue);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#153f4b" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" sx={{ mb: 3, mt: 3 }}>
          <img src={ayujalogo} alt="Ayuja Logo" width={150} height={48} style={{ marginRight: 10 }} />
        </Box>

        {/* Navigation Buttons */}
        <Box>
          <Button
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              color: isActive("/") ? "teal" : "#121212",
              fontWeight: isActive("/") ? "bold" : "normal",
              borderBottom: isActive("/") ? "2px solid teal" : "none",
            }}
          >
            Home
          </Button>

          <Button
            onClick={() => navigate("/services")}
            sx={{
              textTransform: "none",
              color: isActive("/services") ? "teal" : "#121212",
              fontWeight: isActive("/services") ? "bold" : "normal",
              borderBottom: isActive("/services") ? "2px solid teal" : "none",
            }}
          >
            Services
          </Button>

          <Button
            onClick={() => navigate("/aboutus")}
            sx={{
              textTransform: "none",
              color: isActive("/aboutus") ? "teal" : "#121212",
              fontWeight: isActive("/aboutus") ? "bold" : "normal",
              borderBottom: isActive("/aboutus") ? "2px solid teal" : "none",
            }}
          >
            About Us
          </Button>

          <Button
            onClick={() => navigate("/packages")}
            sx={{
              textTransform: "none",
              color: isActive("/packages") ? "teal" : "#121212",
              fontWeight: isActive("/packages") ? "bold" : "normal",
              borderBottom: isActive("/packages") ? "2px solid teal" : "none",
            }}
          >
            Packages
          </Button>

          <Button
            onClick={() => navigate("/contactus")}
            sx={{
              textTransform: "none",
              color: isActive("/contactus") ? "teal" : "#121212",
              fontWeight: isActive("/contactus") ? "bold" : "normal",
              borderBottom: isActive("/contactus") ? "2px solid teal" : "none",
            }}
          >
            Contact Us
          </Button>

          {/* Login/Register Toggle */}
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={handleChange}
            sx={{
              width: "150px",
              height: "35px",
              borderRadius: "30px",
              overflow: "hidden",
              border: "1px solid teal",
              ml: 2,
            }}
          >
            <ToggleButton
              value="login"
              onClick={() => navigate("/Login")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                px: 2,
                "&.Mui-selected": {
                  background: "linear-gradient(to right, seagreen, #22577A)",
                  color: "white",
                  "&:hover": { backgroundColor: "#00695c" },
                },
              }}
            >
              Login
            </ToggleButton>
            <ToggleButton
              value="register"
              onClick={() => navigate("/Register")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                px: 1,
                "&.Mui-selected": {
                  background: "linear-gradient(to right, seagreen, #22577A)",
                  color: "white",
                  "&:hover": { backgroundColor: "#00695c" },
                },
              }}
            >
              Register
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
