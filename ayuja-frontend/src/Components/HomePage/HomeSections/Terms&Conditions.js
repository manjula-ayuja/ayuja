import React from "react";
import { Container, Typography, Paper, Box, List, ListItem, ListItemText } from "@mui/material";
import Footer from "../../Common/Footer";

const TermsConditions = () => {
  return (
     <>
  <Box sx={{ bgcolor: "#006D77", color: "white", p: 3, mb: 4,minHeight:"30vh",minWidth:"100vh"}}>
     <Typography variant="h3" sx={{color: "#fff",fontWeight: "bold",maxWidth: "900px", textAlign: "center",mx: "auto",mb: 1,lineHeight: 1.6,}}>
     Terms & Conditions                </Typography>
        <Typography variant="h6" sx={{color: "#E5FDCF",fontWeight: 500,maxWidth: "900px", textAlign: "center",mx: "auto",mb: 1,lineHeight: 1.6,}}>
        By using Ayuja’s services, you agree to the following:
        </Typography>
      </Box>
      <Container>
      <Paper elevation={3} sx={{ mb: 4,p: 4, borderRadius: 2, border: "2px solid #DCD7D7",marginTop:"-190px",backgroundColor:"#F8F7F7" ,color:"#22577A"}}>
          <List >
            <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemText
                primary="1. Community Access Requirement"
                primaryTypographyProps={{ fontWeight: "bold",}}
                secondary="To ensure safety and trust, Ayuja services are available exclusively to verified members of registered gated communities. Verification may include address proof or confirmation from the community’s management. We reserve the right to deny or suspend service if residency cannot be confirmed."
                secondaryTypographyProps={{sx: { color: "#22577A" } }}

              />
            </ListItem>

            <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemText
                primary="2. Not a Substitute for Emergency Medical Care"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="Ayuja is designed to provide non-emergency healthcare support such as nursing care, physiotherapy, and wellness services. It is not a replacement for hospital emergency departments or urgent care. In case of serious or life-threatening conditions, please contact your nearest hospital or emergency service immediately."
                secondaryTypographyProps={{sx: { color: "#22577A" } }}
              />
            </ListItem>

            <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemText
                primary="3. Cancellation Policy"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="To maintain service quality and efficient scheduling, all cancellations must be made at least 24 hours in advance of your scheduled appointment. Late cancellations or no-shows may incur a cancellation fee or impact your ability to book future appointments."
                secondaryTypographyProps={{sx: { color: "#22577A" } }}
            />
            </ListItem>

            <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemText
                primary="4. Service Modifications and Updates"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="Ayuja reserves the right to modify service terms, pricing, features, or availability at any time without prior notice. While we strive to inform users in advance, changes may occur due to operational, regulatory, or service quality improvements."
                secondaryTypographyProps={{sx: { color: "#22577A" } }}
              />
            </ListItem>

            <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
              <ListItemText
                primary="5. Misuse and Suspension of Services"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="Any unauthorized use, abusive behavior, fraudulent activity, or violation of Ayuja’s service guidelines may result in immediate suspension or permanent termination of your access to the app or services. This includes but is not limited to sharing your login credentials, providing false information, or harassing staff or providers."
                secondaryTypographyProps={{sx: { color: "#22577A" } }}
              />
            </ListItem>
          </List>

          <Typography variant="body1" sx={{ mt: 3 }}>
            Please contact us at{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              support@ayuja.life
            </Typography>
            .
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default TermsConditions;