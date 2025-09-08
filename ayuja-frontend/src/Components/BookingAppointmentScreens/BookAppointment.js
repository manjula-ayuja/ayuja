
// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Box,
//   MenuItem,Grid,
// } from "@mui/material";

// const BookAppointment = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     age:"",
//     gender: "", 
//     service: "",
//     time: "",
//     paymentMethod:"",
//     prescriptions: [],
//     terms: false,
//   });
//   const bookAppointmentApi = process.env.REACT_APP_BOOK_APPOINTMENT_API;
//   const prescriptionApi = process.env.REACT_APP_PRESCRIPTION_STORE_API;

//   const services = [
//     "Elderly and Childcare",
//     "Nursing & Physiotherapy Services",
//     "Medicine & Diagnostic Delivery",
//     "Emergency Care Support",
//     "Doctor Visit, Pickup & Drop",
//     "Social Wellness Activities",
//   ];
// // Payment Options
// const paymentMethods = [
//   { label: "Card", value: "card" },
//   { label: "UPI", value: "upi" },
//   { label: "Pay at Clinic", value: "offline" },
// ];

//   const gender = [
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" },
//   ];
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.gender || !formData.age || !formData.service || !formData.time) {
//       alert("gender, Service and Time are mandatory fields.");
//       return;
//     }
  
//     try {
//       // 1️⃣ Build payment object
//       const paymentData = {
//         amount: 500, // 💰 you can make this dynamic
//         method: formData.paymentMethod || "offline", // fallback to offline
//         status: "success", // assume success (later you can plug actual gateway response)
//         transaction_history: [
//           { timestamp: new Date().toISOString(), method: formData.paymentMethod },
//         ],
//       };
  
//       // 2️⃣ Build booking payload
//       const bookingPayload = {
//         name: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         age: formData.age,
//         gender: formData.gender,
//         service_type: formData.service,
//         date: formData.time, // already selected from form
//         notes: "Uploaded via frontend form",
//         payment: paymentData, // ✅ now added
//       };
  
//       // 3️⃣ Book appointment
//       const res = await fetch(bookAppointmentApi, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingPayload),
//       });
  
//       const bookingData = await res.json();
  
//       if (!res.ok) {
//         alert(bookingData.error || "Failed to book appointment");
//         return;
//       }
  
//       const bookingId = bookingData.booking_id;
//       console.log("✅ Booking created:", bookingId);
  
//       // 4️⃣ Upload prescriptions
//       if (formData.prescriptions.length > 0) {
//         for (const file of formData.prescriptions) {
//           const formDataObj = new FormData();
//           formDataObj.append("file", file);
  
//           const uploadRes = await fetch(`${prescriptionApi}/${bookingId}`, {
//             method: "POST",
//             body: formDataObj,
//           });
  
//           const uploadData = await uploadRes.json();
  
//           if (uploadRes.ok) {
//             console.log("📄 Prescription uploaded:", uploadData.file_path);
//           } else {
//             console.error("❌ Upload failed:", uploadData.error);
//           }
//         }
//       }
  
//       alert(`Appointment booked successfully!\n\nName: ${formData.fullName}\nTime: ${formData.time}`);

  
//       // 5️⃣ Reset the form
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         age: "",
//         gender: "",
//         service: "",
//         time: "",
//         paymentMethod: "",
//         prescriptions: [],
//         terms: false,
//       });
  
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Something went wrong while booking.");
//     }
//   };
  
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "file"
//           ? Array.from(files)
//           : value,
//     });
//   };
 
  
  
//   return (
//     <>
//     <Box sx={{ pb: 100,}}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           position: "absolute",
//           top: "60%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           height: "auto",
//           width: 350,
//           backgroundColor: "#075372",
//           color: "#fff",
//           p: 3,
//           borderRadius: "30px",
//           boxShadow: 5,
//           mb: 200,
//         }}
//       >
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
//           Book Appointment
//         </Typography>

//         {/* Full Name */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Full Name
//         </Typography>
//         <TextField
//           name="fullName"
//           placeholder="Enter Your Full Name"
//           variant="outlined"
//           fullWidth
//           value={formData.fullName}
//           onChange={handleChange}
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//         />

//         {/* Email */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Email Address
//         </Typography>
//         <TextField
//           name="email"
//           placeholder="Enter Your Email Address"
//           variant="outlined"
//           fullWidth
//           required
//           value={formData.email}
//           onChange={handleChange}
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//         />

//         {/* Phone */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Phone
//         </Typography>
//         <TextField
//           name="phone"
//           placeholder="Enter Your Mobile Number"
//           variant="outlined"
//           fullWidth
//           required
//           value={formData.phone}
//           onChange={handleChange}
//           inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//         />
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//          Age
//         </Typography>
//         <TextField
//           name="age"
//           placeholder="Enter the patient Age"
//           variant="outlined"
//           fullWidth
//           required
//           value={formData.age}
//           onChange={handleChange}
//           type="number"
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//         />

//         {/* gender Selection */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Select gender *
//         </Typography>
//         <TextField
//           select
//           label="Please select gender"
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           required
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4, }}
//         >
//           {gender.map((gender, index) => (
//             <MenuItem key={index} value={gender.value}>
//               {gender.label}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Service Selection */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Select Service *
//         </Typography>
//         <TextField
//           select
//           label="Please select service"
//           name="service"
//           value={formData.service}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           required
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//         >
//           {services.map((service, index) => (
//             <MenuItem key={index} value={service}>
//               {service}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Time Selection */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Appointment Time *
//         </Typography>
//         <TextField
//           name="time"
//           type="datetime-local"
//           value={formData.time}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           required
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           inputProps={{
//             min: new Date().toISOString().slice(0, 16), 
//           }}
//         />
//         {/* Prescription Upload */}
//          <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Upload Prescriptions
//         </Typography>
//           <TextField
//             type="file"
//             name="prescriptions"
//             inputProps={{ multiple: true, accept: "image/*,.pdf" }}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//             value="" 
//           />

//           {formData.prescriptions.length > 0 && (
//             <Typography variant="body2" sx={{ mb: 2 }}>
//               {formData.prescriptions.length} file(s) selected
//             </Typography>
//           )}

//         {/* Payment Method */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
//           Payment Method *
//         </Typography>
//         <TextField
//           select
//           label="Select payment method"
//           name="paymentMethod"
//           value={formData.paymentMethod || ""}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           required
//           sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 4 }}
//         >
//           {paymentMethods.map((method, index) => (
//             <MenuItem key={index} value={method.value}>
//               {method.label}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Terms */}
//         <FormControlLabel
//           control={
//             <Checkbox
//               name="terms"
//               checked={formData.terms}
//               onChange={handleChange}
//               required
//               sx={{ color: "white" }}
//             />
//           }
//           label={
//             <Typography variant="body2">
//               I accept all{" "}
//               <span style={{ color: "#4caf50" }}>terms and conditions</span>
//             </Typography>
//           }
//         />

//         {/* Submit Button */}
//         <Box textAlign="center" mt={2}>
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               backgroundColor: "#66f2a7",
//               color: "#003333",
//               fontWeight: "bold",
//               borderRadius: "8px",
//               py: 1.2,
//               "&:hover": { backgroundColor: "#55d792" },
//             }}
//           >
//             Book Now
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//     </>
//   );
// };

// export default BookAppointment;



// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Box,
//   MenuItem,Grid,
// } from "@mui/material";

// const BookAppointment = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     age:"",
//     gender: "", 
//     service: "",
//     time: "",
//     paymentMethod:"",
//     prescriptions: [],
//     terms: false,
//   });
//   const bookAppointmentApi = process.env.REACT_APP_BOOK_APPOINTMENT_API;
//   const prescriptionApi = process.env.REACT_APP_PRESCRIPTION_STORE_API;

//   const services = [
//     "Elderly and Childcare",
//     "Nursing & Physiotherapy Services",
//     "Medicine & Diagnostic Delivery",
//     "Emergency Care Support",
//     "Doctor Visit, Pickup & Drop",
//     "Social Wellness Activities",
//   ];
// // Payment Options
// const paymentMethods = [
//   { label: "Card", value: "card" },
//   { label: "UPI", value: "upi" },
//   { label: "Pay at Clinic", value: "offline" },
// ];

//   const gender = [
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" },
//   ];
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.gender || !formData.age || !formData.service || !formData.time) {
//       alert("gender, Service and Time are mandatory fields.");
//       return;
//     }
  
//     try {
//       // 1️⃣ Build payment object
//       const paymentData = {
//         amount: 500, // 💰 you can make this dynamic
//         method: formData.paymentMethod || "offline", // fallback to offline
//         status: "success", // assume success (later you can plug actual gateway response)
//         transaction_history: [
//           { timestamp: new Date().toISOString(), method: formData.paymentMethod },
//         ],
//       };
  
//       // 2️⃣ Build booking payload
//       const bookingPayload = {
//         name: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         age: formData.age,
//         gender: formData.gender,
//         service_type: formData.service,
//         date: formData.time, // already selected from form
//         notes: "Uploaded via frontend form",
//         payment: paymentData, // ✅ now added
//       };
  
//       // 3️⃣ Book appointment
//       const res = await fetch(bookAppointmentApi, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingPayload),
//       });
  
//       const bookingData = await res.json();
  
//       if (!res.ok) {
//         alert(bookingData.error || "Failed to book appointment");
//         return;
//       }
  
//       const bookingId = bookingData.booking_id;
//       console.log("✅ Booking created:", bookingId);
  
//       // 4️⃣ Upload prescriptions
//       if (formData.prescriptions.length > 0) {
//         for (const file of formData.prescriptions) {
//           const formDataObj = new FormData();
//           formDataObj.append("file", file);
  
//           const uploadRes = await fetch(`${prescriptionApi}/${bookingId}`, {
//             method: "POST",
//             body: formDataObj,
//           });
  
//           const uploadData = await uploadRes.json();
  
//           if (uploadRes.ok) {
//             console.log("📄 Prescription uploaded:", uploadData.file_path);
//           } else {
//             console.error("❌ Upload failed:", uploadData.error);
//           }
//         }
//       }
  
//       alert(`Appointment booked successfully!\n\nName: ${formData.fullName}\nTime: ${formData.time}`);

  
//       // 5️⃣ Reset the form
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         age: "",
//         gender: "",
//         service: "",
//         time: "",
//         paymentMethod: "",
//         prescriptions: [],
//         terms: false,
//       });
  
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Something went wrong while booking.");
//     }
//   };
  
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "file"
//           ? Array.from(files)
//           : value,
//     });
//   };
 
// return (
//   <Box sx={{ pb: 100, }}>
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         position: "absolute",
//         top: "60%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         height: "auto",
//         backgroundColor: "#075372",
//         color: "#fff",
//         p: 3,
//         borderRadius: "30px",
//         boxShadow: 5,
//         mb: 200,
//       }}
//     >
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
//         Book Appointment
//       </Typography>

//       {/* Row 1: Full Name & Email */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={6}>
//           <TextField
//             name="fullName"
//             placeholder="Full Name"
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             value={formData.fullName}
//             onChange={handleChange}
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             name="email"
//             placeholder="Email"
//             label="Email"
//             variant="outlined"
//             fullWidth
//             required
//             value={formData.email}
//             onChange={handleChange}
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           />
//         </Grid>
//       </Grid>

//       {/* Row 2: Phone & Age */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={6}>
//           <TextField
//             name="phone"
//             placeholder="Mobile Number"
//             label="Phone"
//             variant="outlined"
//             fullWidth
//             required
//             value={formData.phone}
//             onChange={handleChange}
//             inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             name="age"
//             placeholder="Age"
//             label="Age"
//             variant="outlined"
//             fullWidth
//             required
//             value={formData.age}
//             onChange={handleChange}
//             type="number"
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           />
//         </Grid>
//       </Grid>

//       {/* Row 3: Gender & Service (Select fields with fullWidth) */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={6}>
//           <TextField
//             select
//             label="Gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           >
//             {gender.map((g, index) => (
//               <MenuItem key={index} value={g.value}>
//                 {g.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             select
//             label="Service"
//             name="service"
//             value={formData.service}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           >
//             {services.map((service, index) => (
//               <MenuItem key={index} value={service}>
//                 {service}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>
//       </Grid>

//       {/* Row 4: Time & Payment Method */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={6}>
//           <TextField
//             name="time"
//             type="datetime-local"
//             label="Appointment Time"
//             value={formData.time}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//             InputLabelProps={{ shrink: true }}
//             inputProps={{
//               min: new Date().toISOString().slice(0, 16),
//             }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             select
//             label="Payment Method"
//             name="paymentMethod"
//             value={formData.paymentMethod || ""}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//           >
//             {paymentMethods.map((method, index) => (
//               <MenuItem key={index} value={method.value}>
//                 {method.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>
//       </Grid>

//       {/* Prescriptions Upload, Terms & Submit */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12}>
//           <TextField
//             type="file"
//             name="prescriptions"
//             inputProps={{ multiple: true, accept: "image/*,.pdf" }}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             sx={{ backgroundColor: "#fff", borderRadius: 4 }}
//             value=""
//           />
//           {formData.prescriptions.length > 0 && (
//             <Typography variant="body2">
//               {formData.prescriptions.length} file(s) selected
//             </Typography>
//           )}
//         </Grid>
//       </Grid>

//       <FormControlLabel
//         control={
//           <Checkbox
//             name="terms"
//             checked={formData.terms}
//             onChange={handleChange}
//             required
//             sx={{ color: "white" }}
//           />
//         }
//         label={
//           <Typography variant="body2">
//             I accept all{" "}
//             <span style={{ color: "#4caf50" }}>terms and conditions</span>
//           </Typography>
//         }
//       />

//       <Box textAlign="center" mt={2}>
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{
//             backgroundColor: "#66f2a7",
//             color: "#003333",
//             fontWeight: "bold",
//             borderRadius: "8px",
//             py: 1.2,
//             "&:hover": { backgroundColor: "#55d792" },
//           }}
//         >
//           Book Now
//         </Button>
//       </Box>
//     </Box>
//   </Box>
// );

// };

// export default BookAppointment;











import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  MenuItem,
  Grid,
} from "@mui/material";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    service: "",
    time: "",
    paymentMethod: "",
    upiApp: "",     // 🔹 new field
    cardType: "",   // 🔹 new field
    prescriptions: [],
    terms: false,
  });

  const bookAppointmentApi = process.env.REACT_APP_BOOK_APPOINTMENT_API;
  const prescriptionApi = process.env.REACT_APP_PRESCRIPTION_STORE_API;





  const services = [
    "Elderly and Childcare",
    "Nursing & Physiotherapy Services",
    "Medicine & Diagnostic Delivery",
    "Emergency Care Support",
    "Doctor Visit, Pickup & Drop",
    "Social Wellness Activities",
  ];

  // Payment Options
  const paymentMethods = [
    { label: "Card", value: "card" },
    { label: "UPI", value: "upi" },
    { label: "Pay at Clinic", value: "offline" },
  ];

  const upiOptions = [
    { label: "Paytm", value: "paytm" },
    { label: "Google Pay", value: "gpay" },
    { label: "PhonePe", value: "phonepe" },
  ];

  const cardOptions = [
    { label: "Credit Card", value: "credit" },
    { label: "Debit Card", value: "debit" },
  ];

  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gender || !formData.age || !formData.service || !formData.time) {
      alert("Gender, Service and Time are mandatory fields.");
      return;
    }

    try {
      // 1️⃣ Build payment object
      const paymentData = {
        amount: 500, // 💰 you can make this dynamic
        method: formData.paymentMethod || "offline",
        status: "success",
        details:
          formData.paymentMethod === "upi"
            ? { upiApp: formData.upiApp }
            : formData.paymentMethod === "card"
            ? { cardType: formData.cardType }
            : {},
        transaction_history: [
          { timestamp: new Date().toISOString(), method: formData.paymentMethod },
        ],
      };



// 1️⃣ Process payment first
const paymentRes = await fetch("http://localhost:5001/api/flask/booking/process-payment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    method: formData.paymentMethod,
    details: formData.paymentMethod === "upi"
      ? { upiApp: formData.upiApp }
      : formData.paymentMethod === "card"
      ? { cardType: formData.cardType }
      : {},
  }),
});

const paymentResult = await paymentRes.json();

if (paymentResult.status !== "success") {
  alert("Payment failed. Try again.");
  return;
}



      // 2️⃣ Build booking payload
      const bookingPayload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        service_type: formData.service,
        date: formData.time,
        notes: "Uploaded via frontend form",
        payment: paymentData,
      };

      // 3️⃣ Book appointment
      const res = await fetch(bookAppointmentApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const bookingData = await res.json();

      if (!res.ok) {
        alert(bookingData.error || "Failed to book appointment");
        return;
      }

      const bookingId = bookingData.booking_id;
      console.log("✅ Booking created:", bookingId);

      // 4️⃣ Upload prescriptions
      if (formData.prescriptions.length > 0) {
        for (const file of formData.prescriptions) {
          const formDataObj = new FormData();
          formDataObj.append("file", file);

          const uploadRes = await fetch(`${prescriptionApi}/${bookingId}`, {
            method: "POST",
            body: formDataObj,
          });

          const uploadData = await uploadRes.json();

          if (uploadRes.ok) {
            console.log("📄 Prescription uploaded:", uploadData.file_path);
          } else {
            console.error("❌ Upload failed:", uploadData.error);
          }
        }
      }

      alert(
        `Appointment booked successfully!\n\nName: ${formData.fullName}\nTime: ${formData.time}`
      );

      // 5️⃣ Reset the form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        service: "",
        time: "",
        paymentMethod: "",
        upiApp: "",
        cardType: "",
        prescriptions: [],
        terms: false,
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while booking.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? Array.from(files)
          : value,
    });
  };

  return (
    <Box sx={{ pb: 100 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          backgroundColor: "#075372",
          color: "#fff",
          p: 3,
          borderRadius: "30px",
          boxShadow: 5,
          mb: 200,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
          Book Appointment
        </Typography>

        {/* Row 1: Full Name & Email */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              name="fullName"
              placeholder="Full Name"
              label="Full Name"
              variant="outlined"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              placeholder="Email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            />
          </Grid>
        </Grid>

        {/* Row 2: Phone & Age */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              name="phone"
              placeholder="Mobile Number"
              label="Phone"
              variant="outlined"
              fullWidth
              required
              value={formData.phone}
              onChange={handleChange}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="age"
              placeholder="Age"
              label="Age"
              variant="outlined"
              fullWidth
              required
              value={formData.age}
              onChange={handleChange}
              type="number"
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            />
          </Grid>
        </Grid>

        {/* Row 3: Gender & Service */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            >
              {gender.map((g, index) => (
                <MenuItem key={index} value={g.value}>
                  {g.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            >
              {services.map((service, index) => (
                <MenuItem key={index} value={service}>
                  {service}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Row 4: Time & Payment Method */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              name="time"
              type="datetime-local"
              label="Appointment Time"
              value={formData.time}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod || ""}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
            >
              {paymentMethods.map((method, index) => (
                <MenuItem key={index} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* 🔹 Conditional Payment Sub-Options */}
        {formData.paymentMethod === "upi" && (
          <TextField
            select
            label="Select UPI App"
            name="upiApp"
            value={formData.upiApp}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "#fff", borderRadius: 4, mb: 2 }}
          >
            {upiOptions.map((upi, index) => (
              <MenuItem key={index} value={upi.value}>
                {upi.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {formData.paymentMethod === "card" && (
          <TextField
            select
            label="Select Card Type"
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "#fff", borderRadius: 4, mb: 2 }}
          >
            {cardOptions.map((card, index) => (
              <MenuItem key={index} value={card.value}>
                {card.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Prescriptions Upload */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <TextField
              type="file"
              name="prescriptions"
              inputProps={{ multiple: true, accept: "image/*,.pdf" }}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "#fff", borderRadius: 4 }}
              value=""
            />
            {formData.prescriptions.length > 0 && (
              <Typography variant="body2">
                {formData.prescriptions.length} file(s) selected
              </Typography>
            )}
          </Grid>
        </Grid>

        <FormControlLabel
          control={
            <Checkbox
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              sx={{ color: "white" }}
            />
          }
          label={
            <Typography variant="body2">
              I accept all{" "}
              <span style={{ color: "#4caf50" }}>terms and conditions</span>
            </Typography>
          }
        />

        <Box textAlign="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#66f2a7",
              color: "#003333",
              fontWeight: "bold",
              borderRadius: "8px",
              py: 1.2,
              "&:hover": { backgroundColor: "#55d792" },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookAppointment;
