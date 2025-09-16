

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
import { fetchUserFromRedis } from "../../Components/HomePage/AuthonticationScreens/Register";
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
  

  const EMERGENCY_API = process.env.REACT_APP_EMERGENCY_API;

  const handleRaiseEmergency = async () => {
    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const geo_location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          const res = await axios.post(`${EMERGENCY_API}`, {
            resident_id: user.user_id,
            geo_location,
          });

          alert(res.data.message);
        },
        (err) => {
          alert("Unable to fetch location. Please enable GPS.");
          console.error(err);
        }
      );
    } catch (err) {
      console.error("Error raising emergency:", err);
      alert("Failed to raise emergency");
    }
  };

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

  const isActive = (path) => location.pathname === path;

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
  onClick={() =>
    navigate(
      user?.role === "resident" ? "/services" : "/serviceweprovide"
    )
  }
  sx={{
    textTransform: "none",
    color:
      isActive(
        user?.role === "resident" ? "/services" : "/serviceweprovide"
      )
        ? "teal"
        : "#121212",
    fontWeight:
      isActive(
        user?.role === "resident" ? "/services" : "/serviceweprovide"
      )
        ? "bold"
        : "normal",
    borderBottom:
      isActive(
        user?.role === "resident" ? "/services" : "/serviceweprovide"
      )
        ? "2px solid teal"
        : "none",
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

          {/* <Button
            onClick={() => navigate("/packages")}
            sx={{
              textTransform: "none",
              color: isActive("/packages") ? "teal" : "#121212",
              fontWeight: isActive("/packages") ? "bold" : "normal",
              borderBottom: isActive("/packages") ? "2px solid teal" : "none",
            }}
          >
            Packages
          </Button> */}

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

          {/* Resident-only SOS button */}
          {user?.role === "resident" && (
            <IconButton
              onClick={() => {
                const confirmEmergency = window.confirm(
                  " Are you sure you want to raise an emergency?"
                );
                if (confirmEmergency) {
                  handleRaiseEmergency();
                }
              }}
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                width: 40,
                height: 40,
                borderRadius: "50%",
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              SOS
            </IconButton>
          )}

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

                {user?.role === "resident" && [
                    <MenuItem
                      key="book -appointment"
                      onClick={() => {
                        navigate("/book-appointment");
                        handleMenuClose();
                      }}
                    >
                      Book An Appointment
                  </MenuItem>,
                  <MenuItem
                    key="my-bookings"
                    onClick={() => {
                      navigate("/my-bookings");
                      handleMenuClose();
                    }}
                  >
                    My Bookings
                  </MenuItem>,
                  <MenuItem
                    key="my-complaints"
                    onClick={() => {
                      navigate("/my-complaints");
                      handleMenuClose();
                    }}
                  >
                    My Complaints
                  </MenuItem>,
                  <MenuItem
                  key="sos"
                  onClick={() => {
                    const confirmEmergency = window.confirm(
                      "Are you sure you want to raise an emergency?"
                    );
                    if (confirmEmergency) {
                      handleRaiseEmergency();
                    }
                  }}
                  
                  >
                  SOS
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
              // sx={{
              //   width: "150px",
              //   height: "35px",
              //   borderRadius: "30px",
              //   overflow: "hidden",
              //   border: "1px solid teal",
              //   ml: 2,
              // }}
            >
              {/* <ToggleButton
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
              </ToggleButton> */}
            </ToggleButtonGroup>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
