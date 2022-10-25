import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HandymanIcon from "@mui/icons-material/Handyman";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import * as React from "react";
import { NavLink } from "react-router-dom";

const navLinkStyle = { textDecoration: "none", color: "black" };

export const mainListItems = (
  <React.Fragment>
    <NavLink to="/dashboard" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
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
          <MedicalInformationIcon />
        </ListItemIcon>
        <ListItemText primary="Equipos" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/ticket" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <ConfirmationNumberIcon />
        </ListItemIcon>
        <ListItemText primary="Tickets" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/mantenimiento" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <HandymanIcon />
        </ListItemIcon>
        <ListItemText primary="Mantenimientos" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = <React.Fragment></React.Fragment>;
