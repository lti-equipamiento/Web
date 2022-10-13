import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { NavLink } from "react-router-dom";
import LogOutButton from "../components/LogOutButton";

const navLinkStyle = { textDecoration: "none", color: "black" };

export const mainListItems = (
  <React.Fragment>
    <NavLink to="/dashboard" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/usuario" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/equipo" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Equipos" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/ticket" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Tickets" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/mantenimiento" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Mantenimientos" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <LogOutButton justifyContent="flex-end" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton> */}
  </React.Fragment>
);
