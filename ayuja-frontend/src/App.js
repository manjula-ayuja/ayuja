// import logo from './logo.svg';
// import './App.css';
// import 

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";

const App = () => {
  return (
    <Router> {/* Router should be outside AuthProvider */}
      
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home-page" element={<HomePage />} />
        </Routes>
    </Router>
  );
};

export default App;
