import React, { useState } from "react";
import MenuAppBar from "../componens/MenuAppBar";
import { Box, Button, Grid, Typography } from "@mui/material";
import LeadForm from "../componens/LeadFrom";
import { FaDownload } from "react-icons/fa";
import Content from "../componens/Content";
import Filter from "../componens/Filter";
import LeadTable from "../componens/LeadTable";
import { CSVLink } from "react-csv";

const Leads = () => {
  const [ data ,setData] = useState([])
  const headers = [
    { key: "leadid", label: "Lead ID" },
    { key: "customer", label: "Customer" },
    { key: "company", label: "Company" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "value", label: "Value (₹)" },
    { key: "tags", label: "Tags" },
    { key: "source", label: "Source" },
    { key: "assigned", label: "Assigned" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "created" },
  ];

  // const data = [
  //   { name: "Alice", age: 25 },
  //   { name: "Bob", age: 30 },
  // ];
  return (
    <div>
      <MenuAppBar />
      <Box sx={{ mt: 0, padding: 2 }}>
        <Grid container>
          <Grid container size={{ xs: 12, md: 6 }} direction={"column"}>
            <Typography variant="h6">Leads Managements</Typography>
            <Typography variant="body1">
              {" "}
              Organize leads and track their progress effectively here
            </Typography>
          </Grid>
          <Grid
            container
            size={{ xs: 12, md: 6 }}
            sx={{ justifyContent: "end", gap: 1 }}
          >
            <LeadForm />
            <Button
              variant="outlined"
              sx={{ color: "black", borderColor: "black",maxHeight:40 }}
              startIcon={<FaDownload />}
            >
              <CSVLink data={data} headers={headers} filename={"my-table.csv"}>
                Export CSV
              </CSVLink>
            </Button>
          </Grid>
        </Grid>
        <Content />
        <Filter />
        <LeadTable setData={setData} />
      </Box>
    </div>
  );
};

export default Leads;
