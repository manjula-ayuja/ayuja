

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,Typography,CircularProgress,Chip,Button,Stack,Paper,IconButton,
} from "@mui/material";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
// import Footer from "../Common/Footer"
const ComplaintsDashboard = () => {
   const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const getComplaintsApi = process.env.REACT_APP_ALL_COMPLAINTS_API;
  const updateComplaintsApi = process.env.REACT_APP_UPDATE_COMPLAINT_API;

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getComplaintsApi);
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();

    const ws = new WebSocket(process.env.REACT_APP_WS_COMPLAINTS);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "complaint_created") {
        setComplaints((prev) => [...prev, data]);
      } else if (data.event === "complaint_updated") {
        setComplaints((prev) =>
          prev.map((c) =>
            c.complaint_id === data.complaint_id
              ? { ...c, status: data.status }
              : c
          )
        );
      }
    };

    ws.onerror = (err) => console.error("WS Error:", err);
    ws.onclose = () => console.log("WS Closed");

    return () => ws.close();
  }, []);

  const updateStatus = async (complaint_id, status) => {
    try {
      await axios.patch(`${updateComplaintsApi}/${complaint_id}/status`, null, {
        params: { status },
      });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  const columns = [
    { field: "complaint_id", headerName: "Complaint ID", width: 180 },
    { field: "resident_id", headerName: "Resident ID", width: 180 },
    { field: "category", headerName: "Category", width: 150, 
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "open"
              ? "error"
              : params.value === "in-progress"
              ? "warning"
              : params.value === "resolved"
              ? "success"
              : "default"
          }
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        />
      ),
      disableClickEventBubbling: true,
    },
    {
      field: "attachments",
      headerName: "Attachments",
      width: 150,
      renderCell: (params) =>
        params.value?.length ? (
          <Box>
            {params.value.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", color: "#006D77", wordBreak: "break-all" }}
              >
                File {i + 1}
              </a>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No files
          </Typography>
        ),
    },
    {
      field: "feedback",
      headerName: "Feedback",
      width: 200,
      renderCell: (params) =>
        params.value && params.value.comment ? (
          <Typography
            variant="body2"
            sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            {params.value.comment}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No feedback
          </Typography>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => updateStatus(params.row.complaint_id, "in-progress")}
            disabled={
              params.row.status === "in-progress" || params.row.status === "resolved"
            }
          >
            In Progress
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => updateStatus(params.row.complaint_id, "resolved")}
            disabled={params.row.status === "resolved"}
          >
            Resolved
          </Button>
        </Stack>
      ),
    },
  ];
  


  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 6,
        px: 2,
        backgroundColor: "#f9f9f9",
       
      }}
    >
      <Paper sx={{ width: "70%", p: 3, borderRadius: 3, boxShadow: 4,  }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIosNewIcon />
      </IconButton>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#22577A", mb: 2 }}
        >
          Complaints Dashboard
        </Typography>

        <DataGrid
          rows={complaints}
          columns={columns}
          getRowId={(row) => row.complaint_id}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          disableSelectionOnClick
        />
      </Paper>
 
    </Box>
         {/* <Footer/> */}
         </>
  );
};

export default ComplaintsDashboard;
