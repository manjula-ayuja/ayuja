

import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../Common/Footer";

// Import your images
import DiagnosticSample from "../../Logos/DiagnoisticDelivery/DiagnosticSampleCollection.png";
import DoctorVisitPickupDrop from "../../Logos/DoctorVisitPickUP/DoctorVisitPickupDrop.png";
import ElderlyCare from "../../Logos/Elder&childcarePage/ElderlyCare.png";
import EmergencyCareSupport from "../../Logos/EmergencyCareSupport/EmergencyCareSupport.png";
import ForSeniors from "../../Logos/SocialWellness/ForSeniors.png";
import PhysiotherapyatHome from "../../Logos/Nursing/PhysiotherapyatHome.png";

const services = [
  { id: "1", title: "ELDERLY AND CHILDCARE", image: ElderlyCare, screen: "/elder-childcare" },
  { id: "2", title: "NURSING & PHYSIOTHERAPY SERVICES", image: PhysiotherapyatHome, screen: "/nursing-physiotherapy" },
  { id: "3", title: "MEDICINE & DIAGNOSTIC DELIVERY", image: DiagnosticSample, screen: "/medicine-diagnostic-delivery" },
  { id: "4", title: "EMERGENCY CARE SUPPORT", image: EmergencyCareSupport, screen: "/emergency-care" },
  { id: "5", title: "DOCTOR VISIT, PICKUP & DROP", image: DoctorVisitPickupDrop, screen: "/doctor-visit-pickup" },
  { id: "6", title: "SOCIAL WELLNESS ACTIVITIES", image: ForSeniors, screen: "/social-wellness" },
];

const ServiceScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4, }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "900", color: "#22577A", mb: 4, mt: 2 }}
        >
           Services We Provide
        </Typography>

        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} key={service.id}>
              <Card
              onClick={() => navigate(service.screen)} 
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 3,
                  boxShadow: 4,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },height: 300,
                  width: 400,
                }}
             
              >
                {/* Fixed image area */}
                <Box
                  sx={{
                    width: "100%",
                    height: 160, 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={service.image}
                    alt={service.title}
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Content area expands equally */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    pb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "900", color: "#22577A", mb: 1 }}
                  >
                    {service.title}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ServiceScreen;

