

// import React, { useState } from "react";
// import {Box,Grid,Typography,TextField,Button,RadioGroup,FormControlLabel,Radio,Paper,IconButton,CardContent
// } from "@mui/material";
// import {Phone,Email,LocationOn,Facebook,Twitter,Instagram,LinkedIn
// } from "@mui/icons-material";
// import Footer from "../../Common/Footer";
// import { styled } from '@mui/material/styles';
// const ContactUs = () => {
//   const PackageContainer = styled(Box)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     padding: theme.spacing(3),
//   }));
//   const PackageContent = styled(Box)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     padding: theme.spacing(5),color:"#fff",
//     backgroundColor: "#006D77",marginTop:"30px",marginLeft:"30px"
//   }));


//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     service: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 4 ,backgroundColor:"#fff"}}>
//       <Grid container spacing={1} >
//         {/* Left Panel */}
//       <Grid container spacing={4}  sx={{backgroundColor:"#fff",marginLeft:"40px"}}  >
//           <Grid>
//             <PackageContent>
//               <CardContent sx={{ p: 0, flexGrow: 1 }}>
//               <Box>
//             <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//               Contact Information
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
//               For emergency support or care requests, 
//               please use the app or dial
//               our 24x7 helpline.
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
//               <Phone sx={{ mr: 1,}} />
//               <Typography variant="body2">+91-7661898997</Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
//               <Email sx={{ mr: 1 }} />
//               <Typography variant="body2">support@ayuja.life</Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <LocationOn sx={{ mr: 1 }} />
//               <Typography variant="body2" sx={{ lineHeight: 2.0}}>
//                 Ayuja Lifecare Services
//                 <br />
//                 Plot No 383, Reddy’s avenue,
//                 <br />
//                 Nizampet, Hyderabad, Telangana,
//                 <br />
//                 India, 500090
//               </Typography>
//             </Box>
//           </Box>

//           {/* Social Icons */}
//           <Box sx={{ display: "flex", gap: 1, mt: 15}}>
//             <IconButton color="inherit">
//               <Facebook />
//             </IconButton>
//             <IconButton color="inherit">
//               <Twitter />
//             </IconButton>
//             <IconButton color="inherit">
//               <Instagram />
//             </IconButton>
//             <IconButton color="inherit">
//               <LinkedIn />
//             </IconButton>
//           </Box>
//               </CardContent>
//             </PackageContent>
//           </Grid>

//           {/* Free/Coming Soon Plan */}
//           <Grid item xs={12} md={6}>
//             <PackageContainer>
//               <CardContent sx={{ p: 4, flexGrow: 1,mt: 4 }}>
               
//               <Grid container spacing={20}>
//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr", 
//                   gap: 1,
//                   width:"100%",gap:3
//                 }}
//               >

//       {/* Row 2 - First / Last Name */}
//       <Grid item xs={12} md={6}>
//           <TextField
//             label="First Name"
//             name="firstName"
//             fullWidth
//             variant="standard"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             label="Last Name"
//             name="lastName"
//             fullWidth
//             variant="standard"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             fullWidth
//             variant="standard"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             label="Phone Number"
//             name="phone"
//             fullWidth
//             variant="standard"
//             value={formData.phone}
//             onChange={handleChange}
//             defaultValue="+91 "
//           />
//         </Grid>
//             </Box>
//              </Grid>

//   <Box sx={{ mt: 5 }}>
//   <Typography variant="subtitle1" sx={{ mb: 0.5,color:"#011C2A",fontWeight:"bold" }}>
//     Select Service?
//   </Typography>

//   <RadioGroup>
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr 1fr", 
//         gap: 1,
//       }}
//     >
//       <FormControlLabel
//         value="elderly"
//         control={<Radio />}
//         label="Elderly and Childcare"
//       />
//       <FormControlLabel
//         value="emergency"
//         control={<Radio />}
//         label="Emergency Care Support"
//       />
//       <FormControlLabel
//         value="nursing"
//         control={<Radio />}
//         label="Nursing & Physiotherapy Services"
//       />
//       <FormControlLabel
//         value="doctor"
//         control={<Radio />}
//         label="Doctor Visit, Pickup & Drop"
//       />
//       <FormControlLabel
//         value="medicine"
//         control={<Radio />}
//         label="Medicine & Diagnostic Delivery"
//       />
//       <FormControlLabel
//         value="social"
//         control={<Radio />}
//         label="Social Wellness Activities"
//       />
//     </Box>
//   </RadioGroup>
// </Box>


//           {/* Message */}
//           <Box sx={{ mt: 3 }}>
//             <TextField
//               fullWidth
//               label="Message"
//               multiline
//               rows={4}
//               placeholder="Write your message..."
//             />
//           </Box>

//           {/* Submit Button */}
//           <Box sx={{ mt: 3, textAlign: "right" }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#00796b",
//                 "&:hover": { backgroundColor: "#004d40" },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//               </CardContent>
//             </PackageContainer>
//           </Grid>
//         </Grid>
//         </Grid>
//           <Box 
//             sx={{width: "100%",height: "10vh",display: "block",}}
//           />
//         <Footer/>
//     </Paper>
//   );
// };

// export default ContactUs;











import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  CardContent,
} from "@mui/material";
import {
  Phone,
  Email,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,Telegram,
} from "@mui/icons-material";
import Footer from "../../Common/Footer";
import { styled } from "@mui/material/styles";

const PackageContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(5),
  color: "#fff",
  backgroundColor: "#006D77",
  borderRadius: "16px",
}));

const socialLinks = [
  { icon: <Facebook />, url: "https://www.facebook.com/ayuja.life" },
  { icon: <Twitter />, url: "https://x.com/ayuja_life" },
  { icon: <Instagram />, url: "https://www.instagram.com/ayuja.life" },
  { icon: <LinkedIn />, url: "https://www.linkedin.com/in/ayuja-lifecare-8a0892369/" },
  { icon: <Telegram />, url: "https://t.me/ayuja_life" },
  
];

const ContactUs = () => {
  return (
    <>
    <Paper
      elevation={3}
      sx={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <PackageContent>
            <CardContent sx={{ p: 0, width: "100%" }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  For emergency support or care requests, <br/>
                  please use the app or
                  dial our 24x7 helpline.
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <Phone sx={{ mr: 1 }} />
                  <Typography variant="body1">+91-7661898997</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                  <Email sx={{ mr: 1 }} />
                  <Typography variant="body1">support@ayuja.life</Typography>
                </Box>

                {/* Social Icons */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
                  {socialLinks.map((social, idx) => (
                    <IconButton
                      key={idx}
                      color="inherit"
                      sx={{
                        transition: "transform 0.2s",
                        "&:active": { transform: "scale(1.3)" },
                        color: "#fff",
                      }}
                      onClick={() => window.open(social.url, "_blank")}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </PackageContent>
        </Grid>
      </Grid>
   
    </Paper>
       <Footer />
       </>
  );
};

export default ContactUs;
