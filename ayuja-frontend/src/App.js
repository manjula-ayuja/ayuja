


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
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
