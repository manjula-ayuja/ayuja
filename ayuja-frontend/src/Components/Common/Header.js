
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    if (newValue !== null) setSelected(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    handleMenuClose();
    navigate("/Login");
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
            onClick={() => navigate(user ? "/services" : "/serviceweprovide")} 
            sx={{
              textTransform: "none",
              color: isActive(user ? "/services" : "/serviceweprovide")
                ? "teal"
                : "#121212",
              fontWeight: isActive(user ? "/services" : "/serviceweprovide")
                ? "bold"
                : "normal",
              borderBottom: isActive(user ? "/services" : "/serviceweprovide")
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

          {/* ✅ Conditional rendering */}
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", ml: 50 }}>
              <StyledAvatar>{user?.name?.charAt(0) || "U"}</StyledAvatar>
              <Typography
                variant="body1"
                sx={{ color: "#21005D", fontWeight: "bold", ml: 1.5 }}
              >
                {user.name}
              </Typography>

              {/* ✅ Profile Menu */}
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
                <MenuItem
                  onClick={() => {
                    navigate("/sos");
                    handleMenuClose();
                  }}
                >
                  SOS
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/raise-complaint");
                    handleMenuClose();
                  }}
                >
                  Raise Complaint
                </MenuItem>
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
