import React, { useState } from "react";
import {Typography,Button,Container,Box,Grid,Card,Pagination,
  CardContent, List, ListItem, ListItemIcon, ListItemText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "../../Common/Footer";

import screenimage from "../../Logos/screenimage.png";
import ParentTrust from "../../Logos/Elder&childcarePage/ParentsTrust.png";


import mainimage from "../../Logos/EmergencyCareSupport/TopBanner.png";

import hours from "../../Logos/EmergencyCareSupport/24hours.png";
import Ambulance from "../../Logos/EmergencyCareSupport/Ambulance.png";
import EmergencyAlert from "../../Logos/EmergencyCareSupport/EmergencyAlert.png";
import Falldetection from "../../Logos/EmergencyCareSupport/Falldetection.png";  
import family from "../../Logos/EmergencyCareSupport/family.png";
import FirstAid from "../../Logos/EmergencyCareSupport/FirstAid.png";
import hospital from "../../Logos/EmergencyCareSupport/hospital.png";
import EmergencyCareSupport from "../../Logos/EmergencyCareSupport/EmergencyCareSupport.png";
import medicalservices from "../../Logos/EmergencyCareSupport/medicalservices.png";
const EmergencyCare = () => {


    return (
        <Box sx={{ overflowX: "hidden" }}>
          <HeroSection />
          <OverViewSection/>
          <MedicineDeliverySection/>
          <ScreenImageSection />
          <WhyAyuja/>
          <Footer/>
        </Box>
      );
    }
    
      function HeroSection() {
        const navigate = useNavigate();
          return (

                <Box
                sx={{
                    width: { xs: "100%", md: "100%" },
                    minHeight: "350px",
                    backgroundImage: `url(${mainimage})`,
                    backgroundSize: "cover",       
                    backgroundPosition: "center", 
                    p: 4,                      
                    color: "#fff",                
                    position: "relative",
                }}
                >
                {/* Optional overlay for better text visibility */}
                <Box
                    sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: "rgba(0,0,0,0.4)", // dark overlay
                    borderRadius: "16px",
                    }}
                />
                {/* Content */}
                <Box sx={{ position: "relative", zIndex: 1, ml: 6 }}>
                    <Typography
                    variant="body1"
                    sx={{
                        mb: 3,
                        fontSize: "75.21px",
                        fontFamily: '"Montserrat", sans-serif',
                        lineHeight: "1.3",
                    }}
                    >
                      Swift, Life-Saving<br/>
                       Response When Every <br/>
                       Second Counts 
                    </Typography>
                    <Button
                    variant="contained"
                    onClick={() => navigate("/book-appointment")}
                    sx={{
                        backgroundColor: '#F9F2FF',
                        color: '#006D77',
                        px: 4,
                        textTransform: "none",borderRadius:"50px",
                        fontWeight: "bold",
                        fontFamily: '"Montserrat", sans-serif',
                        "&:hover": {
                        background: "#fff",
                        },
                    }}
                    >
                    Book Now
                    </Button>
                </Box>
                </Box>
          );
        }
        





function OverViewSection() {
    return (
      <Box sx={{minHeight: "40vh",display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",px: 1,py: 2,bgcolor: "#fff",}}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", color: "#000000", fontFamily: "Montserrat Alternates, sans-serif", fontWeight: "bold",}}>
            Overview
          </Typography>
  
          <Typography
            variant="body1"
            sx={{maxWidth: 1000,fontSize: "1.3em",color: "#0161AB",textAlign: "center",mx: "auto", }} >

            Medical emergencies can happen anytime — and in those critical moments, timely response can make all the difference. 
            <Box component="span" sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Ayuja’s Emergency Support Services
            </Box>{" "}
             
            are designed to provide fast, coordinated assistance to residents and their families. 
            From dispatching ambulances 
            to arranging immediate medical attention, we ensure help is on the way when it’s needed most. 
          </Typography>
        </Container>
      </Box>
    );
  }


  const services = [
    {
      title: "24/7 Emergency Helpline",
      desc: "A dedicated phone line that residents can call any time for urgent assistance.  ",
      image: hours,
    },
    {
      title: "Ambulance Dispatch",
      desc: "Immediate coordination with local ambulance providers for fast and safe transport.  ",
      image: Ambulance,
    },
    {
      title: "On-Site First Aid Assistance",
      desc: "Rapid response by trained personnel for initial care until medical help arrives. ",
      image: FirstAid,
    },
    {
      title: "Emergency Alert Button for Seniors ",
      desc: "Easy-to-use wearable panic button or wristband for instant emergency alerts.",
      image: EmergencyAlert,
    },
    {
      title: "Family Notification System ",
      desc: "Instant alerts sent to registered family members and caregivers during emergencies.  ",
      image: family,
    },
    {
      title: "Fall Detection via Smart Devices ",
      desc: "AI-powered fall detection using smartwatches or wall sensors that auto-trigger alerts.",
      image: Falldetection,
    },
    {
      title: "Hospital Pre-Coordination",
      desc: "Advance communication with hospitals to ensure quick triage and reduced wait time.  ",
      image: hospital,
    },
    {
      title: "Medical Escort Services ",
      desc: "Accompanied travel to hospital for elderly or critical patients when needed. ",
      image: medicalservices,
    }

    
  ];

  function MedicineDeliverySection() {
      return (

    <Box sx={{backgroundColor: "#006D77",py: 0,mb: 0,position: "relative",}}>
      <Container sx={{ py: 3, mb: 0 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontFamily: '"Montserrat", sans-serif',
            color: "#B3FFC4",
          }}
        >
          What We Offer
        </Typography>
        <Box sx={{ py: 1 }}>
          <Grid container spacing={4} justifyContent="center">
            {services.map((service, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} justifyContent="center">
                <Box display="flex" justifyContent="center">
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      backgroundColor: "#B3FFC4",
                      border: "1.5px solid #B3FFC4",
                      borderRadius: 2,
                      p: 2,
                      maxWidth: 320,
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: "#22577A",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            style={{
                              width: "100%",
                              height: "150%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontFamily: '"Montserrat", sans-serif',
                            color: "#000000",
                            flex: 1,
                            wordBreak: "break-word",
                          }}
                        >
                          {service.title}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 2,
                          fontFamily: '"Montserrat", sans-serif',
                          color: "#000000",
                          flexGrow: 1,
                          wordBreak: "break-word",
                        }}
                      >
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box
        component="img"
        src={EmergencyCareSupport}
        alt="Emergency Care Support"
        sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: { xs: "150px", md: "380px" }, 
            height: "auto",
            pointerEvents: "none", 
          }}
      />
    </Box>
      );
    }
    
    function ScreenImageSection() {
          return (
    <Box component="img" src={screenimage} alt="About Us"
    sx={{width: "100%",height: "10vh",objectFit: "cover",borderRadius: "0px 0px 100px 0px",display: "block"}}
  />
);
}



  function WhyAyuja() {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#006699",
          color: "white",
        }}
      >

        {/* Left Section */}
        <Box sx={{ flex: 1,textAlign: "center"}}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold",textAlign: "center",ml:30,}}
          >
            Why Ayuja’s Emergency Support Stands Out: 
          </Typography>
          <List sx={{width: "80%",mx: "auto",fontSize: "30px"}}>  
            {[
              "Immediate response coordination via app, phone, or in-person request  ",
              "Networked with multiple hospitals, clinics, and ambulance providers ",
              "First responders trained in basic life support (BLS)  ",
              "Integrated with other Ayuja services for seamless post-emergency care ",
              "Peace of mind for families — knowing help is just a call away ",
            ].map((text, i) => (
              <ListItem key={i} sx={{ py: 0.5 }}>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                    fontSize: "24px",   
                    fontWeight: "400", 
                    }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

          <Box
            component="img"
            src={ParentTrust}
            alt="Parents and Child"
            sx={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
            }}
          />
        </Box>
    );
  }




export default EmergencyCare;

