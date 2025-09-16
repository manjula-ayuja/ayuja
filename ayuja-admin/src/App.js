


import { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SessionTimeoutWrapper from "./Components/SessionTimeoutWrapper";
import Layout from "./Components/Layout";

// AuthonticationScreens
import Login from "./Components/AuthonticationPages/Login"
import Register from "./Components/AuthonticationPages/Register";
import ForgotPassword from "./Components/AuthonticationPages/ForgotPassword";

import AdminDashboard from "./Components/AdminPages/AdminDashboard";
import EmergencyDashboard from "./Components/AdminPages/EmergencyDashboard";
import ComplaintsDashboard from "./Components/AdminPages/ComplaintsDashboard";
import ProfilePage from "./Components/AdminPages/ProfilePage";

const App = () => {


  return (
    <>
    <Router> 
       <SessionTimeoutWrapper>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login/>} />
           {/* AuthonticationScreens */}
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>

          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/emergency-dashboard" element={<EmergencyDashboard/>}/>
          <Route path="/complaints-dashboard" element={<ComplaintsDashboard/>}/>
          <Route path="/profile-details" element={<ProfilePage/>}/>
      
          </Route>
        {/* </Route> */}
          </Routes>
        </SessionTimeoutWrapper>
    </Router>

</>

  );
};

export default App;


