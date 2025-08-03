import React, { useContext } from "react";
import axios from "axios";
import { Paper, TextField, Button, Box, Typography } from "@mui/material";
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

const Login = () => {
  const { setUser } = useContext(MyContext);
  const notify = (message) => toast(message);
  const InitialValues = {
    email: "",
    password: "",
  };
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const Formik = useFormik({
    initialValues: InitialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      setDisabled(false);
      axios
        .post(`${BaseApi}/user/login`, values, {
          headers: {
            "Content-Type": "application/json", // ✅ Tells backend it's JSON
          },
          withCredentials: true, // If you're using cookies
        })
        .then((res) => {
          console.log("response", res);
          Cookies.set("UserToken", res.data.token);
          const decoded = jwtDecode(res.data.token);
          console.log("Decoded token:", decoded);
          setUser(decoded);
          notify("Login Succussfully");
          Formik.resetForm();
          setTimeout(() => {
            navigate("/leads");
          }, 1000);
        })
        .catch((e) => {
          console.log("error", e);
          setDisabled(false);

          notify("Login Faild !");
        })
        .finally(() => {
          setDisabled(false); // Always re-enable the button
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

            <Button type="submit" variant="contained" disabled={disabled}>
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
