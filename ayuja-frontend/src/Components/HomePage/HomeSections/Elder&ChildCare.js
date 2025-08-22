import React, { useState } from "react";
import {Typography,Button,Container,Box,Grid,Card,Pagination,
  CardContent, List, ListItem, ListItemIcon, ListItemText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Footer from "../../Common/Footer";

import ElderImage from "../../Logos/Elder&childcarePage/elder.png"
import DailyLiving from "../../Logos/Elder&childcarePage/DailyLiving.png"
import Cognitive from "../../Logos/Elder&childcarePage/Cognitive.png";
import Emergency from "../../Logos/Elder&childcarePage/Emergency.png";
import MedicalHealth from "../../Logos/Elder&childcarePage/HealthMedication.png";
import Post from "../../Logos/Elder&childcarePage/Post.png";
import eldercareImage from "../../Logos/Elder&childcarePage/ElderlyCare.png";
import screenimage from "../../Logos/screenimage.png";

import homeImage from "../../Logos/Elder&childcarePage/home.png";
import school from "../../Logos/Elder&childcarePage/school.png";
import special from "../../Logos/Elder&childcarePage/special.png";
import emergency1 from "../../Logos/Elder&childcarePage/emergency1.png";
import infrant from "../../Logos/Elder&childcarePage/infrant.png";
import childcare from "../../Logos/Elder&childcarePage/ChildCare.png";
import ParentTrust from "../../Logos/Elder&childcarePage/ParentsTrust.png";
const ElderChildCare = () => {






    return (
        <Box sx={{ overflowX: "hidden" }}>
          <HeroSection />
          <OverViewSection/>
          <ElderlyCareSection/>
          <ScreenImageSection />
          <ChildCareSection/>
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
                    backgroundImage: `url(${ElderImage})`,
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
                    Personalized <br/>
                    In-Home Care for <br/>
                    Every Stage of Life
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
            At   '
            <Box component="span" sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Ayuja
            </Box>{" "}
            ' we understand that every stage of life brings unique needs. Whether it's a senior requiring assistance with
            daily routines or a child needing nurturing support, our caregivers provide personalized attention in the comfort of
            your home. Our goal is to ensure safety, dignity, and emotional well-being for your loved ones — all while giving you
            peace of mind.
          </Typography>
        </Container>
      </Box>
    );
  }
  
  const services = [
    {
      title: "Daily Living Assistance ",
      desc: "Support with bathing, dressing, meals, and mobility. ",
      image: DailyLiving,
    },
    {
      title: "Health & Medication Monitoring ",
      desc: "Support with bathing, dressing, meals, and mobility. ",
      image: MedicalHealth,
    },
    {
      title: "Post-Hospitalization & Recovery Support",
      desc: "Care during recovery, including wound and mobility support. ",
      image: Post,
    },
    {
      title: "Cognitive Engagement ",
      desc: "Mind-stimulating games, memory exercises, and creative activities.",
      image: Cognitive,
    },
    {
      title: "Emergency Response Coordination",
      desc: "24/7 assistance during health emergencies or sudden symptoms. ",
      image: Emergency,
    }
  ];

  function ElderlyCareSection() {
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
          Elderly Care
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#B3FFC4", lineHeight: 1.6, textAlign: "center" }}
        >
          Care with Compassion and Dignity
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
                              width: "60%",
                              height: "60%",
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
        src={eldercareImage}
        alt="Elderly care support"
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
      title: "At-Home Babysitting",
      desc: "Reliable care while parents are away or working. ",
      image: homeImage,
    },
    {
      title: "After-School Supervision",
      desc: "Support with homework, meals, and safe activities. ",
      image: school,
    },
    {
      title: "Infant & Toddler Care",
      desc: "Help with feeding, hygiene, naps, and playtime.",
      image: infrant,
    },
    {
      title: "Special Needs Assistance ",
      desc: "Trained caregivers for children with unique care needs.",
      image: special,
    },
    {
      title: "Emergency Backup Care",
      desc: "Quick, trusted care when regular support is unavailable.",
      image: emergency1,
    }
  ];




function ChildCareSection() {
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
        Child Care
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, color: "#B3FFC4", lineHeight: 1.6, textAlign: "center" }}
      >
        Trusted Support for Your Little Ones
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
                            width: "60%",
                            height: "60%",
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
      src={childcare}
      alt="Elderly care support"
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
            variant="h3"
            sx={{ fontWeight: "bold",textAlign: "center",ml:70}}
          >
            Why Parents Trust Ayuja
          </Typography>
          <List sx={{width: "50%",mx: "auto",fontSize: "30px"}}>
            {[
              "Certified and background-checked caregivers",
              "Age-appropriate engagement and routines",
              "Real-time updates and communication with parents",
              "Flexible services based on your family’s lifestyle",
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




export default ElderChildCare;
