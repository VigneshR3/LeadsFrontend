import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { IoLayersSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { BiCandles } from "react-icons/bi";

const Filter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button startIcon={<FaFilter />} variant="outlined">
              Filter
            </Button>
            <Button startIcon={<IoLayersSharp />} variant="outlined">
              Bulk Actions
            </Button>
            <IconButton
              sx={{
                padding: "2px",
                color: "#1976d2",
                width: 40,
                height: 40,
                border: "1px solid #1976d2",
              }}
              onClick={() => setSearchQuery("")}
            >
              <TfiReload size={20} />
            </IconButton>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            gap: 1,
            mt: { xs: 2, md: 0 },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <Button
            startIcon={<BiCandles />}
            variant="contained"
            onClick={handleSearch}
          >
            View
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
