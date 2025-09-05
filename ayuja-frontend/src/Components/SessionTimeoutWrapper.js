



import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    alert("Session expired. Redirecting to login...");
    localStorage.removeItem("email");
    localStorage.removeItem("userTokens");
    sessionStorage.clear();
    navigate("/");
  };
 // Set timeout (45 minutes = 2700000 ms)
  useEffect(() => {
    const startTimeout = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleLogout, 2700000); // 1 minute
    };

    startTimeout();

    // Reset timeout on user activity
    const events = ["mousemove", "keypress", "click"];
    events.forEach((event) => window.addEventListener(event, startTimeout));

    return () => {
      clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, startTimeout));
    };
  }, []);

  return children;
};

export default SessionTimeoutWrapper;
