import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer"
// Import your images

import DiagnosticSample from "../Logos/DiagnoisticDelivery/DiagnosticSampleCollection.png";
import DoctorVisitPickupDrop from "../Logos/DoctorVisitPickUP/DoctorVisitPickupDrop.png";
import ElderlyCare from "../Logos/Elder&childcarePage/ElderlyCare.png";
import EmergencyCareSupport from "../Logos/EmergencyCareSupport/EmergencyCareSupport.png";
import ForSeniors from "../Logos/SocialWellness/ForSeniors.png";
import PhysiotherapyatHome from "../Logos/Nursing/PhysiotherapyatHome.png";

const services = [
  {
    id: "1",
    title: "ELDERLY AND CHILDCARE",
    time: "DEC 12, 9:00 AM",
    image: ElderlyCare,
    screen: "/elder-child-care",
  },
  {
    id: "2",
    title: "NURSING & PHYSIOTHERAPY SERVICES",
    time: "DEC 12, 9:30 AM",
    image: PhysiotherapyatHome,
    screen: "/nursingPhysiotherapy",
  },
  {
    id: "3",
    title: "MEDICINE & DIAGNOSTIC DELIVERY",
    time: "DEC 12, 9:00 AM",
    image: DiagnosticSample,
    screen: "/medicine-diagnostic",
  },
  {
    id: "4",
    title: "EMERGENCY CARE SUPPORT",
    time: "DEC 12, 9:00 AM",
    image: EmergencyCareSupport,
    screen: "/emergency-care",
  },
  {
    id: "5",
    title: "DOCTOR VISIT, PICKUP & DROP",
    time: "DEC 12, 9:00 AM",
    image: DoctorVisitPickupDrop,
    screen: "/doctor-visit",
  },
  {
    id: "6",
    title: "SOCIAL WELLNESS ACTIVITIES",
    time: "DEC 12, 9:00 AM",
    image: ForSeniors,
    screen: "/social-wellness",
  },
];

const ServiceSelectionScreen = () => {
  const navigate = useNavigate();

  return (
    <>
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "600", color: "#22577A", mb: 4, mt: 2 }}
      >
        Please Select Services
      </Typography>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} key={service.id}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer",
              }}
              onClick={() => navigate(service.screen)}
            >
              <CardContent sx={{ flex: 1, pr: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "700", color: "#22577A", mb: 1 }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", color: "text.secondary" }}
                >
                  NEXT AVAILABLE TIME
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {service.time}
                </Typography>
              </CardContent>

              <CardMedia
                component="img"
                image={service.image}
                alt={service.title}
                sx={{ width: 80, height: 80, objectFit: "contain" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    <Footer/>
    </>
  );
};

export default ServiceSelectionScreen;
