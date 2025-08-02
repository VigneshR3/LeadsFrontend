import React, { useContext } from "react";
import axios from "axios";
import {Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginSchema from "../Schema/LoginShema";
import { BaseApi } from "../BaseApi";
import { ToastContainer, toast } from "react-toastify";
import MenuAppBar from "../componens/MenuAppBar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";  
import { MyContext } from "../MyContext";
// fwefew
const Login = () => {
  const { setUser } = useContext(MyContext);
  const notify = (message) => toast(message);
  const InitialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const Formik = useFormik({
    initialValues: InitialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`${BaseApi}/user/login`, values)
        .then((res) => {
          console.log("response", res);
          Cookies.set("UserToken", res.data.token);
          const decoded = jwtDecode(res.data.token);
          console.log("Decoded token:", decoded);
          setUser(decoded);
          notify(res);
          Formik.resetForm();
          setTimeout(() => {
            navigate("/leads");
          }, 1000);
        })
        .catch((e) => {
          console.log("error", e);
          notify(e.response.data.message);
        });
    },
  });
  return (
    <Box>
      <ToastContainer position="top-right" />
      <MenuAppBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={12} style={{ maxWidth: 350, padding: 15, margin: 2 }}>
          <Box
            component="form"
            sx={{
              margin: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
            }}
            onSubmit={Formik.handleSubmit}
          >
            <Typography variant="h5" textAlign="center">
              Login
            </Typography>

            <TextField
              name="email"
              label="Email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Boolean(Formik.touched.email && Formik.errors.email)}
              helperText={Formik.touched.email && Formik.errors.email}
              fullWidth
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Boolean(Formik.touched.password && Formik.errors.password)}
              helperText={Formik.touched.password && Formik.errors.password}
              fullWidth
            />

            <Button
              onSubmit={Formik.handleSubmit}
              type="submit"
              variant="contained"
            >
              {" "}
              Submit
            </Button>
          </Box>
          {/* <Link to={"/"}>Don't have an account ? Register</Link> */}
        </Paper>
      </div>
    </Box>
  );
};

export default Login;
