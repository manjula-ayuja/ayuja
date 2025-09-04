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
import PhysiotherapyatHome from "../Logos/Nursing/PhysiotherapyatHome.png";
import Footer from "../Common/Footer"
const NursingPysiotherapyScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // parse JSON string into object
    }
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
                src={PhysiotherapyatHome}
                alt="Physiotherapy at Home"
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
              <Box ml={2}>
                <Typography fontSize={16} fontWeight={700} color="text.primary">
                NURSING & PHYSIOTHERAPY SERVICES
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
              serviceTitle: "NURSING & PHYSIOTHERAPY SERVICES",
              serviceImage: PhysiotherapyatHome,
            }}
          />
        </Paper>
      </Container>
      <Footer/>
    </>
  );
};

export default NursingPysiotherapyScreen;
