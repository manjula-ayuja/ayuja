import React, { useState } from "react";
import {Typography,Button,Container,Box,Grid,Card,Pagination,
  CardContent, List, ListItem, ListItemIcon, ListItemText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "../../Common/Footer";

import screenimage from "../../Logos/screenimage.png";
import ParentTrust from "../../Logos/Elder&childcarePage/ParentsTrust.png";


import mainimage from "../../Logos/Nursing/Main.png";
import chronic from "../../Logos/Nursing/chronic.png";
import homeexercise from "../../Logos/Nursing/homeexercise.png";
import homenurse from "../../Logos/Nursing/HomeNursingCare.png";
import illness from "../../Logos/Nursing/illness.png";
import medication from "../../Logos/Nursing/medication.png";
import ongoing from "../../Logos/Nursing/ongoing.png";
import operative from "../../Logos/Nursing/operative.png";
import pain from "../../Logos/Nursing/pain.png";
import Physiotherophy from "../../Logos/Nursing/PhysiotherapyatHome.png";
import recovery from "../../Logos/Nursing/recovery.png";
import senior from "../../Logos/Nursing/senior.png";
import surgical from "../../Logos/Nursing/surgical.png";

const NursingPhysiotherapy = () => {


    return (
        <Box sx={{ overflowX: "hidden" }}>
          <HeroSection />
          <OverViewSection/>
          <HomeNursingCareSection/>
          <ScreenImageSection />
          <PhysiotherapyHomeCareSection/>
          <ScreenImageSection />
          <WhyParentsTrust/>
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

                    Professional Medical &<br/>
                    Rehabilitation Support<br/>
                    at Your Doorstep
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
            <Box component="span" sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Ayuja
            </Box>{" "}
            brings licensed medical care and rehabilitation services directly to your home, 
            ensuring your loved ones recover comfortably and safely in familiar surroundings. Whether you're 
            managing a chronic condition, recovering from surgery, 
            or need long-term support, our experienced nurses and physiotherapists are here to help. 
          </Typography>
        </Container>
      </Box>
    );
  }
  
  const services = [
    {
      title: "Post-Surgical Nursing  ",
      desc: "Wound care, dressing changes, drain management, and post-op monitoring.  ",
      image: surgical,
    },
    {
      title: "Injection & IV Administration ",
      desc: "Trained nurses to manage injections, IV fluids, and medications.",
      image: illness,
    },
    {
      title: "Chronic Illness Management",
      desc: "Diabetes care, blood pressure monitoring, catheterization, and more. ",
      image: chronic,
    },
    {
      title: "Ongoing Health Monitoring",
      desc: "Vitals tracking, progress reporting, and nurse-supervised care plans. ",
      image: ongoing,
    },
    {
      title: "Medication Management",
      desc: "Timely and accurate administration of prescribed treatments.  ",
      image: medication,
    }
  ];

  function HomeNursingCareSection() {
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
          Home Nursing Care
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#B3FFC4", lineHeight: 1.6, textAlign: "center" }}
        >
          Expert Medical Attention When You Need It 
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
                              height: "100%",
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
        src={homenurse}
        alt="Home Nurse"
        sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: { xs: "250px", md: "420px" }, 
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


const childservices = [
    {
      title: "Post-Operative Rehab",
      desc: "Therapy plans for recovery after surgeries and joint replacements.  ",
      image: operative,
    },
    {
      title: "Senior Mobility Therapy",
      desc: "Support with homework, meals, and safe activities.  ",
      image: senior,
    },
    {
      title: "Pain Relief Programs",
      desc: "Targeted therapy for arthritis, back pain, and muscular conditions. ",
      image: pain,
    },
    {
      title: "Neurological Recovery Support",
      desc: "Rehabilitation for stroke, Parkinson’s, and spinal issues. ",
      image: recovery,
    },
    {
      title: "Customized Home Exercise Plans",
      desc: "Therapist-guided routines for strength and mobility. ",
      image: homeexercise,
    }
  ];




function PhysiotherapyHomeCareSection() {
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
        Physiotherapy at Home
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, color: "#B3FFC4", lineHeight: 1.6, textAlign: "center" }}
      >
        Restore Strength, Mobility & Confidence 
      </Typography>
      <Box sx={{ py: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          {childservices.map((service, idx) => (
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
                            height: "100%",
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
      src={Physiotherophy}
      alt="Physiotherapy at Home"
      sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: { xs: "250px", md: "420px" }, 
          height: "auto",
          pointerEvents: "none", 
        }}
    />
  </Box>
    );
  }



  function WhyParentsTrust() {
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
            sx={{ fontWeight: "bold",textAlign: "center",ml:70,py: 3}}
          >
            Why Choose Ayuja for Nursing & Physiotherapy? 
          </Typography>
          <List sx={{width: "80%",mx: "auto",fontSize: "30px"}}>  
            {[
              "Certified and experienced medical professionals",
              "Custom care plans aligned with doctor recommendations",
              "Regular reporting and communication with families",
              "Hygienic, safe, and comfortable care at home",
              "Coordination with hospitals and specialists when needed ",
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





export default NursingPhysiotherapy;

