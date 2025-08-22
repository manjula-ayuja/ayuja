
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AboutusImage from "../../Logos/Aboutus.png"
import screenimage from "../../Logos/screenimage.png"
import Footer from "../../Common/Footer"

const AboutUs = () => {
  const points = [
    "Quality healthcare and emotional support delivered to your home",
    "Routine checkups and care for elderly family members",
    "Safe medicine delivery directly to your doorstep",
    "Escort services for children to diagnostic labs",
    "Swift and reliable response during medical emergencies",
    "Trusted, timely, and compassionate care—whenever it’s needed",
  ];
  const services = [
    "Medical and diagnostic home delivery",
    "Emergency support with 24/7 readiness",
    "Transportation for hospital visits",
    "Routine health checkups and caregiver assistance",
    "Child care, elderly companionship, and social wellness activities",
  ];
  return (
       <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", pt: 0, pb: 0,m: 0,   }}>

        {/* Mission & Vision Section */}

 <div style={{ display: "flex", alignItems: "stretch", minHeight: "5vh",pb:0 ,gap:0 }}>
  {/* Left Side - Image */}
  <div style={{ flex: 1 }}>
    <img
     src={AboutusImage}
      alt="About Us"
      style={{ width: "90%", height: "100%", objectFit: "cover",borderRadius:"0px 0px 100px 0px" }}
    />
  </div>

  {/* Right Side - Cards */}
  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0px",margin:0 }}>
    {/* Mission */}
    <div style={{ background: "#d4f8d4", padding: "20px", marginBottom: "20px", borderRadius: "0px 0px 0px 100px",width:"60%",height:"30%" }}>
      <h3 style={{marginLeft:"30px",fontSize:"30px" }}>Our Mission</h3>
      <p style={{marginLeft:"30px",fontSize:"20px"}}>
        To provide comprehensive medical, physical, mental, and emotional care
        directly to your doorstep using intelligent technology and compassionate
        human touch, making healthcare accessible for everyone.
      </p>
    </div>

    {/* Vision */}
    <div style={{ background: "#052c54", color: "white",padding: "20px", marginBottom: "20px", borderRadius: "0px 0px 0px 100px",width:"60%", height:"30%" }}>
      <h3 style={{marginLeft:"30px",fontSize:"30px" }}>Our Vision</h3>
      <p style={{ marginLeft:"30px",fontSize:"20px" }}>
        Unique care — no family member is forgotten. we are by your side.
      </p>
    </div>
  </div>
</div>

  <Box component="img" src={screenimage} alt="About Us"
    sx={{width: "100%",height: "10vh",objectFit: "cover",borderRadius: "0px 0px 100px 0px",display: "block",}}
  />

        <Box sx={{ bgcolor: "#006D77", color: "white", borderRadius: "100px 0px 100px 0px", p: 6, mb: 4,}}>
        <Typography variant="body1" sx={{fontSize: 20,fontFamily:"Montserrat",ml: 40,mr: 40}}>
           <Box component="span" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
             Ayuja
           </Box>{" "}
             Life Care is a tech-enabled community healthcare platform delivering comprehensive medical services to gated community residents. Our services include medicine delivery, diagnostic sample collection, elderly care, childcare, women and maternity care, emergency support, nursing services, and wellness programs. Our focus is on creating a seamless, timely, and personalized healthcare experience
               combining technology with human touch.
        </Typography>
        </Box>

        {/* Compassionate Care Section */}
      
    <Box
      sx={{border: "1.5px solid #006D77",borderRadius: "10px",p: 3,maxWidth: "80%",
        mx: "auto",mt: 5,position: "relative",boxShadow: "0 4px 10px rgba(0,0,0,0.05)", }}>
      {/* Header Tab */}
      <Box
        sx={{position: "absolute",top: "-20px",left: "50%",transform: "translateX(-50%)",backgroundColor: "#E6F4F3",border: "2px solid #006D77",borderRadius: "50px",px: 3,py: 0.5,}}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#006D77", textAlign: "center" }}
        >
          Compassionate Healthcare at Your Doorstep
        </Typography>
      </Box>

      {/* Points */}
      <Box sx={{ mt: 4 }}>
        {points.map((point, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "flex-start",marginLeft:"50px" ,mb: 2.5 }}
          >
            <CheckCircleIcon sx={{ color: "#00C853", mr: 1, mt: "2px" }} />
            <Typography variant="body1">{point}</Typography>
          </Box>
        ))}
      </Box>
    </Box>



   {/* Services Section */}

   <Box sx={{ textAlign: "center", py: 6, px: 2, backgroundColor: "#fff" }}>

    <Typography variant="h6" sx={{color: "#22577A",fontSize:25,fontWeight: 500,maxWidth: "700px", textAlign: "center",mx: "auto",mb: 4,lineHeight: 1.6,}}>
      By combining the power of personalized human care <br />
      with intelligent technology, Ayuja offers <br />
      a wide range of services including:
    </Typography>

      <Grid container spacing={3} justifyContent="center"
        sx={{ maxWidth: "900px", mx: "auto", mb: 4}}
      >
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{display: "flex",alignItems: "flex-start",justifyContent: "center",textAlign: "left",}}>
              <CheckCircleIcon sx={{ color: "#fff",backgroundColor:"#006D77",borderRadius:"20px", mr: 1, mt: "3px",padding :0.5 }} />
              <Typography variant="body1" sx={{ color: "#006D77",fontWeight: "bold" }}>
                {service}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
  <Button
    variant="contained"
    sx={{backgroundColor: "#006D77",px: 4,py: 1,borderRadius: "25px",textTransform: "none",fontWeight: 500,
      "&:hover": { backgroundColor: "#00695c" },
    }}
  >
    View All Services
  </Button>
</Box>

</Box>


        <Box sx={{ bgcolor: "#22577A", color: "white", textAlign: "center", borderRadius: 2, p: 3,}} >
          <Typography variant="h6" sx={{color: "#fff",fontWeight: 500,maxWidth: "900px", textAlign: "center",mx: "auto",mb: 1,lineHeight: 1.6,}}>
              Our platform connects residents, caregivers, healthcare professionals,and operations <br />
              staff through an intuitive app ecosystem—making bookings, rescheduling,<br />
              feedback, and care coordination seamless and
              stress-free.
            </Typography>
        </Box>
        <div>
          <Footer />
        </div>
    </Box>
 
  );
};

export default AboutUs;