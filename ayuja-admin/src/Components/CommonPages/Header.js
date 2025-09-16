

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ayujalogo from "../Logos/Ayuja_Logo.jpg";
import axios from "axios";
import { fetchUserFromRedis } from "../AuthonticationPages/Register";
const StyledAvatar = styled("div")`
  font-family: "Roboto";
  letter-spacing: 0.1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(232, 222, 248, 1);
  color: black;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50%;
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const logoutapi=process.env.REACT_APP_LOGOUT_API;

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
      if (!userId || !token) {
        setUser(null);
        return;
      }
      try {
        const userData = await fetchUserFromRedis(userId, token);
        setUser(userData || null);
      } catch (err) {
        console.error("Error fetching user from Redis:", err);
        setUser(null);
      }
    };
  
    fetchUser();
  }, [location]);
  

  const handleChange = (event, newValue) => {
    if (newValue !== null) setSelected(newValue);
  };



  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
  
      await fetch(`${logoutapi}/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      // Clear frontend session
      sessionStorage.clear();
      setUser(null);
      handleMenuClose();
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
      sessionStorage.clear();
      navigate("/Login");
    }
  };
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#153f4b" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" sx={{ mb: 3, mt: 3 }}>
          <img
            src={ayujalogo}
            alt="Ayuja Logo"
            width={150}
            height={48}
            style={{ marginRight: 10 }}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box>

          {/* User Menu */}
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
              {/* User Avatar */}
              <StyledAvatar>{user?.name?.charAt(0) || "U"}</StyledAvatar>
              <Typography
                variant="body1"
                sx={{ color: "#21005D", fontWeight: "bold", ml: 1.5 }}
              >
                {user.name}
              </Typography>

              {/* Profile Menu */}
              <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile-details");
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>

               
                {user?.role === "admin" && [
                  <MenuItem
                    key="complaints"
                    onClick={() => {
                      navigate("/complaints-dashboard");
                      handleMenuClose();
                    }}
                  >
                    Complaints
                  </MenuItem>,
                  <MenuItem
                    key="emergencies"
                    onClick={() => {
                      navigate("/emergency-dashboard");
                      handleMenuClose();
                    }}
                  >
                    Emergencies
                  </MenuItem>,
                ]}

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
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
                  },
                }}
              >
                Register
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
