
import React from 'react';
import {
  Typography,
  Button,
  Grid,
  CardContent,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import emergencyImage from "../../Logos/packageemergency.png";
import DoctorImage from "../../Logos/packagedoctor.png";
import ChildImage from "../../Logos/packagechild.png"
import WellnessImage from "../../Logos/packagewellness.png"
import nurseImage from "../../Logos/packagenurse.png"
import Footer from "../../Common/Footer";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#006D77',
  padding: '10px 0',
  textAlign: 'center',
}));

const PackageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: "transparent",
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: '38px',
  fontWeight: 500,
  color: '#fff',
  fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
}));

const PriceUnit = styled('span')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 400,
  fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
}));

const GetInTouchButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F9F2FF',
  color: '#006D77',
  textTransform: 'none',
  fontWeight: 500,
  padding: '12px 32px',
  borderRadius: '50px',
  width: '25%',
  margin: '24px auto 0',
  display: 'block', marginBottom: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: '#fff',
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),  marginBottom: theme.spacing(2),backgroundColor: '#E5FDCF',borderRadius:"50px" 
}));
const PlanFeature = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
}));
function Packages() {
  return (
    <Box>

      {/* Hero Section */}
      <HeroSection>
          <Typography variant="h3" sx={{color: "#fff",fontWeight: "bold",maxWidth: "900px", textAlign: "center",mx: "auto",mb: 1,lineHeight: 1.6,}}>
            Our Packages
          </Typography>
          <Typography variant="h6" sx={{ color: '#E5FDCF', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Ayuja is beginning with trusted medicine and diagnostic home delivery services tailored for residents in gated communities. We ensure timely, reliable, and compassionate care right at your doorstep.
          </Typography>
      </HeroSection>

      {/* Packages Section */}
        <Grid container spacing={4}  justifyContent="center">
          {/* Starter Care Plan */}
          <Grid item xs={12} md={6} >
            <PackageContainer>
              <CardContent sx={{ p: 0, flexGrow: 1 }}>
                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold',color:"#0161AB" }}>
                  Starter Care Plan
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#9e9e9e', fontWeight: 10,}}>
                  Currently Available
                </Typography>
                <Box sx={{ mb: 1,backgroundColor:"#0161AB",borderRadius:"20px"}}>
             
                <Box sx={{ mb: 1, marginLeft: "40px" }}>
                  <PriceText component="span" sx={{ color: "#fff" }}>
                    $49
                    <PriceUnit >/mo</PriceUnit>
                  </PriceText>
                </Box>

                <Typography variant="body1" sx={{ mb: 3, color: '#fff', lineHeight: 1.6 ,marginLeft:"40px"}}>
                  Perfect for residents needing consistent access to <br/>
                  medicines and lab diagnostics without stepping out.
                </Typography>

                <Box sx={{ mb: 4,marginLeft:"40px" }}>
                  <PlanFeature>
                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20, mt: 0.5 }} />
                    <Typography variant="body2" color= '#fff'>
                      Doorstep medicine delivery (prescription-based)
                    </Typography>
                  </PlanFeature>
                  <PlanFeature>
                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20, mt: 0.5 }} />
                    <Typography variant="body2" color= '#fff'>
                      Diagnostic sample collection at home
                    </Typography>
                  </PlanFeature>
                  <PlanFeature>
                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20, mt: 0.5 }} />
                    <Typography variant="body2" color= '#fff'>
                      Coordination with partnered pharmacies and labs
                    </Typography>
                  </PlanFeature>
                  <PlanFeature>
                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20, mt: 0.5 }} />
                    <Typography variant="body2" color= '#fff'>
                      Digital reports & alerts through our mobile/web app
                    </Typography>
                  </PlanFeature>
                  <PlanFeature>
                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20, mt: 0.5 }} />
                    <Typography variant="body2" color= '#fff'>
                      Customer support for order tracking & reorders
                    </Typography>
                  </PlanFeature>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <GetInTouchButton>
                    Get in touch
                  </GetInTouchButton>
                </Box>

              </Box>
                <Typography variant="body2" sx={{ mt: 3, color: '#666666', textAlign: 'center', lineHeight: 1.5 }}>
                  No subscription required. Pay per request or choose a monthly concierge plan for regular support.
                </Typography>
              </CardContent>
            </PackageContainer>
          </Grid>

          {/* Free/Coming Soon Plan */}
          <Grid item xs={12} md={6}>
            <PackageContainer>
              <CardContent sx={{ p: 4, flexGrow: 1,mt: 4 }}>
                <Typography variant="subtitle1" sx={{ color: '#9e9e9e', fontWeight: 10,}}>
                  Launching Soon
                </Typography>

                <Typography variant="body1" sx={{ mb: 3, color: '#121212', lineHeight: 1.6 }}>
                  We're working on expanding our platform to include:
                </Typography>

                <Box sx={{ mb: 4 }}>
                <FeatureItem >
                    <Box
                      component="img"
                      src={emergencyImage}
                      alt=""
                      sx={{width: 50,height: 50,  mt: 0.5,backgroundColor: "#006D77",borderRadius: "50%",}}
                    />
                    <Typography variant="body2" fontSize="18px" color="#006D77">
                      Emergency care coordination
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                  <Box
                      component="img"
                      src={nurseImage}
                      alt=""
                      sx={{width: 50,height: 50,  mt: 0.5,backgroundColor: "#006D77",borderRadius: "50%",}}
                    />
                    <Typography variant="body2" fontSize="18px" color="#006D77">
                      Nursing & physiotherapy support at home
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                  <Box
                      component="img"
                      src={ChildImage}
                      alt=""
                      sx={{width: 50,height: 50,  mt: 0.5,backgroundColor: "#006D77",borderRadius: "50%",}}
                    />
                    <Typography variant="body2" fontSize="18px" color="#006D77">
                      Child care & elderly wellness check-ins
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                  <Box
                      component="img"
                      src={DoctorImage}
                      alt=""
                    sx={{width: 50,height: 50,  mt: 0.5,backgroundColor: "#006D77",borderRadius: "50%",}}
                    />
                    
                    <Typography variant="body2" fontSize="18px" color="#006D77">
                      Doctor appointment transport & scheduling
                    </Typography>
                  </FeatureItem>
                  <FeatureItem>
                  <Box
                      component="img"
                      src={WellnessImage}
                      alt=""
                      sx={{width: 50,height: 50,  mt: 0.5,backgroundColor: "#006D77",borderRadius: "50%",}}
                    />
                    <Typography variant="body2" fontSize="18px" color="#006D77">
                      Community wellness activities
                    </Typography>
                  </FeatureItem>
                </Box>

                <Typography variant="body2" sx={{ color: '#666666', lineHeight: 1.5, fontStyle: 'italic' }}>
                  Stay tuned — new care plans will be rolled out as we grow with your community's needs.
                </Typography>
              </CardContent>
            </PackageContainer>
          </Grid>
        </Grid>
<Footer/>
    </Box>
  );
}

export default Packages;