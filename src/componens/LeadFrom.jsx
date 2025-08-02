import * as React from "react";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Slide,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { FormShema } from "../Schema/FormShema";
import axios from "axios";
import { BaseApi } from "../BaseApi";
import {toast ,ToastContainer} from 'react-toastify'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LeadForm() {
  const [open, setOpen] = React.useState(false);
   const Noties = (e)=>{ toast.success(e)}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    Formik.resetForm()
  };
  const InitialValue = {
    leadid: "",
    customer: "",
    company: "",
    email: "",
    phone: "",
    value: "",
    tags: "",
    source: "",
    assigned: [],
    status: "",
  };
  const Formik = useFormik({
    initialValues: InitialValue,
    validationSchema: FormShema,
    onSubmit: async (values) => {
      console.log("values", values);
       const fd = new FormData()
       fd.append("leadid",values.leadid)
       fd.append("customer",values.customer)
       fd.append("company",values.company)
       fd.append("email",values.email)
       fd.append("phone",values.phone)
       fd.append("value",values.value)
       fd.append("tags",values.tags)
       fd.append("source",values.source)
       fd.append("assigned",values.assigned)
       fd.append("status",values.status)
     await axios 
        .post(`${BaseApi}/leads/create`, fd)
        .then((res) => {
          console.log("✅ Lead created", res.data);
          Formik.resetForm()
          Noties('Sucessfully added')
        })
        .catch((err) => {
          console.error("❌ Error submitting lead", err);
          Noties('Faild ! Sucessfully added')
        });
    },
  });

  return (
    <>
    <ToastContainer/>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<FaPlus />}
        sx={{maxHeight:40}}
      >
        New Leads
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* Top AppBar with Close Button */}
        <AppBar sx={{ position: "relative", background: "#1976d2" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              New Leads
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Form Content */}
        <Box sx={{ p: 4 }} component="form" onSubmit={Formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Lead ID"
                name="leadid"
                value={Formik.values.leadid}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.errors.leadid && Formik.touched.leadid ? (
                <p style={{ color: "red", margin: 0 }}>
                  {Formik.errors.leadid}
                </p>
              ) : (
                ""
              )}
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Customer"
                name="customer"
                value={Formik.values.customer}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.errors.customer && Formik.touched.customer ? (
                <p style={{ color: "red", margin: 0 }}>
                  {Formik.errors.customer}
                </p>
              ) : (
                ""
              )}
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={Formik.values.company}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.errors.company && Formik.touched.company ? (
                <p style={{ color: "red", margin: 0 }}>
                  {Formik.errors.company}
                </p>
              ) : (
                ""
              )}
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.errors.email && Formik.touched.email ? (
                <p style={{ color: "red", margin: 0 }}>{Formik.errors.email}</p>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Phone"
                type="number"
                name="phone"
                value={Formik.values.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 12) {
                    Formik.setFieldValue("phone", value);
                  }
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onBlur={Formik.handleBlur}
              />

              {Formik.errors.phone && Formik.touched.phone ? (
                <p style={{ color: "red", margin: 0 }}>{Formik.errors.phone}</p>
              ) : (
                ""
              )}
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Value"
                type="number"
                name="value"
                value={Formik.values.value}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.errors.value && Formik.touched.value ? (
                <p style={{ color: "red", margin: 0 }}>{Formik.errors.value}</p>
              ) : (
                ""
              )}
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <Box sx={{ minWidth: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="tags"
                    value={Formik.values.tags}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  >
                    <MenuItem value={"Important"}>Important</MenuItem>
                    <MenuItem value={"Follow Up"}>Follow Up</MenuItem>
                    <MenuItem value={"Review"}>Review</MenuItem>
                  </Select>
                  {Formik.errors.value && Formik.touched.value ? (
                    <p style={{ color: "red", margin: 0 }}>
                      {Formik.errors.value}
                    </p>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <Box sx={{ minWidth: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Source</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="source"
                    value={Formik.values.source}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  >
                    <MenuItem value={"Facebook"}>Facebook</MenuItem>
                    <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
                    <MenuItem value={"Dribbble"}>Dribbble</MenuItem>
                    <MenuItem value={"Dribbble"}>UpWork</MenuItem>
                  </Select>
                  {Formik.errors.source && Formik.touched.source ? (
                    <p style={{ color: "red", margin: 0 }}>
                      {Formik.errors.source}
                    </p>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <TextField
                fullWidth
                label="Assigned"
                name="assigned"
                accept="image/*"
                type="file"
                onChange={(e) => {
                  Formik.setFieldValue("assigned", e.currentTarget.files[0]);
                }}
                onBlur={Formik.handleBlur}
              />
              {Formik.errors.assigned && Formik.touched.assigned ? (
                <p style={{ color: "red", margin: 0 }}>
                  {Formik.errors.assigned}
                </p>
              ) : (
                ""
              )}
            </Grid>
            <Grid container size={{ xs: 12, sm: 6, md: 3, xl: 3, lg: 3 }}>
              <Box sx={{ minWidth: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status"
                    value={Formik.values.status}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  >
                    <MenuItem value={"Customer"}>Customer</MenuItem>
                    <MenuItem value={"Qualified"}>Qualified</MenuItem>
                    <MenuItem value={"Working"}>Working</MenuItem>
                    <MenuItem value={"Proposal sent"}>Proposal sent</MenuItem>
                    <MenuItem value={"Contacted"}>Contacted</MenuItem>
                  </Select>
                  {Formik.errors.status && Formik.touched.status ? (
                    <p style={{ color: "red", margin: 0 }}>
                      {Formik.errors.status}
                    </p>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ justifyContent: "space-between", display: "flex", m: 1 }}>
            <Button variant="contained" type="submit">
              submit
            </Button>
            <Button onClick={handleClose}>cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
