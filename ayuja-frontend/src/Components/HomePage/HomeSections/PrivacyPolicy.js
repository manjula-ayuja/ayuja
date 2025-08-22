import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import Footer from "../../Common/Footer";
const PrivacyPolicy = () => {
  return (

    <>
         <Box sx={{ bgcolor: "#006D77", color: "white", p: 3, mb: 4,minHeight:"30vh",minWidth:"100vh"}}>
     <Typography variant="h3" sx={{color: "#fff",fontWeight: "bold",maxWidth: "900px", textAlign: "center",mx: "auto",mb: 1,lineHeight: 1.6,}}>
          Privacy Policy
        </Typography>
        <Typography variant="h6" sx={{color: "#E5FDCF",fontWeight: 500,maxWidth: "900px", textAlign: "center",mx: "auto",mb: 1,lineHeight: 1.6,}}>
          At Ayuja, your privacy is a top priority. This Privacy Policy explains how we <br />
          collect, use, store, and protect your personal and medical information.
        </Typography>
      </Box>
    <Container>
      {/* Header */}


      {/* Policy Content */}
      <Paper elevation={3} sx={{ mb: 4,p: 4, borderRadius: 2, border: "2px solid #DCD7D7",marginTop:"-190px",backgroundColor:"#F8F7F7" ,color:"#22577A"}}>
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold" >
            1. Information We Collect
          </Typography>
          <Typography variant="body1" sx={{ mt: 1}}>
            We collect personal and medical data only as necessary to provide you with quality healthcare services. 
            This may include:
          </Typography>
          <ul>
            <li>Full name, contact details, and address</li>
            <li>Medical history and health information</li>
            <li>Emergency contact information</li>
          </ul>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            2. How We Use Your Data
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Your information is used only to:
          </Typography>
          <ul>
            <li>Deliver healthcare services tailored to your needs</li>
            <li>Coordinate with healthcare professionals when required</li>
            <li>Contact you regarding appointments, treatments, or service updates</li>
          </ul>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            3. Data Security
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            We maintain strict security protocols to protect your information:
          </Typography>
          <ul>
            <li>All data is securely stored and encrypted</li>
            <li>Only authorized staff members have access to your data</li>
          </ul>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            4. Sharing of Information
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            We do not share your personal or medical data with third parties, except:
          </Typography>
          <ul>
            <li>With your explicit consent</li>
            <li>In case of medical emergencies</li>
            <li>When required by applicable law or government authorities</li>
          </ul>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            5. Your Rights
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            You have full control over your information. You may:
          </Typography>
          <ul>
            <li>Request access to the data we hold about you</li>
            <li>Ask for updates or corrections to your data</li>
            <li>Request deletion of your information</li>
          </ul>
          <Typography variant="body1" mt={2}>
            To exercise these rights, please contact us at{" "}
            <strong>support@ayuja.life</strong>.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold">
            6. Updates to This Policy
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            We may update this Privacy Policy as needed. Any changes will be posted on our 
            website with the revised date.
          </Typography>
        </Box>
      </Paper>

         
    </Container>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
