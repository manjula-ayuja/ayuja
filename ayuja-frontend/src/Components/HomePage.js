
import React, { useState } from "react";
import {AppBar,Toolbar,Typography,Button,Container,Box,Grid,Card,Pagination,
  CardContent,Paper,useTheme,useMediaQuery,TextField,Stack,Link,ToggleButton,ToggleButtonGroup,IconButton
} from "@mui/material";

import { CheckCircle as CheckCircleIcon,
  Email as EmailIcon, 
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon, 
  ArrowForward as ArrowForwardIcon, 
  YouTube as YouTubeIcon, 
  Telegram as TelegramIcon, 
  Instagram as InstagramIcon 
} from "@mui/icons-material";



import HeroSectionImage from "./Logos/HeroSection.png";
import ayujalogo from "./Logos/Ayuja_Logo.jpg";
import Doctor from "./Logos/Doctor.png";
import Elderly from "./Logos/Elderly.png";
import Emergency from "./Logos/Emergency.png";
import Medicine from "./Logos/Medicine.png";
import Nursing from "./Logos/Nursing.png";
import Social from "./Logos/Social.png";



function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyAyuja/>
      <SubscriptionPlans/>
      <TestimonialsMissionFooter/>
    </div>
  );
}

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#153f4b"}}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" sx={{ mb: 3,mt: 3,}}>
            <img  src={ayujalogo} alt="Ayuja Logo" width={150} height={48} style={{ marginRight: 10 }} />
        </Box>
        <Box>
          <Button sx={{textTransform:'none',color:"#121212"}}>Home</Button>
          <Button sx={{textTransform:'none',color:"#121212"}}>Services</Button>
          <Button sx={{textTransform:'none',color:"#121212"}}>About Us</Button>
          <Button sx={{textTransform:'none',color:"#121212"}}>Plans</Button>
          <Button sx={{textTransform:'none',color:"#121212"}}>Contact Us</Button>
        <Button
            variant="contained"
            sx={{background: "linear-gradient(to right, seagreen, #22577A, #22577A)",borderRadius: "24px",px: 2,textTransform: "none",color: "#FFFFFF",fontWeight: "bold",
            '&:hover': {
            background: "linear-gradient(to right, #1e764f, #1c4f6c)", 
            }, }}>
            Emergency Support
        </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

  function HeroSection() {

      return (
        <Box
          sx={{
            backgroundColor: "transparent",
            py: 2,
            px: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",marginLeft:'100px'
          }}
        >
          {/* Text Section - 60% */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 800,
                fontSize: "79.21px",
                lineHeight: "108%",
                background: "linear-gradient(to bottom, #22577A, #22577A, seagreen)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                mb: 2,
              }}
            >
              Care That Feels Like Family
            </Typography>
            <Typography
            variant="body1"
            sx={{mb: 3,color: "#161616",fontSize: "25.21px",fontFamily: '"Montserrat", sans-serif',width: "500px",lineHeight: "1.3", 
            }}
          >
            From newborns to seniors, we deliver trusted care and comfort directly to your home.
          </Typography>
            <Box display="flex" flexWrap="wrap">
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, seagreen, #22577A)",
                  borderRadius: "24px",
                  px: 2,
                  textTransform: "none",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontFamily: '"Montserrat", sans-serif',
                  mr: 2,
                  '&:hover': {
                    background: "linear-gradient(to right, rgb(4, 82, 47), #1c4f6c)",
                  },
                }}
              >
                View All Services
              </Button>
    
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#22577A",
                  color: "#22577A",
                  borderRadius: "24px",
                  textTransform: "none",
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Box>
    
          {/* Spacer - 10% */}
          <Box sx={{ display: { xs: "none", md: "block" }, width: "10%" }} />
    
          {/* Image Section - 30% */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              height: 400,
              backgroundColor: "transparent",
              borderRadius: "10px 0 0 200px",
              overflow: "hidden",
              mt: { xs: 4, md: 0 },
            }}
          >
              <Box
            sx={{

              width: 700, 
              height: 800, 
              backgroundColor: "#006D77",
              borderRadius: "40px 0 0 200px",
              overflow: "hidden",
              mt: { xs: 0, md: 0 },
            }}
          >
            <img
              src={HeroSectionImage}
              alt="Care at home"
              style={{
                marginTop:'-150px',
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
            </Box>



          </Box>
        </Box>
      );
    }
    

const services = [
  {
    title: "Elderly & Child Care",
    desc: "Personalized in-home care to support the daily needs of seniors and children.",
    image: Elderly
  },
  {
    title: "Nursing & Physiotherapy",
    desc: "Professional medical care and rehabilitation delivered at your doorstep.",
    image: Nursing
  },
  {
    title: "Medicine & Diagnostic Delivery",
    desc: "Fast, reliable delivery of prescriptions and lab reports right to your home.",
    image: Medicine
  },
  {
    title: "Emergency Care Support",
    desc: "24/7 ambulance and critical care coordination when every second counts.",
    image: Emergency
  },
  {
    title: "Doctor Visit Pickup & Drop",
    desc: "Safe and convenient transport for medical appointments and check-ups.",
    image: Doctor
  },
  {
    title: "Social Wellness Activities",
    desc: "Engaging programs to promote emotional and mental well-being for all ages.",
    image: Social
  }
];

function ServicesSection() {
    return (
      <Box sx={{ width: '100%', backgroundColor: '#eaf9f5', py: 0, mb: 5 }}>
      <Container sx={{ py: 3 ,width:'100%',mb:5}}>
        <Typography variant="h4" align="center" gutterBottom
          sx={{
            fontWeight: "bold",
            fontFamily: '"Montserrat", sans-serif',
            color: "#000000",
          }}
        >
          Our Services
        </Typography>
  
        <Box sx={{ py: 1 }}>

          <Grid container spacing={4} justifyContent="center">
            {services.map((service, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} justifyContent="center" >
                 <Box display="flex" justifyContent="center">
                <Card
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "transparent", border: "1.5px solid #22577A", borderRadius: 2, p: 2, width: '100%', maxWidth: 320, height: '100%',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{width: 56,height: 56,backgroundColor: "#22577A",borderRadius: "50%",overflow: "hidden", display: "flex",alignItems: "center",justifyContent: "center",mr: 2,flexShrink: 0,
                        }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{fontWeight: 700,fontFamily: '"Montserrat", sans-serif',color: "#000000",flex: 1,wordBreak: "break-word",}}
                      >
                        {service.title}
                      </Typography>
                    </Box>
  
                    <Typography
                      variant="body2"
                      sx={{mt: 2,fontFamily: '"Montserrat", sans-serif',color: "#000000",flexGrow: 1,wordBreak: "break-word",}}
                    >
                      {service.desc}
                    </Typography>
  
                    <Box mt={2}>
                      <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        sx={{backgroundColor: "#087c7c",borderRadius: "16px",textTransform: "none",color: "light green",fontFamily: '"Montserrat", sans-serif',
                          "&:hover": {
                            backgroundColor: "#087c7c",
                          },
                        }}
                      >
                        Learn more
                      </Button>
                    </Box>
                  </CardContent>
               
                </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      </Box>
    );
  }
  


function AboutSection() {
  return (

    <Box
    sx={{display: "flex",width: "100%",height: 300,position: "relative",overflow: "hidden",mb: 4,backgroundColor: "#087c7c",borderRadius:'0px 0px 200px 0px'
    }}
    >
      <Box
        sx={{flex: 1,backgroundColor: "#087c7c",color: "#fff",py: 6,px: 4,borderBottomRightRadius: "90px",display: "flex",flexDirection: "column",justifyContent: "center",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom sx={{color:"#E5FDCF",fontFamily: "Montserrat Alternates,sans-serif",fontWeight: 'bold'}}>
            About Ayuja
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 500, fontSize: "1.1em",color:"#E5FDCF" }}>
            At Ayuja Health Care, our mission is to provide compassionate, personalized home care that
            supports the dignity, independence, and well-being of every individual, from children to
            seniors. We deliver trusted care and comfort directly to your home, ensuring peace of mind
            for you and your loved ones.
          </Typography>

          <Box mt={2}>
            <Button
              size="large"
              variant="contained"
              sx={{backgroundColor: "#f6fcfa",borderRadius: "16px",textTransform: "none",color: "#22577A",fontFamily: '"Montserrat", sans-serif',
                "&:hover": {
                  backgroundColor: "#087c7c",
                },
              }}
            >
              Read more
            </Button>
          </Box>
        </Container>
        </Box>

      <Box
        sx={{flex: 1,position: "relative",display: "flex",alignItems: "center",justifyContent: "flex-start",
        }}
      >

          <Box
            sx={{position: "absolute",top: "50%",left: "-10%",transform: "translateY(-50%)",width: { xs: 320, sm: 360, md: 400 },height: { xs: 140, sm: 180, md: 220 },backgroundColor: "#E5FDCF",borderRadius: 8,display: "flex",alignItems: "center",justifyContent: "center",boxShadow: '0px 8px 6px #087c7c',zIndex: 1,
            }}
          >
          <IconButton
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener"
            sx={{ color: 'red' }}
          >
            <YouTubeIcon sx={{fontSize:"100px"}} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

const features = [
  "Trained Professionals",
  "Emergency Services",
  "Personalized Care",
  "Everyday Assistance",
  "Easy Access",
  "Trusted Care",
];
function WhyAyuja() {
return (
  <Box
    component="section"
    sx={{
      backgroundColor: "#eaf9f5",
      py: { xs: 1, sm: 5 },
      textAlign: "center",mb:1
    }}
  >
    <Typography
      variant="h4"
      sx={{color: "#000000",fontWeight: 600,mb: 4,fontSize: { xs: "1.8rem", sm: "2.2rem" },fontFamily: "Montserrat, sans-serif",
      }}
    >
      Why Choose Ayuja?
    </Typography>
<Grid
  container
  spacing={3}
  justifyContent="center"
  sx={{maxWidth: 600,mx: "auto",width: "100%", 
  }}
>
  {features.map((feature, idx) => (
    <Grid
      item
      key={idx}
      sx={{
        flexBasis: 'calc(50% - 12px)', 
        maxWidth: 'calc(50% - 12px)',
      }}
    >
    <Paper
      elevation={2}
      sx={{p: 2.5,   height: 13,borderRadius: 4,backgroundColor: '#FFFFFF',display: "flex",alignItems: "center",color: "#0a6a7a",fontWeight: 500,fontSize: "1.15rem",fontFamily: "Montserrat, sans-serif",}}>
        <Box sx={{backgroundColor: "#087c7c",borderRadius: "50%",width: 32,height: 32,display: "flex",alignItems: "center",justifyContent: "center",mr: 1.5,}} >
          <CheckCircleIcon sx={{ color: "#fff", fontSize: "1.6rem" }} />
        </Box>
      {feature}
    </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);
}

const plans = [
  { name: "Basic" },
  { name: "Optimal" },
  { name: "Comprehensive" },
  { name: "Advanced" },
];
 function SubscriptionPlans() {
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

return (
  <Box
    component="section"
    sx={{
      backgroundColor: "#fff",
      py: 3,
      textAlign: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{color: "#153f4b",mb: 5,fontWeight: 700,fontFamily: "Montserrat, sans-serif",
      }}
    >
      Subscription Plans
    </Typography>

    <Box
      sx={{display: "flex",flexDirection: isSmallScreen ? "column" : "row",justifyContent: "center",gap: 3,maxWidth: 1100,mx: "auto",px: 2,
      }}
    >
      {plans.map((plan, idx) => {
        const isBasic = idx === 0;

        return (

          <Box
            key={plan.name}
            sx={{width: 220,minHeight: 300,borderRadius: "80px 0 80px 0",background: isBasic  ? "#087c7c"  : "#fff",color: isBasic ? "#fff" : "#0a6a7a",border: isBasic ? "none" : "2px solid #0a9a92",boxShadow: "0 2px 8px rgba(10, 106, 122, 0.05)",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "space-between", py: 3,px: 2,position: "relative",
            }}
          >
            {/* Plan Name at Top */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                mt: 1,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {plan.name}
            </Typography>

            {/* Read More Button at Bottom */}
             <Button
          variant="contained"
          sx={{ backgroundColor: "transparent", color: isBasic ? " #fff" : " #0a6a7a", borderRadius: "24px", border: isBasic ? "1px solid #fff" : "1px solid #0a6a7a", textTransform: "none", fontWeight: 100, fontSize: "1rem", px: 2,gap: 1,
          }}
        >
          Read More
          <Box
          sx={{width: 36,height: 36,backgroundColor:isBasic ? "#fff" : " #0a6a7a",borderRadius: "50%",display: "flex",alignItems: "center",justifyContent: "center",
          }}
        >
          <ArrowForwardIcon sx={{color: isBasic ?" #0a6a7a": "#fff" , fontSize: 20 }} />
        </Box>
        </Button>
          </Box>

        );
      })}
    </Box>
  </Box>
);
}




const testimonialData = [
  {
    quote:
      "Ayuja was there when my mother needed urgent help. They arrived within minutes. True peace of mind!",
    author: "Shalini",
    authorInfo: "Resident at Golden Meadows",
  },
 
];

const inviteOptions = [
  "Caregivers",
  "Volunteers",
  "Partner Hospitals",
];
 function TestimonialsMissionFooter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);
  const [inviteFor, setInviteFor] = useState(() => new Set());
  const handleInviteToggle = (event, newInvites) => {
    if (newInvites) {
      setInviteFor(new Set(newInvites));
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const socialButtonStyle = {
    backgroundColor: "#d3d3d3",
    color: "#0a0a0a",
    borderRadius: "50%",
    width: 36,
    height: 36,
    "&:hover": {
      backgroundColor: "#0a6a7a",
    },
  };
  return (
    <Box component="section" sx={{backgroundColor: "#087c7c", color: "#d4f1f4", pt: 3, pb: 3,borderRadius:'200px 200px 0px 0px' }}>
      {/* Testimonials */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 6, position: "relative" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{fontWeight: "bold",fontFamily: '"Montserrat", sans-serif',color: "#E5FDCF",
          }}
        >
          Testimonials
        </Typography>
        <Box
          sx={{border: "1px solid #7bc4b6",borderRadius: "0 80px 0 0",p: 4,position: "relative",minHeight: 140,maxWidth: 600,mx: "auto",
          }}
        >
          {/* Left quote */}
          <Typography
            component="span"
            sx={{fontSize: 48,color: "#7bc4b6",position: "absolute",top: 16,left: 16,userSelect: "none",
            }}
          >
            &ldquo;
          </Typography>

          {/* Quote text */}
          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{ mx: 6, mb: 2, color: "#E5FDCF", fontWeight: 400, lineHeight: 1.6,fontSize: isMobile ? "1.2rem" : "1.5rem",  }}
          >
            <Box component="span" fontWeight="bold" color="#a1e3d8"  sx={{ fontSize: "2rem" }}>
              Ayuja
            </Box>{" "}
            {testimonialData[page - 1].quote.replace("Ayuja", "")}
          </Typography>

          {/* Right quote */}
          <Typography
            component="span"
            sx={{fontSize: 48,color: "#7bc4b6",position: "absolute",bottom: 16,right: 16,userSelect: "none",
            }}
          >
            &rdquo;
          </Typography>

          {/* Author */}
          <Typography
            variant="subtitle2"
            fontStyle="italic"
            color="#a1e3d8"
            sx={{ mt: 3, textAlign: "right", mr: 4,fontSize: "1rem" }}
          >
            – {testimonialData[page - 1].author},{" "}
            <Box component="span" fontWeight="bold" fontStyle="normal">
              {testimonialData[page - 1].authorInfo}
            </Box>
          </Typography>
        </Box>

        {/* Pagination dots if multiple testimonials */}
        {testimonialData.length > 1 && (
          <Pagination
            count={testimonialData.length}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 3 }}
            size={isMobile ? "small" : "medium"}
            shape="rounded"
            siblingCount={0}
          />
        )}
      </Container>

      {/* Join Our Mission */}
      <Box
        sx={{bgcolor: "#e6f0eb",color: "#153f4b",py: 6,textAlign: "center",borderTop: "1px solid #c9dcd7",borderBottom: "1px solid #c9dcd7",
        }}
      >
        <Container maxWidth="sm">
          <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{fontWeight: "bold",fontFamily: '"Montserrat", sans-serif',color: "#000000",
          }}
        >
          Join Our Mission
        </Typography>
        
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{fontWeight: "bold",fontFamily: '"Montserrat", sans-serif',color: "#22577A",
          }}
        >
          Care with Purpose
        </Typography>

        <Box
          sx={{position: "relative",display: "inline-block",mt: 4,mb: 4,
          }}
        >
  {/* Overlapping Label */}

    <Box
      sx={{position: "absolute",top: "-14px",left: "146px",backgroundColor: "#e6f0eb",width:"100px",height:'20px',border:'1px solid #0a9a92',px: 1.5,py: 0.5,fontSize: "0.875rem",fontWeight: "bold",color: "#000000",fontFamily: '"Montserrat", sans-serif',borderRadius: "8px", zIndex: 1,boxShadow: "0 1px 4px rgba(0,0,0,0.1)", 
      }}
    >
    Invite For
    </Box>

          <ToggleButtonGroup
            value={[...inviteFor]}
            onChange={handleInviteToggle}
            aria-label="invite for"
            size={isMobile ? "small" : "medium"}
            sx={{
              border: "1px solid #0a9a92",
              borderRadius: "8px",
              padding: "10px 20px", // increased padding (vertical, horizontal)
              textTransform: "none",
              fontSize: "0.95rem",

              mb: 3,
              "& .MuiToggleButton-root": {
                border: "none",
                color: "#0a9a92",
                "&.Mui-selected": {
                  bgcolor: "#0a9a92",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#0a7f7a",
                  },
                },
              },
            }}
          >
            {inviteOptions.map((option) => (
              <ToggleButton key={option} value={option} aria-label={option} sx={{textTransform:'none'}}>
                {option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
</Box>
          <Box>

            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                px: 4,textTransform:'none',
                backgroundColor: "#0a9a92",
                color: "#fff", 
                "&:hover": {
                  backgroundColor: "#8dd9cb",
                },
              }}
              onClick={() => alert("Thank you for joining!")}
              disabled={inviteFor.size === 0}
            >
              Join Us
            </Button>

          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{bgcolor: "#fff",color: "#153f4b",py: 6,fontSize: 14,borderTop: "1px solid #ddd",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={4}
            mb={4}
          >
            {/* Contact & Logo */}
            <Box sx={{ minWidth: 200 }}>
              <Box display="flex" alignItems="center" sx={{ mb: 3,mt: 3,}}>
            <img  src={ayujalogo} alt="Ayuja Logo" width={100} height={28} style={{ marginRight: 10 }} />
        </Box>
              <Typography variant="body2" mb={1}>
               Personalized Care, Trusted by Communities.
              </Typography>
              <Typography variant="body2" mb={2}>
                Call: +91 7661889977
              </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="twitter"
              component="a"
              href="https://twitter.com"
              target="_blank"
              size="small"
              sx={{ ...socialButtonStyle }}
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="instagram"
              component="a"
              href="https://instagram.com"
              target="_blank"
              size="small"
              sx={{ ...socialButtonStyle }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="facebook"
              component="a"
              href="https://facebook.com"
              target="_blank"
              size="small"
              sx={{ ...socialButtonStyle }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="linkedin"
              component="a"
              href="https://linkedin.com"
              target="_blank"
              size="small"
              sx={{ ...socialButtonStyle }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="telegram"
              component="a"
              href="https://telegram.org"
              target="_blank"
              size="small"
              sx={{ ...socialButtonStyle }}
            >
              <TelegramIcon fontSize="small" />
            </IconButton>
          </Stack>
            </Box>

            {/* Explore */}

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Explore
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" underline="hover" color="inherit">
                  Services
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  About us
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  FAQs
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Contact
                </Link>
              </Stack>
            </Box>


            {/* Legal */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Legal
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" underline="hover" color="inherit">
                  Privacy Policy
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Terms of Services
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Documentation
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Help Center
                </Link>
              </Stack>
            </Box>

            {/* Subscribe */}
            <Box sx={{ minWidth: 220 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Subscribe
              </Typography>
              <Typography variant="body2" mb={1}>
                Subscribe to get the latest news from us
              </Typography>
              <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed!");
          }}
          sx={{display: "flex",alignItems: "center",position: "relative",maxWidth: 400,width: "100%",
          }}
        >
        <TextField
          size="small"
          placeholder="Your email"
          type="email"
          required
          sx={{
            backgroundColor: "#E5FDCF", 
            borderRadius: "20px",   
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",     
              backgroundColor: "#E5FDCF" 
            }
          }}
          InputProps={{
            startAdornment: (
              <EmailIcon sx={{ mr: 1, color: "#0a9a92" }} />
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "20px",
            px: 3,
            ml: "-20%",
            zIndex: 2,backgroundColor:'#0a9a92',textTransform:'none'
          }}
        >
          Subscribe
        </Button>
      </Box>

            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 4, px: 2 }} // Add horizontal padding as needed
          >
            {/* Left side: Links */}
            <Typography variant="caption" color="text.secondary">
              &copy; 2025 Ayuja. All Rights Reserved.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Link href="#" underline="hover" color="text.secondary" variant="caption">
                Privacy Policy
              </Link>
              <Link href="#" underline="hover" color="text.secondary" variant="caption">
                Terms of Services
              </Link>
              <Link href="#" underline="hover" color="text.secondary" variant="caption">
                Accessibility
              </Link>
            </Stack>
          </Stack>

        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
