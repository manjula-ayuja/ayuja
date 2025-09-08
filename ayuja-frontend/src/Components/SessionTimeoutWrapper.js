


import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    alert("Session expired. Redirecting to login...");

    // Clear everything from localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  // Set timeout (45 minutes = 2700000 ms)
  useEffect(() => {
    const startTimeout = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleLogout, 2700000);
    };

    startTimeout();

    // Reset timeout on user activity
    const events = ["mousemove", "keypress", "click"];
    events.forEach((event) => window.addEventListener(event, startTimeout));

    return () => {
      clearTimeout(timeoutRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, startTimeout)
      );
    };
  }, []);

  return children;
};

export default SessionTimeoutWrapper;
