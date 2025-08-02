import axios from "axios";
import { useEffect, useState } from "react";
import { BaseApi } from "./BaseApi";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

 const UserProtecter = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const token = Cookies.get("UserToken") || "";
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setIsUser(true);
        // Now validate on the server
        axios
          .get(`${BaseApi}/user/is-user`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("User verified:", res.data);
          })
          .catch((e) => {
            console.log("Server verification failed:", e);
            setIsUser(false);
          })
          .finally(() => {
            setIsCheck(true);
          });
      } catch (error) {
        console.error("Token decode error:", error);
        setIsCheck(true);
      }
    } else {
      setIsCheck(true);
    }
  }, []);

  if (!isCheck) return <p>Loading...</p>;
  if (!isUser) return <Navigate to="/" />;

  return children;
};
export default UserProtecter
