



import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import manImg from "../../Logos/GenderImages/man.png";
import womanImg from "../../Logos/GenderImages/girl.png";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const COMPLAINTS_API = process.env.REACT_APP_MY_COMPLAINTS_API;

  // 1️⃣ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 2️⃣ Fetch complaints when user is available
  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) return;

      try {
        const params = new URLSearchParams({
          email: user.email,
          phone: user.phone,
        });

        const res = await fetch(`${COMPLAINTS_API}?${params}`);
        const data = await res.json();

        if (res.ok) {
          setComplaints(data.complaints || []);
        } else {
          console.error("Error response:", data.error);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  // 3️⃣ Loader
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  // 4️⃣ UI rendering with Cards
  return (
    <>

            <Container maxWidth="md" sx={{ py: 4, mb: 10 }}>
              <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: "900", color: "#22577A", mb: 4, mt: 2 }}
              >
                My Complaints
              </Typography>

      {complaints.length === 0 ? (
        <Typography>No complaints found.</Typography>
      ) : (


        <Grid container spacing={2} sx={{ mt: 2 }}>
  {complaints.map((c) => (
    <Grid item xs={12} sm={6} md={6} key={c.complaint_id}>
       <Card
         sx={{
           display: "flex",
           flexDirection: "column",
           justifyContent: "space-between",
           backgroundColor: "#F2FFF5",
           alignItems: "center",
           borderRadius: 3,
           boxShadow: 4,
           cursor: "pointer",
           transition: "transform 0.2s",
           "&:hover": { transform: "scale(1.03)" },
           height: 350,
           width: 400,
         }}
         >
        
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: 96,
                height: 96,
              }}
            >
              <img
                src={c.booking?.gender === "Male" ? manImg : womanImg}
                alt={c.booking?.gender}
                style={{ width: "100%", height: "100%" }}
              />
            </Avatar>
          }
          title={`${c.booking?.service_type}`}
          subheader={`Status: ${c.status}`}
        />
        <CardContent>
          <Typography variant="body1">
            <strong>Category:</strong> {c.category}
          </Typography>
          <Typography variant="body1">
            <strong>Booking ID:</strong> {c.booking?.booking_id || "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {c.booking?.name || "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {c.booking?.age || "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {c.booking?.gender || "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Service:</strong> {c.booking?.service_type || "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong>{" "}
            {c.booking?.date
              ? new Date(c.booking.date).toLocaleDateString()
              : "-"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      )}
    </Container>
    </>
  );
};

export default MyComplaints;
