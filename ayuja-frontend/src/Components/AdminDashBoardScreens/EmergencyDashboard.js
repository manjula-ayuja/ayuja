

import React, { useEffect, useState } from "react";
import {Container,Typography,Card,CardContent,CardActions,Button,Grid,List,ListItem,ListItemText,Dialog,DialogContent,IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const EmergencyDashboard = () => {
   const navigate = useNavigate();
  const [emergencies, setEmergencies] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const EMERGENCY_API = process.env.REACT_APP_EMERGENCYYY_API; 
  const WS_URL = process.env.REACT_APP_EMERGENCY_WS;

  useEffect(() => {
    // Fetch initial active emergencies
    fetch(`${EMERGENCY_API}/active`)
      .then((res) => res.json())
      .then((data) => setEmergencies(data.emergencies || []))
      .catch((err) => console.error("Error fetching emergencies:", err));

    // WebSocket for live updates
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => console.log("Connected to Emergency WS");
    ws.onmessage = (event) => {
      const newEmergency = JSON.parse(event.data);
      setEmergencies((prev) => [newEmergency, ...prev]);
    };
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, [EMERGENCY_API, WS_URL]);

  const handleResolve = async (id) => {
    try {
      await fetch(`${EMERGENCY_API}/resolve/${id}`, { method: "PUT" });
      setEmergencies((prev) => prev.filter((e) => e.emergency_id !== id));
    } catch (err) {
      console.error("Error resolving emergency:", err);
    }
  };

  return (
    <>
    <Container maxWidth="lg" sx={{ py: 4, }}>

      <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIosNewIcon />
      </IconButton>


      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
         Active Emergencies
      </Typography>

      {emergencies.length === 0 ? (
        <Typography align="center">No active emergencies</Typography>
      ) : (
        <Grid container spacing={3}>
          {emergencies.map((e) => (
            <Grid item xs={12} md={6} key={e.emergency_id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography>Status: {e.status}</Typography>
                  <Typography>
                    Raised At: {new Date(e.created_at).toLocaleString()}
                  </Typography>

                  {/* Resident Details */}
                  {e.resident && (
                    <>

                      <Typography>Name: {e.resident.name}</Typography>
                      <Typography>Email: {e.resident.email}</Typography>
                      <Typography>Phone: {e.resident.phone}</Typography>

                      {/* Emergency contacts */}
                      {e.resident.emergency_contacts?.length > 0 && (
                        <>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            Emergency Contacts:
                          </Typography>
                          <List dense>
                            {e.resident.emergency_contacts.map((c, i) => {
                              // Split "name:phone"
                              const [name, phone] = c.split(":");
                              return (
                                <ListItem key={i}>
                                  <ListItemText
                                    primary={name}
                                    secondary={`Phone: ${phone}`}
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        </>
                      )}

                      {/* Family members */}
                      {e.resident.family_members?.length > 0 && (
                        <>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            Family Members:
                          </Typography>
                          <List dense>
                            {e.resident.family_members.map((f, i) => {
                              const [name, relation] = f.split(":");
                              return (
                                <ListItem key={i}>
                                  <ListItemText
                                    primary={name}
                                    secondary={`Relation: ${relation}`}
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        </>
                      )}
                    </>
                  )}

                  {/* Geo Location */}
                  {e.geo_location && (
                    <Typography sx={{ mt: 1 }}>
                      <span>Location: </span>
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: "#006D77",
                        }}
                        onClick={() => setSelectedLocation(e.geo_location)}
                      >
                        {e.geo_location.lat}, {e.geo_location.lng}
                      </span>
                    </Typography>
                  )}

                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleResolve(e.emergency_id)}
                  >
                    Mark as Resolved
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog for Map */}
      <Dialog
        open={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ height: "400px", padding: 0 }}>
          {selectedLocation && (
            <MapContainer
              center={[selectedLocation.lat, selectedLocation.lng]}
              zoom={16}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                <Popup>
                  Emergency Location <br />
                  Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </DialogContent>
      </Dialog>
    
    </Container>

      <Footer/>
    </>
  );
};

export default EmergencyDashboard;
