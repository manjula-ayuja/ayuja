import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Paper,
  Avatar,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import CommonFieldsScreen from "./CommonFields"; 
import DoctorVisitPickupDrop from "../Logos/DoctorVisitPickUP/DoctorVisitPickupDrop.png";
import Footer from "../Common/Footer";
import { fetchUserFromRedis } from "../HomePage/AuthonticationScreens/Register";
const DoctorVisitPickupDropScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      // Try to get latest user from sessionStorage
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      // Always fetch fresh data from Redis if token exists
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
      if (!userId || !token) return;

      try {
        const userData = await fetchUserFromRedis(userId, token);
        if (userData) {
          setUser(userData);
          sessionStorage.setItem("user", JSON.stringify(userData)); // update sessionStorage
        }
      } catch (err) {
        console.error("Error fetching user from Redis:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <>
      {/* Top Navigation */}
  

      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {/* Header */}
          <Box mb={3}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box display="flex" alignItems="center" mt={4}>
              <Avatar
                src={DoctorVisitPickupDrop}
                alt="DOCTOR VISIT, PICKUP & DROP"
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
              <Box ml={2}>
                <Typography fontSize={16} fontWeight={700} color="text.primary">
                DOCTOR VISIT, PICKUP & DROP
                </Typography>
                <Typography
                  fontSize={12}
                  color="text.secondary"
                  mt={0.5}
                  sx={{ maxWidth: 220 }}
                >
                  Ayuja Will Choose Right People For The Timing Of Your Selection
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Form Section */}
          <CommonFieldsScreen
            serviceData={{
              serviceTitle: "DOCTOR VISIT, PICKUP & DROP",
              serviceImage: DoctorVisitPickupDrop,
            }}
          />
        </Paper>
      </Container>
      <Footer/>
    </>
  );
};

export default DoctorVisitPickupDropScreen;