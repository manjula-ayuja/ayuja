import React, { useState } from "react";
import {Typography,Button,Container,Box,Grid,Card,Pagination,
  CardContent, List, ListItem, ListItemIcon, ListItemText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Footer from "../../Common/Footer";
import screenimage from "../../Logos/screenimage.png";
// import BookAppointment from "./BookAppointment";
import mainimage from "../../Logos/SocialWellness/TopBanner.png";
import ParentTrust from "../../Logos/Elder&childcarePage/ParentsTrust.png";

import groupgatherings from "../../Logos/SocialWellness/groupgatherings.png"
import yoga from "../../Logos/SocialWellness/yoga.png";
import games from "../../Logos/SocialWellness/games.png";
import storytelling from "../../Logos/SocialWellness/storytelling.png";
import dietplans from "../../Logos/SocialWellness/dietplans.png";
import ForSeniors from "../../Logos/SocialWellness/ForSeniors.png";

import workshops from "../../Logos/SocialWellness/workshops.png";
import storyhours from "../../Logos/SocialWellness/storyhours.png";
import mindfullplay from "../../Logos/SocialWellness/mindfullplay.png";
import miniyoga from "../../Logos/SocialWellness/miniyoga.png";
import childfriendly from "../../Logos/SocialWellness/childfriendly.png";
import ForChildren from "../../Logos/SocialWellness/ForChildren.png";



const SocialWellness = () => {

    return (
        <Box sx={{ overflowX: "hidden" }}>
          <HeroSection />
          <OverViewSection/>
          <WhatWeOfferSection/>
          <ScreenImageSection />
          <ForChildrenSection/>
          <ScreenImageSection />
          <SocialWellnessTrust/>
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
            At&nbsp;
            <Box component="span" sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Ayuja
            </Box>{" "}
            we believe true health goes beyond physical care — it includes 
            emotional resilience, social connection, and a sense of purpose. Our&nbsp;
            <Box component="span" sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                 Social & Mental Wellness Activities 
            </Box>{" "}
            are thoughtfully designed to uplift the spirits of seniors, children, 
            and families, promoting holistic well-being in a supportive community environment. 
          </Typography>
        </Container>
      </Box>
    );
  }
  



  const services = [
    {
      title: "Group Gatherings & Celebrations ",
      desc: "Birthday parties, festival events, and social bonding activities.",
      image: groupgatherings,
    },
    {
      title: "Meditation & Gentle Yoga ",
      desc: "uided practices and light movement to reduce stress and enhance well-being.",
      image: yoga,
    },
    {
      title: "Memory & Cognitive Games",
      desc: "Activities designed to improve focus, recall, and mental agility.",
      image: games,
    },
    {
      title: "Storytelling & Sharing Circles",
      desc: "Safe spaces for emotional expression, nostalgia, and connection.",
      image: storytelling,
    },
    {
      title: "Personalized Diet & Nutrition Plans ",
      desc: "Age-appropriate meal planning for health management and vitality.",
      image: dietplans,
    }
  ];


  function WhatWeOfferSection() {
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
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#B3FFC4", lineHeight: 1.6, textAlign: "center" }}
        >
          For Seniors: 
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
        src={ForSeniors}
        alt="For Seniors"
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
      title: "Creative Workshops ",
      desc: "Engaging sessions in art, music, and crafts to foster imagination and expression. ",
      image: workshops,
    },
    {
      title: "Group Playdates & Story Hours ",
      desc: "Safe, supervised fun that encourages friendship and social development. ",
      image: storyhours,
    },
    {
      title: "Mindful Play & Emotion Coaching ",
      desc: "Helping kids understand and manage emotions through structured activities. ",
      image: mindfullplay,
    },
    {
      title: "Movement & Mini-Yoga Sessions",
      desc: "Child-friendly physical activities for body awareness and calmness. ",
      image: miniyoga,
    },
    {
      title: "Child-Friendly Nutrition Guidance",
      desc: "Balanced meal suggestions tailored to age, activity levels, and preferences.",
      image: childfriendly,
    }
  ];

function ForChildrenSection() {
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
        For Children
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
      src={ForChildren}
      alt="For Children"
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

  function SocialWellnessTrust() {
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
            sx={{ fontWeight: "bold",ml:22,py: 3}}
          >
            Why Mental & Social Wellness Matters with Ayuja: 
          </Typography>
          <List sx={{width: "50%",mx: "auto",fontSize: "30px"}}>
            {[
              "Builds a sense of belonging and reduces loneliness ",
              "Encourages self-expression and boosts confidence ",
              "Strengthens family and community connections ",
              "Supports cognitive and emotional health at all ages ",
              "All activities facilitated by trained wellness coordinators and therapists ",
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
          {/* <BookAppointment/> */}
        </Box>
    );
  }





export default SocialWellness;

