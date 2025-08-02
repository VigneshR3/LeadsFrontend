import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";

const data = [
  { label: "New", value: "127" },
  { label: "Contacted", value: "705k" },
  { label: "Qualified", value: "249k" },
  { label: "Working", value: "57k" },
  { label: "Proposal Sent", value: "1.1k" },
  { label: "Customer", value: "3.7k", color: "green" },
  { label: "Lost Leads", value: "5.2k", color: "red" },
];

const Content = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "auto",
        
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {data.map(({ label, value, color }, idx) => (
          <Grid
            item
            key={idx}
            sx={{
              textAlign: "center",
              minWidth: 100,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {label}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: color || "text.primary" }}
            >
              {value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Content;
