


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage/HomePage";
import AboutUs from "./Components/HomePage/HomeSections/Aboutus";
import Packages from "./Components/HomePage/HomeSections/Packages";
import ContactUs from "./Components/HomePage/HomeSections/contact";
import PrivacyPolicy from "./Components/HomePage/HomeSections/PrivacyPolicy";
import TermsConditions from "./Components/HomePage/HomeSections/Terms&Conditions";
import Documentation from "./Components/HomePage/HomeSections/Documentation";
import HelpCenter from "./Components/HomePage/HomeSections/HelpCenter";
import ElderChildCare from "./Components/HomePage/HomeSections/Elder&ChildCare";
import NursingPhysiotherapy from "./Components/HomePage/HomeSections/Nursing&Physiotherapy";
import DoctorVisitPickup from "./Components/HomePage/HomeSections/DoctorVisitPickup";
import MedicineDiagnosticDelivery from "./Components/HomePage/HomeSections/MedicineDiagnosticDelivery";
import SocialWellness from "./Components/HomePage/HomeSections/SocialWellness";
import EmergencyCare from "./Components/HomePage/HomeSections/EmergencyCareSupport";

import BookAppointment from "./Components/HomePage/BookingAppointmentScreens/BookAppointment";
// AuthonticationScreens
import Login from "./Components/HomePage/AuthonticationScreens/Login";
import Register from "./Components/HomePage/AuthonticationScreens/Register";
import ForgotPassword from "./Components/HomePage/AuthonticationScreens/ForgotPassword";

// serviceselection screens
import ServiceSelectionScreen from "./Components/ServiceScreens/ServiceSelectionScreen";
import ElderlyChildCareScreen from "./Components/ServiceScreens/ElderlyChildCareScreen";
import NursingPysiotherapyScreen from "./Components/ServiceScreens/NursingPysiotherapy";
import MedicineDiagnosticDeliveryScreen from "./Components/ServiceScreens/MedicineDiagnosticDelivery";
// Resident screens
import ResidentDashboard from "./Components/HomePage/ResidentScreens/ResidentDashboard";

const App = () => {
  return (
    <Router> 
      
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/home-page" element={<HomePage />} /> */}
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/packages" element={<Packages/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/terms&conditions" element={<TermsConditions/>}/>
          <Route path="/documentation" element={<Documentation/>}/>
          <Route path="/help-center" element={<HelpCenter/>}/>
          <Route path="/elder-childcare" element={<ElderChildCare/>}/>
          <Route path="/nursing-physiotherapy" element={<NursingPhysiotherapy/>}/>
          <Route path="/doctor-visit-pickup" element={<DoctorVisitPickup/>}/>
          <Route path="/medicine-diagnostic-delivery" element={<MedicineDiagnosticDelivery/>}/>
          <Route path="/social-wellness" element={<SocialWellness/>}/>
          <Route path="/emergency-care" element={<EmergencyCare/>}/>
          

           {/* AuthonticationScreens */}
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>

          {/* Resident screens */}
          <Route path="/resident-dashboard" element={<ResidentDashboard/>}/>

          {/* booking screens */}
          <Route path="/book-appointment" element={<BookAppointment/>}/>

          {/* ServiceSelectionScreen */}
          <Route path="/servies" element={<ServiceSelectionScreen/>}/>
          <Route path="/elder-child-care" element={<ElderlyChildCareScreen/>}/>
          <Route path="/nursingPhysiotherapy" element={<NursingPysiotherapyScreen/>}/>
          <Route path="/medicine-diagnostic" element={<MedicineDiagnosticDeliveryScreen/>}/>

     
          
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
