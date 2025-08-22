


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage/HomePage";
import ServicesPage from "./Components/HomePage/HomeSections/services";
import AboutUs from "./Components/HomePage/HomeSections/Aboutus";
import Packages from "./Components/HomePage/HomeSections/Packages";
import ContactUs from "./Components/HomePage/HomeSections/contact";
import Login from "./Components/HomePage/HomeSections/Login";
import Register from "./Components/HomePage/HomeSections/Register";
import PrivacyPolicy from "./Components/HomePage/HomeSections/PrivacyPolicy";
import TermsConditions from "./Components/HomePage/HomeSections/Terms&Conditions";
import Documentation from "./Components/HomePage/HomeSections/Documentation";
import HelpCenter from "./Components/HomePage/HomeSections/HelpCenter";
import ElderChildCare from "./Components/HomePage/HomeSections/Elder&ChildCare";
import NursingPhysiotherapy from "./Components/HomePage/HomeSections/Nursing&Physiotherapy";
import DoctorVisitPickup from "./Components/HomePage/HomeSections/DoctorVisitPickup";
import MedicineDiagnosticDelivery from "./Components/HomePage/HomeSections/MedicineDiagnosticDelivery";
import SocialWellness from "./Components/HomePage/HomeSections/SocialWellness";
import EmergencyCare from "./Components/HomePage/HomeSections/EmergencyCare";
import BookAppointment from "./Components/HomePage/HomeSections/BookAppointment";

const App = () => {
  return (
    <Router> 
      
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/home-page" element={<HomePage />} /> */}
          <Route path="/servies" element={<ServicesPage/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/packages" element={<Packages/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
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
          <Route path="/book-appointment" element={<BookAppointment/>}/>
          
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
