import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { MyContext } from "../MyContext";
import Cookies from "js-cookie";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const { User } = React.useContext(MyContext);
  console.log(User);
  const First = User.username?.charAt(0) || "G";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const notify = (e)=>{toast(e)}
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 const navigate = useNavigate()
  const handleCloseMenu = () => {
    setAnchorEl(null);
    Cookies.remove("UserToken");
    notify("Logout Succefully")
    window.location.href = "/";
    setTimeout(()=>{navigate('/')},1000)
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Left side icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* App title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Leads Management
          </Typography>

          {/* Right side avatar with dropdown */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar alt="User">{First}</Avatar>
              </IconButton>
            </Tooltip>
            {User && (
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ mt: 1.5 }}
              >
                <MenuItem onClick={""}>Account</MenuItem>
                <MenuItem onClick={""}>Billing</MenuItem>
                <MenuItem onClick={""}>Settings</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
