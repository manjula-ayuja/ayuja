import React, { useState } from "react";
import {Typography,Button,Container,Box,Grid,Card,Pagination,
  CardContent, List, ListItem, ListItemIcon, ListItemText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "../../Common/Footer";

import screenimage from "../../Logos/screenimage.png";
import ParentTrust from "../../Logos/Elder&childcarePage/ParentsTrust.png";


import mainimage from "../../Logos/DoctorVisitPickUP/TopBanner.png";

import appointment from "../../Logos/DoctorVisitPickUP/appointment.png";
import pickup from "../../Logos/DoctorVisitPickUP/pickup.png";
import medicalhistory from "../../Logos/DoctorVisitPickUP/medicalhistory.png";
import doctor from "../../Logos/DoctorVisitPickUP/doctor.png";  
import coordination from "../../Logos/DoctorVisitPickUP/coordination.png";
import accomplishment from "../../Logos/DoctorVisitPickUP/accomplishment.png";
import followup from "../../Logos/DoctorVisitPickUP/followup.png";
import DoctorVisitPickupDrop from "../../Logos/DoctorVisitPickUP/DoctorVisitPickupDrop.png";
const DoctorVisitPickup = () => {
    return (
        <Box sx={{ overflowX: "hidden" }}>
          <HeroSection />
          <OverViewSection/>
          <OfferSection/>
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
                       End-to-End Assistance<br/>
                        for Your Medical<br/>
                         Appointments 
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

            Managing doctor visits — especially for elderly patients, children, or those with chronic conditions — 
            can be stressful and time-consuming. At&nbsp;
            <Box component="span" sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Ayuja
            </Box>{" "}
            , we simplify the entire process by offering&nbsp; 
            <Box component="span" sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            door-to-door transport, appointment scheduling, 
            </Box>{" "}
           
            and medical history coordination so that you or your loved ones can focus on recovery, not logistics.  
          </Typography>
        </Container>
      </Box>
    );
  }



  const services = [
    {
      title: "Appointment Scheduling",
      desc: "We book appointments on your behalf and coordinate timings based on availability and urgency.",
      image: appointment,
    },
    {
      title: "Pickup & Drop Services",
      desc: "Safe, hygienic, and punctual transport to and from hospitals or clinics. ",
      image: pickup,
    },
    {
      title: "Medical History Management",
      desc: "We securely store your medical history, test results, prescriptions, and treatments.",
      image: medicalhistory,
    },
    {
      title: "Doctor Coordination ",
      desc: "We share your medical history with doctors before visits to improve diagnosis and care.",
      image: doctor,
    },
    {
      title: "Medication Summary Post-Visit",
      desc: "After your visit, we share a simple medication and next-steps summary—like a caregiver would.",
      image: coordination,
    },
    {
      title: "Accompaniment on Visits",
      desc: "A trained attendant can join your visit for support and help clarify the doctor’s instructions.",
      image: accomplishment,
    },
    {
      title: "Follow-Up Care Support",
      desc: "Assistance in managing post-visit tasks like tests, medicine purchases, or therapy scheduling.",
      image: followup,
    } 
  ];

  function OfferSection() {
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
        src={DoctorVisitPickupDrop}
        alt="Doctor Visit Pick up Drop"
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
            Why Choose Ayuja for Doctor Visits & Transport? 
          </Typography>
          <List sx={{width: "80%",mx: "auto",fontSize: "30px"}}>  
            {[
              "Coordination with doctors for smoother, more informed consultations ",
              "Safe and supportive environment for elderly, children, and post-op patients ",
              "Peace of mind for family members — we act as an extended support system  ",
              "End-to-end service from scheduling to transport to care follow-up  ",
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




export default DoctorVisitPickup;

